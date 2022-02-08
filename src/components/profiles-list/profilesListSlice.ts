import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllUsersResponse, ErrorResponse } from "../../api/dto";

interface ProfilesListState {
  isErrorMessageOpened: boolean;
  errorMessage: string;
  profiles: GetAllUsersResponse;
}

const initialState: ProfilesListState = {
  isErrorMessageOpened: false,
  errorMessage: "",
  profiles: [],
};

const profilesListSlice = createSlice({
  name: "profilesList",
  initialState,
  reducers: {
    getAllUsersSucceeded: (
      state,
      action: PayloadAction<GetAllUsersResponse>
    ) => {
      state.errorMessage = "";
      state.profiles = action.payload;
    },
    getAllUsersFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.isErrorMessageOpened = true;
      state.errorMessage = action.payload.message;
    },
    closeErrorMessage: (state) => {
      state.errorMessage = "";
      state.isErrorMessageOpened = false;
    },
  },
});

export const { getAllUsersSucceeded, getAllUsersFailed, closeErrorMessage } =
  profilesListSlice.actions;

export default profilesListSlice.reducer;
