import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import type { RootState } from "@/store";

export const selectData = (state: RootState) => state.dataSlice;

export const selectDataMessages = (state: RootState) =>
  selectData(state).messages;
export const selectDataSlug = (state: RootState) => selectData(state).chatSlug;

export const selectDataLoading = (state: RootState) =>
  selectData(state).loading;

export const selectDataIsLoading = (state: RootState) =>
  selectData(state).loading === LOADING_STATUS.pending;
