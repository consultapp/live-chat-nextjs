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
  slug: string;
  messages: Record<string, IMessage[]>;
  loading: keyof typeof LOADING_STATUS;
}

const initialState: IDataState = {
  slug: "",
  messages: {},
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
        IStrapiResponse<TArray<IMessageStrapi>> & { slug: string }
      >
    ) => {
      state.messages[payload.slug] =
        payload.data?.map(
          ({ id, attributes }: { id: number; attributes: any }) => ({
            id,
            ...attributes,
          })
        ) || [];
      state.loading = LOADING_STATUS.fulfilled;
      state.slug = payload.slug;
    },

    addMessages: (state, { payload }: PayloadAction<IAddMessages>) => {
      const { messages = [], slug } = payload;
      if (
        state.messages[slug].at(-1)?.id !== messages.at(-1)?.id &&
        state.slug === slug
      ) {
        state.messages[slug].push(...messages);
        state.loading = LOADING_STATUS.fulfilled;
      } else {
        state.loading = LOADING_STATUS.fulfilled;
      }
    },

    startLoading: (state) => {
      state.loading = LOADING_STATUS.pending;
    },

    setSlug: (state, { payload }: PayloadAction<string>) => {
      if (window) window.localStorage.setItem("slug", payload);
      if (state.slug !== payload) {
        state.slug = payload;
        state.loading = (state.messages[payload] || []).length
          ? LOADING_STATUS.fulfilled
          : LOADING_STATUS.idle;
      }
    },
  },
});

export const { saveMessages, addMessages, startLoading, setSlug } =
  dataSlice.actions;

export const dataReducer = dataSlice.reducer;
