import React, { useContext } from "react";
import USER_ROLE from "@/fixtures/USER_ROLE";
import ChatField from "../ChatField.tsx/ChatField";
import ChatNewForm from "../ChatNewForm/ChatNewForm";
import { ChatContext } from "@/ChatContext";

type Props = { role?: keyof typeof USER_ROLE };

export default function Chat({ role = USER_ROLE.user }: Props) {
  const { chatId } = useContext(ChatContext);

  return (
    <main
      className={`flex bg-gray-800 h-screen p-3 ${
        role === USER_ROLE.user ? "w-500  border-gray-500" : "max-w-half1"
      }`}
    >
      <div
        className={`flex flex-col p-2 flex-grow gap-2 px-2 bg-blue-50 rounded-xl`}
      >
        {chatId ? <ChatField /> : <ChatNewForm />}
      </div>
    </main>
  );
}
