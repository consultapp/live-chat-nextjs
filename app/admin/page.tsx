"use client";
import Chat from "@/components/Chat/Chat";
import ChatList from "@/components/ChatList/ChatList";
import { UserContext } from "@/context/UserContext";
import USER_TYPE from "@/fixtures/USER_TYPE";
import { useContext, useLayoutEffect } from "react";

export default function AdminPAge() {
  const { setUser } = useContext(UserContext);

  useLayoutEffect(() => {
    setUser({ userType: USER_TYPE.manager });
  }, [setUser]);

  return (
    <section className="flex flex-row bg-white text-black min-h-screen">
      <aside className="bg-gray-800 text-white flex flex-col gap-1 w-300 py-4">
        <h1 className="self-center font-bold text-xl">Chats</h1>
        <ChatList />
      </aside>
      <Chat />
    </section>
  );
}
