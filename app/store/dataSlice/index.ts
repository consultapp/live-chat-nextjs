import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISendMessages, IMessage } from "@/types";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";

interface IDataState {
  slug: string;
  messages: Record<string, IMessage[]>;
  messageIds: number[];
  loading: keyof typeof LOADING_STATUS;
}

const initialState: IDataState = {
  slug: "",
  messages: {},
  messageIds: [],
  loading: LOADING_STATUS.idle,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addMessages: (state, { payload }: PayloadAction<IMessage[]>) => {
      payload.forEach((message) => {
        if (!state.messageIds.includes(message.id)) {
          if (!(message.chatSlug in state.messages))
            state.messages[message.chatSlug] = [];
          state.messages[message.chatSlug].push(message);
          state.messageIds.push(message.id);
        }
      });
    },

    addMessage: (state, { payload }: PayloadAction<IMessage>) => {
      if (!state.messageIds.includes(payload.id)) {
        if (!(payload.chatSlug in state.messages))
          state.messages[payload.chatSlug] = [];
        state.messages[payload.chatSlug].push(payload);
        state.messageIds.push(payload.id);
      }
    },

    startLoading: (state) => {
      state.loading = LOADING_STATUS.pending;
    },
    fulfullLoading: (state) => {
      state.loading = LOADING_STATUS.fulfilled;
    },
    rejectLoading: (state) => {
      state.loading = LOADING_STATUS.rejected;
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

export const { addMessages, startLoading, setSlug } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
