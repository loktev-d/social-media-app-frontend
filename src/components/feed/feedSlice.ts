import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllPostsResponse, ErrorResponse } from "../../api/dto";

interface FeedState {
  isLoading: boolean;
  isErrorMessageOpened: boolean;
  errorMessage: string;
  feed: GetAllPostsResponse;
}

const initialState: FeedState = {
  isLoading: false,
  isErrorMessageOpened: false,
  errorMessage: "",
  feed: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    getAllPostsSucceeded: (
      state,
      action: PayloadAction<GetAllPostsResponse>
    ) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.feed = state.feed.concat(action.payload);
    },
    getAllPostsFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.isErrorMessageOpened = true;
      state.errorMessage = action.payload.message;
    },
    closeErrorMessage: (state) => {
      state.isErrorMessageOpened = false;
    },
  },
});

export const {
  getAllPostsSucceeded,
  setLoading,
  getAllPostsFailed,
  closeErrorMessage,
} = feedSlice.actions;

export default feedSlice.reducer;
