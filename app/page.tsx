"use client";
import { useState } from "react";
import Chat from "@/components/Chat/Chat";
import ChatList from "@/components/ChatList/ChatList";

export default function Home() {
  const [chatId, setChatId] = useState(1);

  return (
    <section className="flex flex-row bg-white text-black min-h-screen">
      <aside className="bg-gray-800 text-white flex flex-col gap-1 w-300">
        <h1 className=" self-center">Chats</h1>
        <ChatList setChatId={setChatId} />
      </aside>
      <Chat chatId={chatId} />
    </section>
  );
}