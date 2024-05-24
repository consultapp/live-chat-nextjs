"use server";

import { cleanMessage } from "@/functions/cleanMessage";
import { cleanUserType } from "@/functions/cleanUserType";
import clearSlug from "@/functions/clearSlug";
import { IAddMessages, IMessageStrapi, IStrapiResponse, TOne } from "@/types";

export async function addMessageAction(data: FormData): Promise<IAddMessages> {
  const slug = clearSlug(data.get("slug"));
  const text = cleanMessage((data.get("text") ?? "") as string);
  const userType = cleanUserType(data.get("userType" ?? "") as string);

  if (!slug) return { slug, error: "No such chat." };

  const res = await fetch(process.env.STRAPI_SERVER + "/api/messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { slug, text, userType } }),
  });

  if (res.status !== 200) {
    console.log("addMessageAction:", res);
    return { slug, error: "Add Message:" + res.statusText };
  }

  const result: IStrapiResponse<TOne<IMessageStrapi>> = await res.json();

  if (result && result.data) {
    const { id, attributes } = result.data;
    return {
      slug,
      messages: [
        {
          ...attributes,
          id: id,
        },
      ],
    };
  } else return { slug, error: "Add Message Error" };
}
