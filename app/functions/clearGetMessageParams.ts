import { NextRequest } from "next/server";

export function clearGetMessageParams(request: NextRequest) {
  const reg = /[^a-zA-Z0-9\-_.: ]/g;
  const searchParams = request.nextUrl.searchParams;
  const chatSlug = (searchParams.get("chatSlug") ?? "").replaceAll(reg, "");
  const date = (searchParams.get("date") ?? "").replaceAll(reg, "");

  return { chatSlug, date };
}
