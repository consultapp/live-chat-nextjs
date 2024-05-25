import { setSlug } from "@/store/dataSlice";
import { useSlug } from "@/store/dataSlice/hooks";
import { useAppDispatch } from "@/store/hooks";
import { IChatListElement } from "@/types";
import React, { useEffect } from "react";

type Props = {
  chats: IChatListElement[];
  clickHandle: (newSlug: string) => void;
};

export default function ChatListElements({ chats, clickHandle }: Props) {
  const chatSlug = useSlug();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chatSlug && chats.at(0)?.slug)
      dispatch(setSlug(chats.at(0)?.slug || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatSlug, dispatch]);

  return (
    chats &&
    chats.map(({ slug, userName }) => (
      <button
        key={slug}
        className={`m-2 bg-gray-600 rounded p-2 text-left ${
          slug === chatSlug && "text-yellow-400"
        } font-bold`}
        onClick={() => clickHandle(slug)}
      >
        {userName}
      </button>
    ))
  );
}
