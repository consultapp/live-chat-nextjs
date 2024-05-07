"use client";
import { useState } from "react";
import Chat from "@/components/Chat/Chat";

export default function HomePage() {
  const [chatId, setChatId] = useState(1);

  return <Chat chatId={chatId} />;
}
