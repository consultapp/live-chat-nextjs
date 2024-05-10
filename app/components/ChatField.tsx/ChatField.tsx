import { ChatContext } from "@/context/ChatContext";
import USER_ROLE from "@/fixtures/USER_ROLE";
import { messages } from "@/msg";
import React, { useContext, useEffect, useRef } from "react";

type Props = { role?: keyof typeof USER_ROLE };

export default function ChatField({ role = USER_ROLE.user }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { chatSlug } = useContext(ChatContext);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        // behavior: "smooth",
      });
      console.dir(ref.current);
    }
  }, [chatSlug]);

  return (
    <>
      <div
        className="flex flex-col flex-grow gap-8 overflow-y-scroll "
        ref={ref}
      >
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
      <form className="flex flex-row bg-gray p-2 border gap-2 bg-white mx-4 rounded">
        <input type="text" className="flex-grow border-collapse " />
        <button>Send</button>
      </form>
    </>
  );
}
