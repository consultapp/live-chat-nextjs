export function cleanUserType(data: string) {
  const reg = /[^a-zA-Z]/g;
  return data.replaceAll(reg, "");
}
