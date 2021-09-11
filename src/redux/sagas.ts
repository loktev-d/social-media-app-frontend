import { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import * as api from "../api";
import { ErrorResponse, GetAllPostsResponse } from "../api/dto";
import {
  getAllPostsSucceeded,
  setLoading,
  getAllPostsFailed,
} from "../components/feed/feedSlice";

function* getAllPosts(): Generator<
  any,
  void,
  AxiosResponse<GetAllPostsResponse>
> {
  yield put(setLoading());
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

export function* rootSaga(): Generator<any, void, any> {
  yield all([watchGetAllPosts()]);
}
