"use client";
import React, { ReactElement, useContext, useEffect } from "react";
import ChatField from "../ChatField.tsx/ChatField";
import ChatNewForm from "../ChatNewForm/ChatNewForm";
import { ChatContext } from "@/context/ChatContext";
import USER_TYPE from "@/fixtures/USER_TYPE";
import {
  MessageContext,
  MessageContextDispatch,
} from "@/context/MessageContext";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { loadMessages } from "@/functions/loadMessages";
import { UserContext } from "@/context/UserContext";

type Props = {};

export default function Chat({}: Props) {
  const { chatSlug, setChatSlug } = useContext(ChatContext);

  const dispatch = useContext(MessageContextDispatch);
  const { messages, loading } = useContext(MessageContext);
  const { user } = useContext(UserContext);

  console.log("Chat: messages, loading ", messages, loading);

  useEffect(() => {
    const slug = window.localStorage.getItem("chatSlug") || "";
    if (setChatSlug) setChatSlug(slug);

    if (!messages.length && slug) {
      dispatch({ type: "startLoading" });
      loadMessages(slug).then((data) => {
        dispatch({ type: "saveMessages", payload: data });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    loading === LOADING_STATUS.pending ||
    (loading === LOADING_STATUS.idle && chatSlug)
  )
    return (
      <Container>
        <div>Loading</div>
      </Container>
    );

  return (
    <Container>
      {chatSlug ? (
        <ChatField />
      ) : (
        user.userType === USER_TYPE.user && <ChatNewForm />
      )}
    </Container>
  );
}

function Container({ children }: { children: ReactElement | boolean }) {
  const { user } = useContext(UserContext);

  return (
    <main
      className={`flex bg-gray-800 h-screen p-3 ${
        user.userType === USER_TYPE.user
          ? "w-500  border-gray-500"
          : "max-w-half1 w-full "
      }`}
    >
      <div
        className={`flex flex-col p-2 flex-grow gap-2 px-2 bg-blue-50 rounded-xl w-full`}
      >
        {children}
      </div>
    </main>
  );
}
