import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import feedReducer from "../components/feed/feedSlice";
import appReducer from "../appSlice";
import profilesListReducer from "../components/profiles-list/profilesListSlice";
import profileReducer from "../components/profile/profileSlice";
import postingFormReducer from "../components/feed/posting-form/postingFormSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    feed: feedReducer,
    profilesList: profilesListReducer,
    profile: profileReducer,
    postingForm: postingFormReducer,
  },
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
