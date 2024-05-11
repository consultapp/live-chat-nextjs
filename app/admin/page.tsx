"use client";
import { useState } from "react";
import Chat from "@/components/Chat/Chat";
import USER_TYPE from "@/fixtures/USER_TYPE";
import ChatList from "@/components/ChatList/ChatList";

export default function AdminPAge() {
  const [chatSlug, setChatSlug] = useState(1);

  return (
    <section className="flex flex-row bg-white text-black min-h-screen">
      <aside className="bg-gray-800 text-white flex flex-col gap-1 w-300 py-4">
        <h1 className="self-center font-bold text-xl">Chats</h1>
        <ChatList />
      </aside>
      <Chat role={USER_TYPE.manager} />
    </section>
  );
}
