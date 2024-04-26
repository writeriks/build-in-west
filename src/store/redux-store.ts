import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./reducers/ui-reducer/ui-slice";
import contextSlice from "./reducers/context-slice/context-slice";

const reducer = {
  ui: uiSlice,
  context: contextSlice,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV != "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
