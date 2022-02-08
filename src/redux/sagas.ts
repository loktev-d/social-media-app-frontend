import { AxiosResponse, AxiosError } from "axios";
import {
  all,
  call,
  put,
  takeLatest,
  fork,
  take,
  cancel,
  cancelled,
} from "redux-saga/effects";
import { eventChannel, EventChannel } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

import * as api from "../api";
import { ErrorResponse } from "../api/dto";
import {
  getAllPosts,
  getNewPost,
  openErrorMessage,
} from "../components/feed/feedSlice";
import {
  getAllUsersSucceeded,
  getAllUsersFailed,
} from "../components/profiles-list/profilesListSlice";
import {
  getUserSucceeded,
  getUserFailed,
} from "../components/profile/profileSlice";
import { startLoading, completeLoading } from "../appSlice";
import { apiUrl } from "../config/config.json";
import { SocketChannelResponse } from "./interfaces";

function* sendRequest(
  apiMethod: (request: any) => Promise<AxiosResponse<any>>,
  successAction: (payload: any) => any,
  errorAction: (payload: ErrorResponse) => any,
  action: PayloadAction<any>
): Generator<any, void, AxiosResponse<any>> {
  yield put(startLoading());
  try {
    let response = yield call(apiMethod, action?.payload);
    yield put(successAction(response.data));
  } catch (error) {
    yield put(
      errorAction(
        (error as AxiosError<ErrorResponse>).response?.data as ErrorResponse
      )
    );
  } finally {
    yield put(completeLoading());
  }
}

function* watchGetAllUsers(): Generator<any, void, any> {
  yield takeLatest(
    "profilesList/requestGetAllUsers",
    sendRequest,
    api.getAllUsers,
    getAllUsersSucceeded,
    getAllUsersFailed
  );
}

function* watchGetUser(): Generator<any, void, any> {
  yield takeLatest(
    "profile/requestGetUser",
    sendRequest,
    api.getUser,
    getUserSucceeded,
    getUserFailed
  );
}

function createPostChannel(
  socket: Socket<any, any>
): EventChannel<SocketChannelResponse> {
  return eventChannel((emit) => {
    socket.on("all_posts", (data: any) => {
      emit({ event: "all_posts", data });
    });

    socket.on("new_post", (data: any) => {
      emit({ event: "new_post", data });
    });

    socket.on("exception", (data: any) => {
      emit({ event: "exception", data });
    });

    return () => {
      socket.disconnect();
    };
  });
}

function* createPost(
  socket: Socket<any, any>,
  action: PayloadAction<any>
): Generator<any, void, any> {
  if (socket.connected)
    yield call([socket, socket.emit], "create_post", action.payload);
}

function* watchCreatePost(socket: Socket<any, any>): Generator<any, void, any> {
  yield takeLatest("feed/createPost", createPost, socket);
}

function* getPosts(): Generator<any, void, any> {
  let socket = yield call(io, apiUrl);

  let socketChannel: EventChannel<SocketChannelResponse> = yield call(
    createPostChannel,
    socket
  );

  yield fork(watchCreatePost, socket);

  try {
    while (true) {
      let message: SocketChannelResponse = yield take(socketChannel);

      switch (message.event) {
        case "all_posts":
          yield put(getAllPosts(message.data));
          break;

        case "new_post":
          yield put(getNewPost(message.data));
          break;

        case "exception":
          yield put(openErrorMessage(message.data));
          break;
      }
    }
  } finally {
    if (yield cancelled()) yield call(socketChannel.close);
  }
}

function* watchPostsChannel(): Generator<any, void, any> {
  while (yield take("feed/connectToChannel")) {
    let getPostsTask = yield fork(getPosts);
    yield take("feed/disconnectFromChannel");
    yield cancel(getPostsTask);
  }
}

export function* rootSaga(): Generator<any, void, any> {
  yield all([watchPostsChannel(), watchGetAllUsers(), watchGetUser()]);
}
