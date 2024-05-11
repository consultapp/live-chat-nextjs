"use server";

import { authAsManager } from "./authAsManager";

export async function updateChatDate(token: string = "") {
  let finalToken = token;
  if (!finalToken) {
    const data = await authAsManager();
    if (data && data.token) {
      finalToken = data.token;
    } else {
      return JSON.stringify({ error: "Auth Error." });
    }
  }
}
