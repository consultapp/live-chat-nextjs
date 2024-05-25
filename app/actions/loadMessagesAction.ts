"use server";

import { clearSlug } from "@/functions/clearSlug";
import { IAddMessages, IMessageStrapi, IStrapiResponse, TArray } from "@/types";

export async function loadMessagesAction(slug: string): Promise<IAddMessages> {
  const res = await fetch(
    `${
      process.env.STRAPI_SERVER
    }/api/messages/?filters[chatSlug][$eq]=${clearSlug(slug)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) {
    console.log("loadMessagesAction:", res);
    return {
      error: res.statusText,
    };
  }

  const { data, error }: IStrapiResponse<TArray<IMessageStrapi>> =
    await res.json();
  if (error) {
    return { error: error.message };
  }

  return {
    messages: (data || []).map(
      ({ id, attributes }: { id: number; attributes: any }) => ({
        id,
        ...attributes,
      })
    ),
  };
}
