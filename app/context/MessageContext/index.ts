import { createContext } from "react";
import { IMessage } from "../../types";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";

export interface IMessageContext {
  messages: IMessage[];
  loading: keyof typeof LOADING_STATUS;
}

export const initialMessageContext: IMessageContext = {
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
