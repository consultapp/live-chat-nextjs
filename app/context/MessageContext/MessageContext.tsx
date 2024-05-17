"use client";
import React, { useReducer } from "react";
import {
  IMessageContext,
  MessageContext,
  MessageContextDispatch,
  initialMessageContext,
} from ".";
import { reducer } from "./reducer";

type Props = { children: React.ReactElement };

export default function MessagesProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialMessageContext);

  return (
    <MessageContext.Provider value={state as IMessageContext}>
      <MessageContextDispatch.Provider value={dispatch}>
        {children}
      </MessageContextDispatch.Provider>
    </MessageContext.Provider>
  );
}
