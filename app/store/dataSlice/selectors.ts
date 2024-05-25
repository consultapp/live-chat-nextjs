import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import type { RootState } from "@/store";

export const selectData = (state: RootState) => state.dataSlice;

export const selectDataMessages = (state: RootState) =>
  selectData(state).messages[selectDataSlug(state)];

export const selectDataSlug = (state: RootState) =>
  selectData(state).slug || "";

export const selectDataLoading = (state: RootState) =>
  selectData(state).loading;

export const selectDataIsLoading = (state: RootState) =>
  selectData(state).loading === LOADING_STATUS.pending;

export const selectDataIfLoadMessages = (state: RootState) =>
  !(selectData(state).slug in selectData(state).messages);
