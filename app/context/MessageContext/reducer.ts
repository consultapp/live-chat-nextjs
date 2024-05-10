export function reducer(
  state: any,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case "1":
      return payload;
      break;

    default:
      break;
  }

  return state;
}
