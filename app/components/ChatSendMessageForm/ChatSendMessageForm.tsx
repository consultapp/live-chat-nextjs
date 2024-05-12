import { addMessage } from "@/actions/addMessage";
import { ChatContext } from "@/context/ChatContext";
import React, { useContext, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { updateMessages } from "@/functions/updateMessages";
import {
  MessageContext,
  MessageContextDispatch,
} from "@/context/MessageContext";
import { loadMessages } from "@/functions/loadMessages";
import { UserContext } from "@/context/UserContext";

type Props = {};

export default function ChatSendMessageForm({}: Props) {
  const [state, formAction, isPending] = useFormState(addMessage, {});
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chatSlug } = useContext(ChatContext);
  const { messages } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const dispatch = useContext(MessageContextDispatch);

  useEffect(() => {
    if (chatSlug && state && state.data) {
      if (inputRef?.current) inputRef.current.value = "";

      if (messages && messages.length) {
        const date = messages.at(-1)?.createdAt ?? new Date(0);
        updateMessages(chatSlug, date).then((data) => {
          dispatch({ type: "updateMessages", payload: data });
        });
      } else {
        loadMessages(chatSlug).then((data) => {
          dispatch({ type: "saveMessages", payload: data });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatSlug, dispatch, state]);

  return (
    <>
      <form
        className="flex flex-row  p-2  gap-2 mx-4 "
        action={formAction}
        ref={formRef}
      >
        <input
          type="text"
          name="text"
          className="flex-grow px-2  bg-white"
          disabled={isPending}
          ref={inputRef}
          placeholder="Введите текст"
        />
        <input type="hidden" name="chatSlug" value={chatSlug} />
        <input type="hidden" name="userType" value={user.userType} />
        <button
          disabled={isPending}
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            if (inputRef?.current?.value && formRef?.current) {
              const n = inputRef?.current?.value;
              if (n.length > 0) {
                formRef.current.requestSubmit();
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
