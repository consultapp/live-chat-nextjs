import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const adminSockets = [];
const clientSockets = [];
const clientSocketsIds = [];

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("new-message", (data) => {
      console.log("adminSockets", adminSockets.length);
      console.log("clientSockets", clientSockets);
      console.log("clientSocketsIds", clientSocketsIds);
      if (clientSocketsIds.includes(socket.id)) {
        adminSockets.map((s) => s.emit("add-messages", data));
      } else {
        clientSockets[data.chatSlug].emit("add-messages", data);
      }
    });

    socket.on("set-manager", () => {
      if (!adminSockets.includes(socket)) {
        adminSockets.push(socket);
      }
    });

    socket.on("set-user", (chatSlug) => {
      if (!clientSocketsIds.includes(socket.id)) {
        clientSockets[chatSlug] = socket;
        clientSocketsIds.push(socket.id);
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
