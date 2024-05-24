import { useAppSelector } from "../hooks";
import {
  selectDataLoading,
  selectDataMessages,
  selectDataSlug,
} from "./selectors";

export const useMessages = () => {
  return useAppSelector(selectDataMessages);
};

export const useSlug = () => {
  return useAppSelector(selectDataSlug);
};

export const useLoading = () => {
  return useAppSelector(selectDataLoading);
};
