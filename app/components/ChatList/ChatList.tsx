import { ChatContext } from "@/context/ChatContext";
import React, { useContext } from "react";

type Props = {};

export default function ChatList({}: Props) {
  const { setChatSlug } = useContext(ChatContext);

  return (
    <>
      <button
        className="m-2 bg-gray-600 rounded p-2 text-left text-yellow-400 font-bold"
        onClick={() => {
          if (setChatSlug) setChatSlug(1);
        }}
      >
        Chat1
      </button>
      <button
        className="m-2 bg-gray-600 rounded p-2 text-left"
        onClick={() => {
          if (setChatSlug) setChatSlug(2);
        }}
      >
        Chat2
      </button>
    </>
  );
}
