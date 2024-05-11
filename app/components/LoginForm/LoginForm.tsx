"use client";

import React from "react";

type Props = {};

export default function LoginForm({}: Props) {
  return (
    <section className="flex flex-row bg-gray-800 min-h-screen justify-center items-center">
      <form
        action=""
        className="flex flex-col gap-4 bg-gray-300 rounded py-6 px-12 w-400"
      >
        <label htmlFor="" className=" text-xl self-center">
          Авторизация
        </label>
        <input type="text" placeholder="E-mail" className="p-1 rounded" />
        <input type="password" placeholder="Пароль" className="p-1 rounded" />
        <button className="btn">Войти</button>
      </form>
    </section>
  );
}
