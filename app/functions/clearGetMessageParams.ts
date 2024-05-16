import { NextRequest } from "next/server";
import { cleanChatSlug } from "./cleanChatSlug";
import { cleanDate } from "./cleanDate";

export function clearGetMessageParams(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = cleanDate(searchParams.get("date") ?? "");
  const chatSlug = cleanChatSlug(searchParams.get("chatSlug") ?? "");

  return { chatSlug, date };
}
