"use server";

export async function startNewChat(previousState: number, formData: FormData) {
  console.log("startNewChat", formData);

  return previousState + 1;
}
