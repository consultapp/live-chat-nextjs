import { messages } from "@/msg";
import React from "react";
import USER_ROLE from "@/fixtures/USER_ROLE";

type Props = { chatId: number; role?: keyof typeof USER_ROLE };

export default function Chat({ chatId, role = USER_ROLE.user }: Props) {
  return (
    <main
      className={`flex flex-col p-2 flex-grow  max-h-screen gap-2 px-2 ${
        role === USER_ROLE.user ? "w-500 border border-gray-500" : "max-w-half1"
      }`}
    >
      <div className="flex flex-col flex-grow gap-8 overflow-y-scroll ">
        {messages
          .filter((item) => item.chatId === chatId)
          .map((item, i) => (
            <div
              key={i}
              className={`relative border border-gray-300 rounded p-2 max-w-70 w-fit text-balance scroll-m-1 ${
                item.fromAdmin ? "self-end" : ""
              } ${role === USER_ROLE.user ? "mx-4" : ""}`}
            >
              {item.text}
              <div
                className={`absolute -bottom-6  ${
                  !item.fromAdmin && role === USER_ROLE.user && "left-0"
                }
                  ${item.fromAdmin && role !== USER_ROLE.user && "right-0"}
                }`}
              >
                {item.chatId}
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-row bg-gray p-2 border gap-2 ">
        <input type="text" className="flex-grow border-collapse " />
        <button>Send</button>
      </div>
    </main>
  );
}
