import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllPostsResponse } from "../../api/dto";

interface FeedState {
  feed: GetAllPostsResponse[];
}

const initialState: FeedState = { feed: [] };

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getAllPostsSucceeded: (
      state,
      action: PayloadAction<GetAllPostsResponse[]>
    ) => {
      state.feed = state.feed.concat(action.payload);
    },
  },
});

export const { getAllPostsSucceeded } = feedSlice.actions;

export default feedSlice.reducer;
