import { IChatsStrapi } from "../types";

export async function getChats(): Promise<IChatsStrapi> {
  return (await fetch(`/api/chats/`)).json();
}
