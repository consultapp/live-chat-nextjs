import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useIsConnected } from "../../context/SocketProvider/index";
import { socket } from "@/socket";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { getMessagesAction } from "@/actions/getMessagesAction";
import { useAppDispatch } from "@/store/hooks";
import { useLoading, useMessages, useSlug } from "@/store/dataSlice/hooks";

type Props = {};

export default function ChatMessages({}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const isConnected = useIsConnected();
  const messages = useMessages();
  const { user } = useContext(UserContext);
  const slug = useSlug();
  const loading = useLoading();

  useEffect(() => {
    if (isConnected) {
      socket.on("add-messages", (data) => {
        dispatch({ type: "addMessages", payload: { ...data } });
      });
    }
  }, [isConnected, dispatch]);

  useEffect(() => {
    if (loading === LOADING_STATUS.idle && slug) {
      dispatch({ type: "startLoading" });
      getMessagesAction(slug).then(({ data, error }) => {
        if (error) {
          console.log("Error:", error);
        } else
          dispatch({
            type: "saveMessages",
            payload: { data, slug },
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (slug && isConnected && user.userType === "user") {
      socket.emit("set-user", slug);
    }
  }, [slug, isConnected, user, user.userType]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
      });
    }
  }, [messages]);

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
