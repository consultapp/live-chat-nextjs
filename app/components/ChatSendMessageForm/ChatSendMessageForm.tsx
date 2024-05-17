import React, { useContext, useRef, useState } from "react";
import { MessageContextDispatch, useChatSlug } from "@/context/MessageContext";
import { UserContext } from "@/context/UserContext";
import { socket } from "@/socket";
import { useIsConnected } from "@/context/SocketProvider";
import { addMessageAction } from "@/actions/addMessageAction";
import { IAddMessages } from "@/types";

type Props = {};

export default function ChatSendMessageForm({}: Props) {
  const [sending, setSending] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isConnected = useIsConnected();
  const chatSlug = useChatSlug();
  const { user } = useContext(UserContext);
  const dispatch = useContext(MessageContextDispatch);

  console.log("==== Component ChatSendMessageForm ====");

  return (
    <form className="flex flex-row  p-2  gap-2 mx-4 " ref={formRef}>
      <input
        type="text"
        name="text"
        disabled={sending}
        className="flex-grow px-2  bg-white"
        ref={inputRef}
        placeholder="Введите текст"
      />
      <input type="hidden" name="chatSlug" value={chatSlug} />
      <input type="hidden" name="userType" value={user.userType} />
      <button
        className="btn"
        disabled={sending}
        onClick={(e) => {
          e.preventDefault();
          if (inputRef?.current?.value && formRef?.current) {
            if (inputRef?.current?.value.length > 0) {
              addMessageAction(new FormData(formRef.current)).then(
                (data: IAddMessages) => {
                  if (data && !data.error && isConnected) {
                    socket.emit("new-message", data);
                    dispatch({ type: "addMessages", payload: data });
                    if (inputRef?.current) {
                      inputRef.current.value = "";
                      inputRef.current.focus();
                    }
                  } else {
                    console.log(data.error);
                  }
                  setSending(false);
                }
              );

              setSending(true);

              return;
            } else {
              // setError("Имя должно быть от 3 до 30 символов");
              return;
            }
          }
          // setError("Введите корректное имя.");
        }}
      >
        Отправить
      </button>
    </form>
  );
}
