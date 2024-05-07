"use client";
import { useState } from "react";
import Chat from "@/components/Chat/Chat";

export default function AdminPAge() {
  const [chatId, setChatId] = useState(1);

  return (
    <section className="flex flex-row bg-white text-black min-h-screen">
      <aside className="bg-gray-800 text-white flex flex-col gap-1 w-300">
        <h1 className=" self-center">Chats</h1>
        <button
          className="m-2 bg-gray-600 rounded p-2 text-left"
          onClick={() => {
            setChatId(1);
          }}
        >
          Chat1
        </button>
        <button
          className="m-2 bg-gray-600 rounded p-2 text-left"
          onClick={() => {
            setChatId(2);
          }}
        >
          Chat2
        </button>
      </aside>
      <Chat chatId={chatId} />
    </section>
  );
}
