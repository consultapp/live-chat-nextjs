import { messages } from "@/msg";
import React, { useEffect, useRef } from "react";

type Props = {};

export default function ChatMessages({}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
      });
      console.dir(ref.current);
    }
  }, []);

  return (
    <div className="flex flex-col flex-grow gap-8 overflow-y-scroll " ref={ref}>
      {messages
        .filter((item) => item.chatSlug === chatSlug)
        .map((item, i) => (
          <div
            key={i}
            className={`cursor-pointer relative border bg-white border-gray-300 rounded p-2 max-w-70 w-fit text-balance scroll-m-1  mx-4
        ${item.userRole === role && "self-end"}
        `}
          >
            {item.text}
            <div
              className={`absolute -bottom-6 ${
                item.userRole === role && "right-0"
              } `}
            >
              {item.chatSlug}
            </div>
          </div>
        ))}
    </div>
  );
}
