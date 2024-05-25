import React, { useEffect, useState } from "react";
import { IChatListElement } from "../../types";
import { getChatsAction } from "@/actions/getChatsAction";
import { useSlug } from "@/store/dataSlice/hooks";
import { useAppDispatch } from "@/store/hooks";
import { setSlug } from "@/store/dataSlice";

type Props = {};

export default function ChatList({}: Props) {
  const chatSlug = useSlug();
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState<IChatListElement[]>([]);

  useEffect(() => {
    getChatsAction().then(({ data }) => {
      if (data && data.length) {
        setChats(data.map(({ id, attributes }) => ({ id, ...attributes })));
        dispatch(setSlug(data.at(0)?.attributes?.slug || ""));
      }
    });
  }, [setChats, dispatch]);

  return (
    <div className="overflow-y-scroll flex flex-col rounded-xl">
      {chats &&
        chats.map(({ slug, userName }) => (
          <button
            key={slug}
            className={`m-2 bg-gray-600 rounded p-2 text-left ${
              slug === chatSlug && "text-yellow-400"
            } font-bold`}
            onClick={() => {
              if (dispatch) dispatch(setSlug(slug));
            }}
          >
            {userName}
          </button>
        ))}
    </div>
  );
}
