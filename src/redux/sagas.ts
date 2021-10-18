import { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

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
import { startLoading, completeLoading } from "../appSlice";

function* sendRequest(
  apiMethod: (request: any) => Promise<AxiosResponse<any>>,
  request: any,
  successAction: (payload: any) => any,
  errorAction: (payload: ErrorResponse) => any
): Generator<any, void, AxiosResponse<any>> {
  yield put(startLoading());
  try {
    let response = yield call(apiMethod, request);
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
    null,
    getAllPostsSucceeded,
    getAllPostsFailed
  );
}

function* watchGetAllUsers(): Generator<any, void, any> {
  yield takeLatest(
    "profilesList/requestGetAllUsers",
    sendRequest,
    api.getAllUsers,
    null,
    getAllUsersSucceeded,
    getAllUsersFailed
  );
}

export function* rootSaga(): Generator<any, void, any> {
  yield all([watchGetAllPosts(), watchGetAllUsers()]);
}
