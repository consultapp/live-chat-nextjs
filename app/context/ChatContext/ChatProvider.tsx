"use client";
import React, { useLayoutEffect, useState } from "react";
import { ChatContext } from ".";

type Props = { children: React.ReactElement };

export default function ChatProvider({ children }: Props) {
  const [chatSlug, setChatSlug] = useState<string>("");

  return (
    <ChatContext.Provider value={{ chatSlug, setChatSlug }}>
      {children}
    </ChatContext.Provider>
  );
}
