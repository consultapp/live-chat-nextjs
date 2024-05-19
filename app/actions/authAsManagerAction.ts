"use server";

export async function authAsManagerAction() {
  const res = await fetch(process.env.STRAPI_SERVER + "/api/auth/local/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: process.env.MANAGER_EMAIL,
      password: process.env.MANAGER_PASSWORD,
    }),
  });

  if (res.status !== 200) {
    console.log("authAsManagerAction res:", res);
    return { error: "Auth Err:" + res.statusText };
  }

  const data = await res.json();

  if (data && data.jwt) {
    return { token: data.jwt };
  } else return { error: "Auth Error" };
}
