import { createSlice } from "@reduxjs/toolkit";

interface PostingFormState {
  title: string;
  body: string;
  picture: string;
}

const initialState: PostingFormState = {
  title: "",
  body: "",
  picture: "",
};

const postingFormSlice = createSlice({
  name: "postingForm",
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    changeBody: (state, action) => {
      state.body = action.payload;
    },
    changePicture: (state, action) => {
      state.picture = action.payload;
    },
  },
});

export const { changeTitle, changeBody, changePicture } =
  postingFormSlice.actions;

export default postingFormSlice.reducer;
