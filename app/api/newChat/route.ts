"use server";
import { authAsManager } from "@/actions/authAsManager";
import { randomUUID } from "crypto";

export async function POST() {
  const res = await authAsManager();

  const data = await JSON.parse(res);
  // console.log("api route data", data);

  if (data && data.token) {
    const res1 = await fetch(process.env.STRAPI_SERVER + "/api/chats/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        data: {
          slug: randomUUID(),
          userName: "User Name",
        },
      }),
    });
    const data1 = await res1.json();

    return Response.json(data1);
  } else {
    return Response.json(data);
  }
}
