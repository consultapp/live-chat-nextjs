"use server";

import { cleanChatSlug } from "@/functions/cleanChatSlug";
import { IMessageStrapi, IStrapiResponse, TArray } from "@/types";

export async function getMessagesAction(
  chatSlug: string
): Promise<IStrapiResponse<TArray<IMessageStrapi>>> {
  const res = await fetch(
    `${
      process.env.STRAPI_SERVER
    }/api/messages/?filters[chatSlug][$eq]=${cleanChatSlug(chatSlug)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
}
