import { getChatsAction } from "@/actions/getChatsAction";
// import { type NextRequest } from "next/server";

export async function GET() {
  const data = await getChatsAction();

  return Response.json(data);
}
