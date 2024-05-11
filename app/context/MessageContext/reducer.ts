import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { IMessageContext } from ".";

export function reducer(
  state: IMessageContext,
  { type, payload }: { type: string; payload?: any }
) {
  switch (type) {
    case "saveMessages":
      const { data } = payload;

      return {
        messages: data.map(
          ({ id, attributes }: { id: number; attributes: any }) => ({
            id,
            ...attributes,
          })
        ),
        loading: LOADING_STATUS.fulfilled,
      };

    case "startLoading":
      return { ...state, loading: LOADING_STATUS.pending };

    default:
      break;
  }

  return state;
}
