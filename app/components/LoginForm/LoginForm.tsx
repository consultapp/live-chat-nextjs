"use client";

import { authAction } from "@/actions/authAction";
import { UserContext } from "@/context/UserContext";
import USER_TYPE from "@/fixtures/USER_TYPE";
import React, { useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";

type Props = {};

export default function LoginForm({}: Props) {
  const [state, formAction, isPending] = useFormState(authAction, {
    token: "",
  });

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) {
      setUser({ userType: USER_TYPE.manager, token: state.token });
      console.log("first", state.token);
    }

    console.log("LoginForm: state", state);
  }, [state]);

  return (
    <section className="flex flex-row bg-gray-800 min-h-screen justify-center items-center">
      <form
        action={formAction}
        className="flex flex-col gap-4 bg-gray-300 rounded py-6 px-12 w-400"
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
            />
            <input
              type="password"
              placeholder="Пароль"
              className="p-1 rounded"
              name="password"
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
