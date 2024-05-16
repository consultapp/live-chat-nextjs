export function cleanMessage(m: string) {
  const reg = /[^a-zA-ZА-Яа-я0-9.,!\- ]/g;
  return m.replaceAll(reg, "");
}
