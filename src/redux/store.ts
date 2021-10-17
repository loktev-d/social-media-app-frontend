import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import feedReducer from "../components/feed/feedSlice";
import appReducer from "../appSlice";
import profilesListReducer from "../components/profiles-list/profilesListSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    feed: feedReducer,
    profilesList: profilesListReducer,
  },
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
