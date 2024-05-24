export function clearSlug(d: string | FormDataEntryValue | null) {
  const reg = /[^a-zA-Z0-9\-_.: ]/g;
  return ((d || "") as string).replaceAll(reg, "");
}
