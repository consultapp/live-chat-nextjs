"use server";

import { authAsManager } from "./authAsManager";

export async function getChatsAction(token: string = "") {
  const data1 = await authAsManager();

  // if (token) {
  const res = await fetch(
    process.env.STRAPI_SERVER + "/api/chats/?sort=updatedAt:desc",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data1.token ? data1.token : token}`,
      },
    }
  );
  const data = await res.json();

  return data;
  // } else {
  //   return { error: "bad user" };
  // }
}
