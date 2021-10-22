import { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import * as api from "../api";
import { ErrorResponse } from "../api/dto";
import {
  getAllPostsSucceeded,
  getAllPostsFailed,
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

function* watchGetAllPosts(): Generator<any, void, any> {
  yield takeLatest(
    "feed/requestGetAllPosts",
    sendRequest,
    api.getAllPosts,
    getAllPostsSucceeded,
    getAllPostsFailed
  );
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

export function* rootSaga(): Generator<any, void, any> {
  yield all([watchGetAllPosts(), watchGetAllUsers(), watchGetUser()]);
}
