export function cleanDate(d: string) {
  const reg = /[^a-zA-Z0-9\-_.: ]/g;
  return d.replaceAll(reg, "");
}
