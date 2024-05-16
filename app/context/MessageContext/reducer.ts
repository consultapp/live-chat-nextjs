import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { IMessageContext } from ".";

export function reducer(
  state: IMessageContext,
  { type, payload }: { type: string; payload?: any }
) {
  switch (type) {
    case "saveMessages":
      return {
        messages: payload.data.map(
          ({ id, attributes }: { id: number; attributes: any }) => ({
            id,
            ...attributes,
          })
        ),
        loading: LOADING_STATUS.fulfilled,
      };

    case "startLoading":
      return { ...state, loading: LOADING_STATUS.pending };

    case "addMessages":
      return {
        messages: [...state.messages, ...payload],
        loading: LOADING_STATUS.fulfilled,
      };

    default:
      break;
  }

  return state;
}
