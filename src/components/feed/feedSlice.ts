import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllPostsResponse } from "../../api/dto";

const initialState: GetAllPostsResponse[] = [];

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getPostsSucceeded: (
      state,
      action: PayloadAction<GetAllPostsResponse[]>
    ) => {
      state.concat(action.payload);
    },
  },
});

export default feedSlice.reducer;
