import React, { useCallback, useEffect, useRef, useState } from "react";
import { IChatListElement } from "../../types";
import { getChatsAction } from "@/actions/getChatsAction";
import { useSlug } from "@/store/dataSlice/hooks";
import { useAppDispatch } from "@/store/hooks";
import { setSlug } from "@/store/dataSlice";
import ChatListElements from "../ChatListElements/ChatListElements";

type Props = {};

export default function ChatList({}: Props) {
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
  }, []);

  return (
    <>
      <h1 className="self-center font-bold text-xl">
        Chats
        <button onClick={updateChatList}>
          <svg
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 490 512.34"
            className="pl-2 pt-1"
            fill="#fff"
          >
            <path
              fillRule="nonzero"
              d="M350.7 120.42c-29.58-20.86-64.36-32.14-99.43-32.96-34.67-.81-69.65 8.56-100.2 28.95-11.31 7.55-21.54 15.95-30.63 25-30.42 30.27-47.96 67.96-51.91 106.86-3.96 39.02 5.63 79.48 29.46 115.16 7.05 10.55 15.38 20.75 25 30.43 21.53 21.64 47.81 36.92 76.33 44.74 28.1 7.7 58.66 8.23 89.33.52 11.02-2.77 21.54-6.24 31.36-10.4 9.27-3.93 18.58-8.81 27.77-14.65 15.8-10.02 36.75-5.33 46.78 10.47 10.03 15.8 5.34 36.76-10.47 46.78-11.64 7.4-24.35 13.96-37.84 19.68-13.64 5.78-27.43 10.4-41.17 13.85-41.98 10.55-84.26 9.72-123.52-1.04-40.01-10.98-76.68-32.24-106.54-62.25-12.68-12.74-23.76-26.32-33.22-40.5C8.93 351.82-4.28 295.81 1.21 241.65c5.5-54.29 29.68-106.57 71.52-148.22 12.07-12.01 25.66-23.16 40.71-33.21 42.55-28.41 91.13-41.46 139.16-40.34 44.75 1.04 89.06 14.36 127.61 38.97l-3.9-14.78c-4.93-18.76 6.28-37.98 25.03-42.91 18.76-4.93 37.98 6.28 42.91 25.03l24.38 92.5c5.95 18.4-4.07 38.19-22.46 44.24l-95.85 31.72c-18.45 6.08-38.34-3.96-44.42-22.41-6.07-18.45 3.96-38.34 22.42-44.41l22.38-7.41zM468.81 376.2c-7.97 16.9-28.15 24.14-45.06 16.17-16.9-7.97-24.14-28.15-16.16-45.06 2.02-4.29 3.73-8.29 5.1-11.98 1.43-3.85 2.75-7.96 3.96-12.31a154.65 154.65 0 0 0 4.28-20.71c.98-7.19 1.49-14.33 1.49-21.31 0-18.66 15.13-33.79 33.79-33.79 18.66 0 33.79 15.13 33.79 33.79-.01 10.43-.69 20.57-2.02 30.33a222.07 222.07 0 0 1-6.12 29.72c-1.63 5.86-3.58 11.82-5.83 17.87-2.32 6.23-4.73 12-7.22 17.28z"
            />
          </svg>
        </button>
      </h1>
      <div className="overflow-y-scroll flex flex-col rounded-xl">
        <ChatListElements clickHandle={clickHandle} chats={chats} />
      </div>
    </>
  );
}
