export async function updateMessages(chatSlug: string, date: Date) {
  const res = await fetch(
    `/api/messagesUpdate?chatSlug=${chatSlug}&date=${date}`
  );
  return res.json();
}
