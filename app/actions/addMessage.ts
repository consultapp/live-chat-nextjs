"use server";

import { cleanChatSlug } from "@/functions/cleanChatSlug";
import { cleanMessage } from "@/functions/cleanMessage";
import { cleanUserType } from "@/functions/cleanUserType";
import { IMessage } from "@/types";

export async function addMessage(data: FormData): Promise<{
  messages?: IMessage[];
  error?: string;
}> {
  const chatSlug = cleanChatSlug((data.get("chatSlug") ?? "") as string);
  const text = cleanMessage((data.get("text") ?? "") as string);
  const userType = cleanUserType(data.get("userType" ?? "") as string);

  if (!chatSlug) return { error: "No such chat." };

  const res = await fetch(process.env.STRAPI_SERVER + "/api/messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { chatSlug, text, userType } }),
  });

  const result: { data: { id: number; attributes: any } } = await res.json();

  if (result && result?.data) {
    const { id, attributes } = result?.data;
    return {
      messages: [
        {
          id,
          ...attributes,
        } as IMessage,
      ],
    };
  } else return { error: "Auth Error" };
}
