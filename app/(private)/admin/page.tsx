"use client";
import Chat from "@/components/Chat/Chat";
import ChatList from "@/components/ChatList/ChatList";

export default function AdminPAge() {
  return (
    <>
      <section className="flex flex-row bg-white text-black min-h-screen">
        <aside className="bg-gray-800 text-white flex flex-col gap-1 w-300 py-4 max-h-screen ">
          <ChatList />
        </aside>
        <Chat />
      </section>
    </>
  );
}
