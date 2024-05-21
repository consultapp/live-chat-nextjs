import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddMessages,
  IMessage,
  IMessageStrapi,
  IStrapiResponse,
  TArray,
} from "@/types";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";

interface IDataState {
  chatSlug: string;
  messages: IMessage[];
  loading: keyof typeof LOADING_STATUS;
}

const initialState: IDataState = {
  chatSlug: "",
  messages: [],
  loading: LOADING_STATUS.idle,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    saveMessages: (
      state,
      {
        payload,
      }: PayloadAction<
        IStrapiResponse<TArray<IMessageStrapi>> & { chatSlug: string }
      >
    ) => {
      state.messages =
        payload.data?.map(
          ({ id, attributes }: { id: number; attributes: any }) => ({
            id,
            ...attributes,
          })
        ) || [];
      state.loading = LOADING_STATUS.fulfilled;
      state.chatSlug = payload.chatSlug;
    },

    addMessages: (state, { payload }: PayloadAction<IAddMessages>) => {
      const { messages = [], chatSlug } = payload;
      if (
        state.messages.at(-1)?.id !== messages.at(-1)?.id &&
        state.chatSlug === chatSlug
      ) {
        state.messages.push(...messages);
        state.loading = LOADING_STATUS.fulfilled;
      } else {
        state.loading = LOADING_STATUS.fulfilled;
      }
    },

    startLoading: (state) => {
      state.loading = LOADING_STATUS.pending;
    },

    setChatSlug: (state, { payload }: PayloadAction<string>) => {
      state.chatSlug = payload;
      state.messages = [];
      state.loading = LOADING_STATUS.idle;
    },
  },
});

export const { saveMessages, addMessages, startLoading, setChatSlug } =
  dataSlice.actions;

export const dataReducer = dataSlice.reducer;
