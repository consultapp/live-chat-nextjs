import { ChatContext } from "@/context/ChatContext";
import {
  MessageContext,
  MessageContextDispatch,
} from "@/context/MessageContext";
import { UserContext } from "@/context/UserContext";
import { loadMessages } from "@/functions/loadMessages";
import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";

type Props = {};

export default function ChatMessages({}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useContext(MessageContextDispatch);

  const { messages, loading } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const { chatSlug } = useContext(ChatContext);

  useEffect(() => {
    if (!messages.length && chatSlug) {
      dispatch({ type: "startLoading" });
      loadMessages(chatSlug).then((data) => {
        dispatch({ type: "saveMessages", payload: data });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
      });
      console.dir(ref.current);
    }
  }, [messages]);

  // if (
  //   loading === LOADING_STATUS.pending ||
  //   (loading === LOADING_STATUS.idle && chatSlug)
  // )

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
            className={`cursor-pointer overflow-hidden break-words border bg-white border-gray-300 rounded p-2 max-w-70 w-fit text-balance scroll-m-1  
        ${item.userType === user.userType && "self-end"}
        `}
          >
            {item.text}
            <div
              className={`absolute text-sm -bottom-5 ${
                item.userType === user.userType && "right-1"
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
