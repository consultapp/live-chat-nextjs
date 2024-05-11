export async function loadMessages(chatSlug: string) {
  return (await fetch(`/api/messages?chatSlug=${chatSlug}`)).json();
}
