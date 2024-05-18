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
  console.log("==== Component MessagesProvider ====");

  return (
    <MessageContextDispatch.Provider value={dispatch}>
      <MessageContext.Provider value={state as IMessageContext}>
        {children}
      </MessageContext.Provider>
    </MessageContextDispatch.Provider>
  );
}
