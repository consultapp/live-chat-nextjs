import { createContext } from "react";

interface IInitialChatContext {
  chatSlug: string;
  setChatSlug?: React.Dispatch<React.SetStateAction<number>>;
}

export const initialChatContext: IInitialChatContext = {
  chatSlug: "",
  setChatSlug: () => {},
};

export const ChatContext = createContext(initialChatContext);
