"use client";

import { authAction } from "@/actions/authAction";
import { useIsConnected } from "@/context/SocketProvider";
import { UserContext } from "@/context/UserContext";
import USER_TYPE from "@/fixtures/USER_TYPE";
import { socket } from "@/socket";
import React, { useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";

type Props = {};

export default function LoginForm({}: Props) {
  const [state, formAction, isPending] = useFormState(authAction, {
    token: "",
  });
  const isConnected = useIsConnected();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) {
      setUser({ userType: USER_TYPE.manager, token: state.token });
    }
  }, [state, setUser]);

  useEffect(() => {
    if (state && state.token && isConnected) {
      socket.emit("set-manager");
    }
  }, [state, isConnected]);

  return (
    <section className="flex flex-row bg-gray-800 min-h-screen justify-center items-center">
      <form
        action={formAction}
        className="flex flex-col gap-4 bg-blue-50 rounded-xl py-6 px-12 w-400"
      >
        {isPending ? (
          "Loading"
        ) : (
          <>
            <label htmlFor="" className=" text-xl self-center">
              Авторизация
            </label>
            <input
              type="text"
              placeholder="E-mail"
              className="p-1 rounded"
              name="email"
              value={
                process.env.NODE_ENV !== "production"
                  ? (process.env.MANAGER_EMAIL as string)
                  : ""
              }
            />
            <input
              type="password"
              placeholder="Пароль"
              className="p-1 rounded"
              name="password"
              value={
                process.env.NODE_ENV !== "production"
                  ? (process.env.MANAGER_PASSWORD as string)
                  : ""
              }
            />
            {state.error && (
              <label className=" text-red-500">{state.error}</label>
            )}
            <button className="btn">Войти</button>
          </>
        )}
      </form>
    </section>
  );
}
