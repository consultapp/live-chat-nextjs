import { createContext } from "react";

interface IInitialChatContext {
  chatSlug: string;
  setChatSlug?: React.Dispatch<React.SetStateAction<string>>;
}

export const initialChatContext: IInitialChatContext = {
  chatSlug: "",
  setChatSlug: () => {},
};

export const ChatContext = createContext(initialChatContext);
