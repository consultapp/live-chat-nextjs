import { ChatContext } from "@/context/ChatContext";
import {
  MessageContext,
  MessageContextDispatch,
} from "@/context/MessageContext";
import USER_TYPE from "@/fixtures/USER_TYPE";
import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";

type Props = { role: string };

export default function ChatMessages({ role = USER_TYPE.user }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { messages, loading } = useContext(MessageContext);

  console.log("ChatMessages:", messages, loading);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
      });
      console.dir(ref.current);
    }
  }, []);

  return (
    <div
      className="flex flex-col flex-grow gap-10 overflow-y-scroll "
      ref={ref}
    >
      {messages.map((item) => (
        <div
          key={item.id}
          className={`cursor-pointer relative flex flex-col mx-4`}
        >
          <div
            className={`cursor-pointer  border bg-white border-gray-300 rounded p-2 max-w-70 w-fit text-balance scroll-m-1  
        ${item.userType === role && "self-end"}
        `}
          >
            {item.text}
            <div
              className={`absolute text-sm -bottom-5 ${
                item.userType === role && "right-1"
              } `}
            >
              {new Date(item.createdAt).toLocaleTimeString()}&nbsp;
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
