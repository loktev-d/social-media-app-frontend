import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    completeLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, completeLoading } = appSlice.actions;

export default appSlice.reducer;
