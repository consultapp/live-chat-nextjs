"use client";
import React, { useState } from "react";
import { ChatContext } from ".";

type Props = { children: React.ReactElement };

export default function ChatProvider({ children }: Props) {
  const [chatId, setChatId] = useState(0);

  return (
    <ChatContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
}
