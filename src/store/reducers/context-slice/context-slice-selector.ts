import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../../redux-store";
import { type ContextState } from "./context-slice";

class ContextReducerSelector {
  getContextReducer = (state: RootState): ContextState => state.context;

  getIsAdminUser = createSelector(
    this.getContextReducer,
    (context) => context.isAdmin
  );
}

const contextReducerSelector = new ContextReducerSelector();
export default contextReducerSelector;
