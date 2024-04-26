import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ContextState {
  isAdmin: boolean;
}

export const initialState: ContextState = {
  isAdmin: false,
};

const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setIsAdminUser: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdminUser } = contextSlice.actions;

export default contextSlice.reducer;
