"use server";
import { randomUUID } from "crypto";
import { authAsManagerAction } from "./authAsManagerAction";
import { IChat, IChatStrapi, IStrapiResponse } from "../types";

export async function startNewChat(previousState: IChat, formData: FormData) {
  const data = await authAsManagerAction();

  if (data && data.token) {
    const reg = /[^a-zA-ZА-Яа-я0-9 ]/g;
    const name = ((formData.get("name") ?? "") as String).replaceAll(reg, "");
    if (name.length < 3 || name.length > 30) {
      return { error: "Bad name" };
    }

    const res1 = await fetch(process.env.STRAPI_SERVER + "/api/chats/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        data: {
          slug: randomUUID(),
          userName: name,
        },
      }),
    });

    const data1: { data: { attributes: IChatStrapi } } = await res1.json();

    if (data1 && data1.data) {
      return { chatSlug: data1.data.attributes.slug };
    } else {
      return { error: "New Chat init error" };
    }
  } else {
    return { error: "New Chat init error. Auth." };
  }
}
