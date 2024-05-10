import { startNewChat } from "@/actions/startNewChat";
import { ChatContext } from "@/context/ChatContext";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

type Props = {};

export default function ChatNewForm({}: Props) {
  const [state, formAction, isPending] = useFormState(startNewChat, null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { setChatSlug } = useContext(ChatContext);

  // function onClick(e) {
  //   e.preventDefault();
  //   grecaptcha.ready(function() {
  //     grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(function(token) {
  //         // Add your logic to submit to your backend server here.
  //     });
  //   });
  // }

  useLayoutEffect(() => {
    {
      if (setChatSlug) {
        if (state && !state.error && state.chatSlug) {
          setChatSlug(state.chatSlug);
        } else if (state?.error) {
          setError("Ошибка создания чата. Свяжитесь с администратором.");
        }
      }
    }
  }, [state, setChatSlug]);

  return (
    <div className={`flex flex-col justify-center items-center h-full gap-3 `}>
      <h1 className="text-xl">Новый чат</h1>
      <form
        action={formAction}
        className={`flex flex-col items-center gap-3 bg-white border  w-3/4 p-4 rounded-xl`}
        ref={formRef}
      >
        <input
          placeholder="Ваше имя"
          id="name"
          name="name"
          className="self-center p-2 border rounded w-full"
          ref={inputRef}
        />
        <label className=" text-red-800">{error}</label>
        <button
          className=" "
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (inputRef?.current?.value && formRef?.current) {
              const n = inputRef?.current?.value;
              if (n.length > 3 && n.length < 15) {
                formRef.current.requestSubmit();
                return;
              } else {
                setError("Имя должно быть от 3 до 15 символов");
                return;
              }
            }
            setError("Введите корректное имя.");
          }}
        >
          Начать
        </button>
      </form>
    </div>
  );
}
