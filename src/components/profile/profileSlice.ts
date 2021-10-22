import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserModel, ErrorResponse } from "../../api/dto";

interface ProfileState {
  isErrorMessageOpened: boolean;
  errorMessage: string;
  user?: UserModel;
}

const initialState: ProfileState = {
  isErrorMessageOpened: false,
  errorMessage: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getUserSucceeded: (state, action: PayloadAction<UserModel>) => {
      state.errorMessage = "";
      state.user = action.payload;
    },
    getUserFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.isErrorMessageOpened = true;
      state.errorMessage = action.payload.message;
    },
    closeErrorMessage: (state) => {
      state.isErrorMessageOpened = false;
    },
  },
});

export const { getUserSucceeded, getUserFailed, closeErrorMessage } =
  profileSlice.actions;

export default profileSlice.reducer;
