"use client";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import ChatNewForm from "../ChatNewForm/ChatNewForm";
import { ChatContext } from "@/context/ChatContext";
import USER_TYPE from "@/fixtures/USER_TYPE";

import { UserContext } from "@/context/UserContext";
import ChatSendMessageForm from "../ChatSendMessageForm/ChatSendMessageForm";
import ChatMessages from "../ChatMessages/ChatMessages";

type Props = {};

export default function Chat({}: Props) {
  const { chatSlug, setChatSlug } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  console.log("user", user);
  console.log("chatSlug", chatSlug);

  useLayoutEffect(() => {
    const r = /[^a-zA-Z0-9\-]/g;
    const slug = (window.localStorage.getItem("chatSlug") || "").replaceAll(
      r,
      ""
    );
    if (!chatSlug && setChatSlug && slug) setChatSlug(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {chatSlug ? (
          <>
            <ChatMessages />
            <ChatSendMessageForm />
          </>
        ) : (
          user.userType === USER_TYPE.user && <ChatNewForm />
        )}
      </div>
    </main>
  );
}
