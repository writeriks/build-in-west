import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  isLoading: boolean;
  isHamburgerMenuOpen: boolean;
}

export const initialState: UIState = {
  isLoading: false,
  isHamburgerMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    toggleHamburgerMenu: (state) => {
      state.isHamburgerMenuOpen = !state.isHamburgerMenuOpen;
    },
  },
});

export const { setIsLoading, toggleHamburgerMenu } = uiSlice.actions;

export default uiSlice.reducer;
