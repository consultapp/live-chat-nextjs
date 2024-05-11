export async function getMessages(getParams: string) {
  const res = await fetch(
    `${process.env.STRAPI_SERVER}/api/messages/?${getParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return data;
}
