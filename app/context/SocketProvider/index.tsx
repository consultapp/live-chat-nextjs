import { createContext, useContext } from "react";

interface IInitialSocketContext {
  isConnected: boolean;
}

export const initialSocketContext: IInitialSocketContext = {
  isConnected: false,
};

export const SocketContext = createContext(initialSocketContext);

export function useIsConnected() {
  return useContext(SocketContext).isConnected;
}
