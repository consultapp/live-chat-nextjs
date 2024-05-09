"use server";

export async function startNewChat(previousState: number, formData: FormData) {
  console.log("startNewChat", formData);

  return previousState + 1;
}

export async function checkGoogleCaptcha() {
  const secret_key = "6Le7INYpAAAAACvIIA4Mu1l39A2F2kduh77PyU26";
}
