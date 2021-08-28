import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import * as api from "../api";
import { GetAllPostsResponse } from "../api/dto";
import { getAllPostsSucceeded } from "../components/feed/feedSlice";

function* getAllPosts(): Generator<
  any,
  void,
  AxiosResponse<GetAllPostsResponse[]>
> {
  let posts = yield call(api.getAllPosts);
  yield put(getAllPostsSucceeded(posts.data));
}

function* watchGetAllPosts(): Generator<any, void, any> {
  yield takeLatest("feed/requestGetAllPosts", getAllPosts);
}

export function* rootSaga(): Generator<any, void, any> {
  yield all([watchGetAllPosts()]);
}
