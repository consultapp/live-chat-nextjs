import { UserContext } from "@/context/UserContext";
import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useIsConnected } from "../../context/SocketProvider/index";
import { socket } from "@/socket";
import { loadMessagesAction } from "@/actions/loadMessagesAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLoading, useMessages, useSlug } from "@/store/dataSlice/hooks";
import { addMessages, startLoading } from "@/store/dataSlice";
import { selectDataIfLoadMessages } from "@/store/dataSlice/selectors";

type Props = {};

export default function ChatMessages({}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const isConnected = useIsConnected();
  const messages = useMessages();
  const { user } = useContext(UserContext);
  const slug = useSlug();
  const loading = useLoading();
  const ifLoadMessages = useAppSelector(selectDataIfLoadMessages);

  useEffect(() => {
    if (isConnected && !socket.hasListeners("add-messages"))
      socket.on("add-messages", (data) => {
        dispatch(addMessages(data));
      });
  }, [isConnected, dispatch]);

  useEffect(() => {
    if (ifLoadMessages) {
      dispatch(startLoading());
      loadMessagesAction(slug).then((data) => {
        if (data.error) {
          console.log("Error:", data.error);
        } else {
          dispatch(addMessages(data));
        }
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
