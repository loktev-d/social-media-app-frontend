import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllPostsResponse, ErrorResponse } from "../../api/dto";

interface FeedState {
  isErrorMessageOpened: boolean;
  errorMessage: string;
  feed: GetAllPostsResponse;
}

const initialState: FeedState = {
  isErrorMessageOpened: false,
  errorMessage: "",
  feed: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getAllPostsSucceeded: (
      state,
      action: PayloadAction<GetAllPostsResponse>
    ) => {
      state.errorMessage = "";
      state.feed = action.payload;
    },
    getAllPostsFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.isErrorMessageOpened = true;
      state.errorMessage = action.payload.message;
    },
    closeErrorMessage: (state) => {
      state.isErrorMessageOpened = false;
    },
  },
});

export const { getAllPostsSucceeded, getAllPostsFailed, closeErrorMessage } =
  feedSlice.actions;

export default feedSlice.reducer;
