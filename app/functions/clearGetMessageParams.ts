import { NextRequest } from "next/server";

export function clearGetMessageParams(request: NextRequest) {
  const reg = /[^a-zA-Z0-9\-_.: ]/g;
  const searchParams = request.nextUrl.searchParams;
  const date = (searchParams.get("date") ?? "").replaceAll(reg, "");

  const regSlug = /[^a-zA-Z0-9\-]/g;
  const chatSlug = (searchParams.get("chatSlug") ?? "").replaceAll(regSlug, "");

  return { chatSlug, date };
}
