import { getMessages } from "@/actions/getMessages";
import { clearGetMessageParams } from "@/functions/clearGetMessageParams";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { chatSlug, date } = clearGetMessageParams(request);

  const getParams = `filters[chatSlug][$eq]=${chatSlug}&filters[createdAt][$gt]=${date}`;
  const data = await getMessages(getParams);
  console.log("data", data);

  return Response.json(data);
}
