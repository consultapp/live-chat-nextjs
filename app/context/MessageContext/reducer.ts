import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { IMessageContext } from ".";

export function reducer(
  state: IMessageContext,
  { type, payload }: { type: string; payload?: any }
): IMessageContext {
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
        chatSlug: payload.chatSlug,
      };

    case "addMessages": {
      if (
        state?.messages?.at(-1)?.id !== payload?.at(-1)?.id &&
        payload.chatSlug === state.chatSlug
      ) {
        return {
          ...state,
          messages: [...state.messages, ...payload.messages],
          loading: LOADING_STATUS.fulfilled,
        };
      }
      return {
        ...state,
        loading: LOADING_STATUS.fulfilled,
      };
    }

    case "startLoading":
      return { ...state, loading: LOADING_STATUS.pending };

    case "setChatSlug": {
      return {
        ...state,
        chatSlug: payload,
        messages: [],
        loading: LOADING_STATUS.idle,
      };
    }

    default:
      break;
  }

  return state;
}
