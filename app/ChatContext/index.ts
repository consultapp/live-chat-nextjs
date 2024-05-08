import { createContext } from "react";

interface IInitialChatContext {
  chatId: number;
  setChatId?: React.Dispatch<React.SetStateAction<number>>;
}

export const initialChatContext: IInitialChatContext = {
  chatId: 0,
  setChatId: () => {},
};

export const ChatContext = createContext(initialChatContext);
