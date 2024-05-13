"use server";

import USER_TYPE from "@/fixtures/USER_TYPE";

export interface IAddMessageState {
  data?: any;
  error?: string;
}

export async function addMessage(
  previousState: IAddMessageState,
  formData: FormData
) {
  const reg = /[^a-zA-ZА-Яа-я0-9.,!\- ]/g;
  const text = ((formData.get("text") ?? "") as string).replaceAll(reg, "");
  const chatSlug = ((formData.get("chatSlug") ?? "") as string).replaceAll(
    reg,
    ""
  );

  if (!chatSlug) {
    return { error: "No such chat." };
  }

  const userType =
    ((formData.get("userType") ?? "") as string).replaceAll(reg, "") ||
    USER_TYPE.user;

  const res = await fetch(process.env.STRAPI_SERVER + "/api/messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        text,
        chatSlug,
        userType,
      },
    }),
  });

  const data = await res.json();

  if (data) {
    return data;
  } else return { error: "Auth Error" };
}
