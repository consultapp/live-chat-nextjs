"use server";

import { clearSlug } from "@/functions/clearSlug";
import { IMessageStrapi, IStrapiResponse, TArray } from "@/types";

export async function getMessagesAction(
  slug: string
): Promise<IStrapiResponse<TArray<IMessageStrapi>>> {
  const res = await fetch(
    `${process.env.STRAPI_SERVER}/api/messages/?filters[slug][$eq]=${clearSlug(
      slug
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) {
    console.log("getMessagesAction:", res);
    return {
      error: {
        status: res.status,
        name: "Error",
        message: res.statusText,
        details: {},
      },
      data: null,
    };
  }

  return await res.json();
}
