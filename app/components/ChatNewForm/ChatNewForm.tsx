import { startNewChat } from "@/actions/startNewChat";
import { setSlug } from "@/store/dataSlice";
import { useAppDispatch } from "@/store/hooks";
import { useLayoutEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

type Props = {};

export default function ChatNewForm({}: Props) {
  const dispatch = useAppDispatch();
  const [state, formAction, isPending] = useFormState(startNewChat, {
    slug: "",
  });
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    if (state && !state.error && state.slug) {
      dispatch(setSlug(state.slug));
    } else if (state?.error) {
      setError("Ошибка создания чата. Свяжитесь с администратором.");
    }
  }, [state]);

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
          disabled={isPending}
        />
        <label className=" text-red-800">{error}</label>
        <button
          className="btn bg-gray-800 text-white rounded p-2"
          type="submit"
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            if (inputRef?.current?.value && formRef?.current) {
              const n = inputRef?.current?.value;
              if (n.length > 3 && n.length < 30) {
                formRef.current.requestSubmit();
                return;
              } else {
                setError("Имя должно быть от 4 до 30 символов");
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
