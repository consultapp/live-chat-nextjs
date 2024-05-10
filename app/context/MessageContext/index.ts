import { createContext } from "react";
import USER_ROLE from "@/fixtures/USER_ROLE";
import { IMessage } from "../../../types";

interface IInitialMessageContext {
  messages: IMessage[];
  lastDate: Date | null;
  firstDate: Date | null;
  userType: keyof typeof USER_ROLE;
}

export const initialMessageContext: IInitialMessageContext = {
  messages: [],
  lastDate: null,
  firstDate: null,
  userType: USER_ROLE.user,
};

export const MessageContext = createContext(initialMessageContext);

export const MessageContextDispatch = createContext(
  ({ type, payload }: { type: string; payload: any }) => {}
);
