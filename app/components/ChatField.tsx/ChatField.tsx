import { addMessage } from "@/actions/addMessage";
import { ChatContext } from "@/context/ChatContext";
import USER_TYPE from "@/fixtures/USER_TYPE";
import { messages } from "@/msg";
import React, { useContext, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import ChatMessages from "../ChatMessages/ChatMessages";

type Props = { role?: keyof typeof USER_TYPE };

export default function ChatField({ role = USER_TYPE.user }: Props) {
  const [state, formAction, isPending] = useFormState(addMessage, null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chatSlug } = useContext(ChatContext);

  return (
    <>
      <ChatMessages />
      <form
        className="flex flex-row bg-gray p-2 border gap-2 bg-white mx-4 rounded"
        action={formAction}
        ref={formRef}
      >
        <input
          type="text"
          name="text"
          className="flex-grow border-collapse "
          disabled={isPending}
          ref={inputRef}
        />
        <input type="hidden" name="chatSlug" value={chatSlug} />
        <button
          disabled={isPending}
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
          Send
        </button>
      </form>
    </>
  );
}
