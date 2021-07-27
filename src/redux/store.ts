import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import feedReducer from "../components/feed/feedSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
