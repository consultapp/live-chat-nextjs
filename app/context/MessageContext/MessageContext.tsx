"use client";
import React, { useReducer, useState } from "react";
import {
  MessageContext,
  MessageContextDispatch,
  initialMessageContext,
} from ".";
import { reducer } from "./reducer";

type Props = { children: React.ReactElement };

export default function MessagesProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialMessageContext);

  return (
    <MessageContextDispatch.Provider value={dispatch}>
      <MessageContext.Provider value={state}>
        {children}
      </MessageContext.Provider>
    </MessageContextDispatch.Provider>
  );
}
