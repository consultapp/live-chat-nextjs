"use client";
import React, { useContext, useLayoutEffect } from "react";
import ChatNewForm from "../ChatNewForm/ChatNewForm";
import USER_TYPE from "@/fixtures/USER_TYPE";

import { UserContext } from "@/context/UserContext";
import ChatSendMessageForm from "../ChatSendMessageForm/ChatSendMessageForm";
import ChatMessages from "../ChatMessages/ChatMessages";
import { useSlug } from "@/store/dataSlice/hooks";

type Props = {};

export default function Chat({}: Props) {
  const slug = useSlug();
  const { user } = useContext(UserContext);

  return (
    <main
      className={`flex bg-gray-800 h-screen p-0 md:p-3 ${
        user.userType === USER_TYPE.user
          ? "w-full md:w-500  border-gray-500"
          : "max-w-half1 w-full "
      }`}
    >
      <div
        className={`flex flex-col md:p-2 md:px-2 py-2 flex-grow gap-2  bg-blue-50 md:rounded-xl w-full`}
      >
        {slug ? (
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
