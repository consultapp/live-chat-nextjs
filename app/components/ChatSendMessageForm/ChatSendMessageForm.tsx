import { ChatContext } from "@/context/ChatContext";
import React, { useContext, useEffect, useRef } from "react";
import {
  MessageContextDispatch,
} from "@/context/MessageContext";
import { loadMessages } from "@/functions/loadMessages";
import { UserContext } from "@/context/UserContext";
import { socket } from "@/socket";

type Props = {};

export default function ChatSendMessageForm({}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chatSlug } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const dispatch = useContext(MessageContextDispatch);

  useEffect(() => {
    if (chatSlug) {
      loadMessages(chatSlug).then((data) => {
        dispatch({ type: "saveMessages", payload: data });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatSlug, dispatch]);

  return (
    <>
      <form className="flex flex-row  p-2  gap-2 mx-4 " ref={formRef}>
        <input
          type="text"
          name="text"
          className="flex-grow px-2  bg-white"
          ref={inputRef}
          placeholder="Введите текст"
        />
        <input type="hidden" name="chatSlug" value={chatSlug} />
        <input type="hidden" name="userType" value={user.userType} />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            if (inputRef?.current?.value && formRef?.current) {
              if (inputRef?.current?.value.length > 0) {
                formRef.current.requestSubmit();
                socket.emit("new-message", new FormData(formRef.current));
       if (inputRef?.current) inputRef.current.value = "";

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
    </>
  );
}
