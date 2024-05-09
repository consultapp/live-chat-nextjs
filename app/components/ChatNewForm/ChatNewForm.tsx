import { ChatContext } from "@/context/ChatContext";
import { startNewChat } from "@/actions";
import { useContext, useLayoutEffect } from "react";
import { useFormState } from "react-dom";

type Props = {};

export default function ChatNewForm({}: Props) {
  const [state, formAction, isPending] = useFormState(startNewChat, 0);

  const { setChatId } = useContext(ChatContext);

  // function onClick(e) {
  //   e.preventDefault();
  //   grecaptcha.ready(function() {
  //     grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(function(token) {
  //         // Add your logic to submit to your backend server here.
  //     });
  //   });
  // }

  useLayoutEffect(() => {
    if (setChatId) setChatId(state);
  }, [state, setChatId]);

  return (
    <div className={`flex flex-col justify-center items-center h-full `}>
      <form
        action={formAction}
        className={`flex flex-col items-center gap-3 bg-white border  w-1/2 p-4 rounded-xl`}
      >
        <input
          placeholder="Ваше имя"
          id="name"
          name="name"
          className=" self-center p-2 border rounded"
        />
        <button className=" " type="submit">
          Начать чат
        </button>
      </form>
    </div>
  );
}
