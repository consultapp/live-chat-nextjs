"use server";

import { cleanChatSlug } from "@/functions/cleanChatSlug";
import { cleanMessage } from "@/functions/cleanMessage";
import { cleanUserType } from "@/functions/cleanUserType";
import { IMessage, INewMessage } from "@/types";

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
    body: JSON.stringify({ data }),
  });

  const result: { id: number; attributes: any }[] = await res.json();
  console.log("action data", result);

  if (result && result.length) {
    return {
      messages: result.map(
        ({ id, attributes }) =>
          ({
            id,
            ...attributes,
          } as IMessage)
      ),
    };
  } else return { error: "Auth Error" };
}
