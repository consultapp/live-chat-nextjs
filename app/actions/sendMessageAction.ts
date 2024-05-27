"use server";

import { cleanMessage } from "@/functions/cleanMessage";
import { cleanUserType } from "@/functions/cleanUserType";
import { clearSlug } from "@/functions/clearSlug";
import { ISendMessages, IMessageStrapi, IStrapiResponse, TOne } from "@/types";

export async function sendMessageAction(
  data: FormData
): Promise<ISendMessages> {
  const slug = clearSlug(data.get("slug"));
  const text = cleanMessage((data.get("text") ?? "") as string);
  const userType = cleanUserType(data.get("userType" ?? "") as string);

  if (!slug) return { error: "No such chat." };
  if (!text) return { error: "Пустое сообщение." };

  const res = await fetch(process.env.STRAPI_SERVER + "/api/messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { chatSlug: slug, text, userType } }),
  });

  if (res.status !== 200) {
    return { error: "Send Message Error:" + res.statusText };
  }

  const result: IStrapiResponse<TOne<IMessageStrapi>> = await res.json();

  if (result && result.data) {
    const { id, attributes } = result.data;
    return {
      messages: [
        {
          ...attributes,
          id: id,
        },
      ],
    };
  } else return { error: "Send Message Data Error" };
}
