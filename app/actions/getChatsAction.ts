"use server";

import { IChatStrapi, IStrapiResponse, TArray } from "@/types";
import { authAsManagerAction } from "./authAsManagerAction";

export async function getChatsAction(
  token: string = ""
): Promise<IStrapiResponse<TArray<IChatStrapi>>> {
  const data1 = await authAsManagerAction();

  const res = await fetch(
    process.env.STRAPI_SERVER + "/api/chats/?sort=updatedAt:desc",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data1.token ? data1.token : token}`,
      },
    }
  );

  if (res.status !== 200) {
    console.log("getChatsAction:", res);
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
