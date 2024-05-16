export function cleanChatSlug(slug: string) {
  const reg = /[^a-zA-Z0-9\-_.: ]/g;
  return slug.replaceAll(reg, "");
}
