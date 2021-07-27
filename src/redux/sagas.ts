import { all, call, put, takeLatest } from "redux-saga/effects";

import * as api from "../api";
import { GetAllPostsResponse } from "../api/dto";

function* getAllPosts(): Generator<any, void, GetAllPostsResponse[]> {
  let posts = yield call(api.getAllPosts);
  yield put({ type: "feed/getAllPostsSucceeded", payload: posts });
}

function* watchGetAllPosts(): Generator<any, void, any> {
  yield takeLatest("feed/requestGetAllPosts", getAllPosts);
}

export function* rootSaga(): Generator<any, void, any> {
  yield all([watchGetAllPosts()]);
}
