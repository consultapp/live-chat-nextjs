"use server";

export async function authAsManager() {
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

  const data = await res.json();

  if (data && data.jwt) {
    return JSON.stringify({ token: data.jwt });
  } else return JSON.stringify({ error: "Auth Error" });
}
