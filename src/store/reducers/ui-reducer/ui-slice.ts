import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  isLoading: boolean;
  isHamburgerMenuOpen: boolean;
  refetchUserStocks: boolean;
}

export const initialState: UIState = {
  isLoading: false,
  isHamburgerMenuOpen: false,
  refetchUserStocks: false,
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

    setShouldRefetchUserStocks: (state, action: PayloadAction<boolean>) => {
      state.refetchUserStocks = action.payload;
    },
  },
});

export const { setIsLoading, toggleHamburgerMenu, setShouldRefetchUserStocks } =
  uiSlice.actions;

export default uiSlice.reducer;
