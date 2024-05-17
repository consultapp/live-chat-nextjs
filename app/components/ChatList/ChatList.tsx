import React, { useEffect, useState } from "react";
import { IChatListElement } from "../../types";
import { useChatSlug, useMessageDispatch } from "@/context/MessageContext";
import { getChatsAction } from "@/actions/getChatsAction";

type Props = {};

export default function ChatList({}: Props) {
  const chatSlug = useChatSlug();
  const dispatch = useMessageDispatch();
  const [chats, setChats] = useState<IChatListElement[]>([]);

  useEffect(() => {
    getChatsAction().then(({ data }) => {
      if (data && data.length) {
        setChats(data.map(({ id, attributes }) => ({ id, ...attributes })));
      }
    });
  }, []);

  return (
    <>
      {chats &&
        chats.map(({ slug, userName }) => (
          <button
            key={slug}
            className={`m-2 bg-gray-600 rounded p-2 text-left ${
              slug === chatSlug && "text-yellow-400"
            } font-bold`}
            onClick={() => {
              if (dispatch) dispatch({ type: "setChatSlug", payload: slug });
            }}
          >
            {userName}
          </button>
        ))}
    </>
  );
}
