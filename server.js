import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { cleanChatSlug } from "./app/functions/cleanChatSlug/cleanChatSlug";
import { cleanMessage } from "./app/functions/cleanMessage";
import { cleanUserType } from "./app/functions/cleanUserType";
import { addMessage } from "./app/actions/addMessage";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const adminSockets = [];
const clientSockets = [];

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("new-message", async (data) => {
      const result = await addMessage(data);

      if (result && !result.error) {
        socket.emit("add-messages", result.messages ?? []);
      } else {
        socket.emit("error-add-messages", result.error ?? []);
      }

      console.log("adminSockets", Object.keys(adminSockets));
      console.log("userSockets", Object.keys(clientSockets));

      console.log("NEW MSG Data", { text, chatSlug, userType });

      // socket.broadcast.emit("add-message", "broadcast: " + msg);
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
