import React, { useCallback, useEffect, useRef, useState } from "react";
import { IChatListElement } from "../../types";
import { getChatsAction } from "@/actions/getChatsAction";
import { useAppDispatch } from "@/store/hooks";
import { setSlug } from "@/store/dataSlice";
import ChatListElements from "../ChatListElements/ChatListElements";
import SvgLoading from "@/components/Svg/SvgLoading";

type Props = {};

export default function ChatList({}: Props) {
  const t = useRef<ReturnType<typeof setInterval> | null>(null);
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState<IChatListElement[]>([]);

  const updateChatList = useCallback(
    () =>
      getChatsAction().then(({ data }) => {
        if (data && data.length) {
          setChats(data.map(({ id, attributes }) => ({ id, ...attributes })));
        }
      }),
    [setChats]
  );

  const clickHandle = useCallback(
    (newSlug: string) => {
      if (dispatch) dispatch(setSlug(newSlug));
    },
    [dispatch]
  );

  useEffect(() => {
    updateChatList();
    if (!t.current) t.current = setInterval(updateChatList, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChatList]);

  return (
    <>
      <h1 className="self-center font-bold text-xl flex justify-center">
        Chats
        <button onClick={updateChatList}>
          <SvgLoading className="pl-2 pt-1" />
        </button>
      </h1>
      <div className="overflow-y-scroll flex flex-col rounded-xl">
        <ChatListElements clickHandle={clickHandle} chats={chats} />
      </div>
    </>
  );
}
