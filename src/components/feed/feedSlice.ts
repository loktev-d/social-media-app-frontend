import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllPostsResponse, ErrorResponse, PostModel } from "../../api/dto";

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
    getAllPosts: (state, action: PayloadAction<GetAllPostsResponse>) => {
      state.feed = action.payload;
    },
    getNewPost: (state, action: PayloadAction<PostModel>) => {
      state.feed.splice(0, 0, action.payload);
    },
    openErrorMessage: (state, action: PayloadAction<ErrorResponse>) => {
      state.isErrorMessageOpened = true;
      state.errorMessage = action.payload.message;
    },
    closeErrorMessage: (state) => {
      state.errorMessage = "";
      state.isErrorMessageOpened = false;
    },
  },
});

export const { getAllPosts, getNewPost, openErrorMessage, closeErrorMessage } =
  feedSlice.actions;

export default feedSlice.reducer;
