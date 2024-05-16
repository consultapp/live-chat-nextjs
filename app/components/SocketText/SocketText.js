"use client";

import { useEffect, useId, useRef, useState } from "react";
import { socket } from "@/socket";

export default function SocketText() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState([]);
  const input = useRef(null);
  const slug = useId();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      socket.on("add-message", ({ msg, slug }) => {
        console.log(socket);
        console.log("add msg", { msg, slug });
        setMessages((prev) => [...prev, msg]);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <form>
        <input name="text" ref={input} />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("input.current.value", input.current.value);
            socket.emit("new-message", { msg: input.current.value, slug });
            input.current.value = "";
          }}
        >
          Send
        </button>
      </form>
      <div>
        {messages.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}
