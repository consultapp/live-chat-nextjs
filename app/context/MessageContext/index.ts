import { createContext, useContext } from "react";
import { IMessage } from "../../types";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";

export interface IMessageContext {
  chatSlug: string;
  messages: IMessage[];
  loading: keyof typeof LOADING_STATUS;
}

export const initialMessageContext: IMessageContext = {
  chatSlug: "",
  messages: [],
  loading: LOADING_STATUS.idle,
};

export const MessageContext = createContext<IMessageContext>(
  initialMessageContext
);

export const MessageContextDispatch = createContext<
  React.Dispatch<{
    type: string;
    payload?: any;
  }>
>(() => {});

export function useChatSlug() {
  return useContext(MessageContext).chatSlug;
}

export function useMessages() {
  return useContext(MessageContext).messages;
}

export function useLoadingMessages() {
  return useContext(MessageContext).loading;
}

export function useMessageDispatch() {
  return useContext(MessageContextDispatch);
}
