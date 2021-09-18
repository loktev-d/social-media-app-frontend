import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllUsersResponse, ErrorResponse } from "../../api/dto";

interface ProfilesListState {
  isLoading: boolean;
  isErrorMessageOpened: boolean;
  errorMessage: string;
  profiles: GetAllUsersResponse;
}

const initialState: ProfilesListState = {
  isLoading: false,
  isErrorMessageOpened: false,
  errorMessage: "",
  profiles: [],
};

const profilesListSlice = createSlice({
  name: "profilesList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    getAllUsersSucceeded: (
      state,
      action: PayloadAction<GetAllUsersResponse>
    ) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.profiles = action.payload;
    },
    getAllUsersFailed: (state, action: PayloadAction<ErrorResponse>) => {
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
  getAllUsersSucceeded,
  setLoading,
  getAllUsersFailed,
  closeErrorMessage,
} = profilesListSlice.actions;

export default profilesListSlice.reducer;
