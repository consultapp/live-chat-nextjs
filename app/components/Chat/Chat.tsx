import { messages } from "@/app/msg";
import React from "react";

type Props = { chatId: number };

export default function Chat({ chatId }: Props) {
  return (
    <main className="flex flex-col p-2 flex-grow  max-w-half1 max-h-screen gap-2 px-4">
      <div className="flex flex-col flex-grow gap-8 overflow-y-scroll ">
        {messages
          .filter((item) => item.chatId === chatId)
          .map((item, i) => (
            <div
              key={i}
              className={`relative border border-gray-300 rounded p-2 max-w-70 w-fit ${
                item.fromAdmin ? "self-end" : ""
              }`}
            >
              {item.text}
              <div
                className={`absolute -bottom-6  ${
                  !item.fromAdmin ? "left-0" : "right-0"
                }`}
              >
                {item.chatId}
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-row bg-gray p-2 border gap-2">
        <input type="text" className="flex-grow border-collapse " />
        <button>Send</button>
      </div>
    </main>
  );
}
