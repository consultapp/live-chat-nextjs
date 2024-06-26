"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { SocketContext } from ".";
type Props = { children: React.ReactElement };

export default function SocketProvider({ children }: Props) {
  const [isConnected, setIsConnected] = useState(false);
  //   const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      socket.on("ping", () => {
        console.log("got PING");
        socket.emit("ping-response");
      });
      //   setTransport(socket.io.engine.transport.name);

      //   socket.io.engine.on("upgrade", (transport) => {
      //     setTransport(transport.name);
      //   });

      //   socket.on("add-message", ({ msg, slug }) => {
      //     console.log(socket);
      //     console.log("add msg", { msg, slug });
      //     setMessages((prev) => [...prev, msg]);
      //   });
    }

    function onDisconnect() {
      setIsConnected(false);
      //   setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
