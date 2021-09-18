import { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import * as api from "../api";
import {
  ErrorResponse,
  GetAllPostsResponse,
  GetAllUsersResponse,
} from "../api/dto";
import {
  getAllPostsSucceeded,
  setLoading as setFeedLoading,
  getAllPostsFailed,
} from "../components/feed/feedSlice";
import {
  getAllUsersSucceeded,
  getAllUsersFailed,
  setLoading as setProfilesListLoading,
} from "../components/profiles-list/profilesListSlice";

function* getAllPosts(): Generator<
  any,
  void,
  AxiosResponse<GetAllPostsResponse>
> {
  yield put(setFeedLoading());
  try {
    let posts = yield call(api.getAllPosts);
    yield put(getAllPostsSucceeded(posts.data));
  } catch (error) {
    yield put(
      getAllPostsFailed(
        (error as AxiosError<ErrorResponse>).response?.data as ErrorResponse
      )
    );
  }
}

function* watchGetAllPosts(): Generator<any, void, any> {
  yield takeLatest("feed/requestGetAllPosts", getAllPosts);
}

function* getAllUsers(): Generator<
  any,
  void,
  AxiosResponse<GetAllUsersResponse>
> {
  yield put(setProfilesListLoading());
  try {
    let users = yield call(api.getAllUsers);
    yield put(getAllUsersSucceeded(users.data));
  } catch (error) {
    yield put(
      getAllUsersFailed(
        (error as AxiosError<ErrorResponse>).response?.data as ErrorResponse
      )
    );
  }
}

function* watchGetAllUsers(): Generator<any, void, any> {
  yield takeLatest("feed/requestGetAllUsers", getAllUsers);
}

export function* rootSaga(): Generator<any, void, any> {
  yield all([watchGetAllPosts(), watchGetAllUsers()]);
}
