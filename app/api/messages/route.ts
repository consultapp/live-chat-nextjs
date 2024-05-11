import { getMessagesAction } from "@/actions/getMessagesAction";
import { clearGetMessageParams } from "@/functions/clearGetMessageParams";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { chatSlug } = clearGetMessageParams(request);

  let getParams = `filters[chatSlug][$eq]=${chatSlug}`;
  const data = await getMessagesAction(getParams);

  return Response.json(data);
}
