import React, { useCallback, useContext, useRef, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { socket } from "@/socket";
import { useIsConnected } from "@/context/SocketProvider";
import { sendMessageAction } from "@/actions/sendMessageAction";
import { ISendMessages } from "@/types";
import { addMessages } from "@/store/dataSlice";
import { useAppDispatch } from "@/store/hooks";
import { useSlug } from "@/store/dataSlice/hooks";
import SvgLoading from "@/components/Svg/SvgLoading";
import SvgPaperPlane from "@/components/Svg/SvgPaperPlane";
import { askChatGpt } from "@/actions/askChatGpt";

type Props = {};

export default function ChatSendMessageForm({}: Props) {
  const [sending, setSending] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isConnected = useIsConnected();
  const slug = useSlug();
  const { user } = useContext(UserContext);
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (inputRef?.current?.value && formRef?.current) {
        if (inputRef?.current?.value.length > 0) {
          setSending(true);

          sendMessageAction(new FormData(formRef.current)).then(
            (res: ISendMessages) => {
              if (res && res.messages && isConnected) {
                socket.emit("new-messages", res);
                dispatch(addMessages(res.messages));
                askChatGpt(res.messages[0]);
              } else {
                console.log(res.error);
              }
              setSending(false);
            }
          );
          inputRef.current.value = "";
          inputRef.current.focus();

          return;
        }
        // setError("Имя должно быть от 3 до 30 символов");
        return;
      }
      // setError("Введите корректное имя.");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputRef, formRef]
  );

  return (
    <form className="flex flex-row  p-2  gap-2 mx-4 " ref={formRef}>
      <input
        type="text"
        name="text"
        disabled={sending}
        className="flex-grow px-2  bg-white rounded"
        ref={inputRef}
        placeholder="Введите текст"
      />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="userType" value={user.userType} />
      <button
        className="btn px-1 w-14 flex justify-center"
        disabled={sending}
        onClick={clickHandler}
      >
        {sending ? (
          <SvgLoading rotating={true} width={20} height={20} />
        ) : (
          <SvgPaperPlane />
        )}
      </button>
    </form>
  );
}
