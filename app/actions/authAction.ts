"use server";

export interface IAuthState {
  token: string;
  error?: string;
}

export async function authAction(
  previousState: IAuthState,
  formData: FormData
) {
  const reg = /[^a-zA-ZА-Яа-я0-9.,!\-@ ]/g;
  const email = formData.get("email")?.toString().replaceAll(reg, "");
  const password = formData.get("password")?.toString().replaceAll(reg, "");

  const res = await fetch(process.env.STRAPI_SERVER + "/api/auth/local/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  });

  if (res.status !== 200) {
    return { error: "Auth Err:" + res.statusText, token: "" };
  }

  const data = await res.json();

  if (data && data.jwt) {
    return { token: data.jwt };
  } else
    return {
      token: "",
      error: "Auth Error: " + data?.error?.message,
    };
}
