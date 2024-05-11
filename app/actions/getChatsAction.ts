"use server";

import { authAsManager } from "./authAsManager";

export async function getChatsAction(token: string = "") {
  const res1 = await authAsManager();
  const data1 = await JSON.parse(res1);
  console.log("data1", data1);

  // if (token) {
  const res = await fetch(process.env.STRAPI_SERVER + "/api/chats/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data1.token ? data1.token : token}`,
    },
  });
  const data = await res.json();

  return data;
  // } else {
  //   return { error: "bad user" };
  // }
}
