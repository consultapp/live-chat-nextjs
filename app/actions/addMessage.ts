"use server";

import USER_TYPE from "@/fixtures/USER_TYPE";

export async function addMessage(previousState: any, formData: FormData) {
  const reg = /[^a-zA-ZА-Яа-я0-9.,!\- ]/g;
  const text = ((formData.get("text") ?? "") as string).replaceAll(reg, "");
  const chatSlug = ((formData.get("chatSlug") ?? "") as string).replaceAll(
    reg,
    ""
  );
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
  console.log("addMessage data", data);

  if (data) {
    return JSON.stringify({});
  } else return JSON.stringify({ error: "Auth Error" });
}
