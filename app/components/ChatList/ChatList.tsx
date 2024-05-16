import { ChatContext } from "@/context/ChatContext";
import { getChats } from "@/functions/getChats";
import React, { useContext, useEffect, useState } from "react";
import { IChatListElement } from "../../types";

type Props = {};

export default function ChatList({}: Props) {
  const { chatSlug, setChatSlug } = useContext(ChatContext);
  const [chats, setChats] = useState<IChatListElement[]>([]);

  useEffect(() => {
    getChats().then(({ data }) => {
      console.log("ChatList:data", data);
      if (data && data.length) {
        console.log("data", data);
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
              if (setChatSlug) setChatSlug(slug);
            }}
          >
            {userName}
          </button>
        ))}
    </>
  );
}
