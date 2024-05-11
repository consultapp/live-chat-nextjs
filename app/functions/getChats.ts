export async function getChats() {
  return (await fetch(`/api/chats/`)).json();
}
