import { ChatContext } from "@/ChatContext";
import { startNewChat } from "@/actions";
import { useContext, useLayoutEffect } from "react";
import { useFormState } from "react-dom";

type Props = {};

export default function ChatNewForm({}: Props) {
  const [state, formAction, isPending] = useFormState(startNewChat, 0);

  const { chatId, setChatId } = useContext(ChatContext);

  useLayoutEffect(() => {
    if (setChatId) setChatId(state);
    console.log("useLayoutEffect", state);
  }, [state, setChatId]);

  console.log("isPending", isPending, state, chatId);

  return (
    <div className={`flex flex-col justify-center h-full `}>
      {state ?? ""}
      <form action={formAction} className={`flex flex-col gap-3`}>
        <input
          placeholder="Ваше имя"
          id="name"
          name="name"
          className="w-1/2 self-center p-2"
        />
        <button className="" type="submit">
          Начать чат
        </button>
      </form>
    </div>
  );
}
