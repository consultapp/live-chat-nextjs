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

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("new Connection", socket);
    socket.on("new-message", (data) => {
      const { msg, slug, isAdmin = false } = data;
      if (!socket.slug) socket.slug = slug;
      socket.lastMsg = data;

      console.log("adminSockets", Object.keys(adminSockets));
      console.log("userSockets", Object.keys(userSockets));

      console.log("NEW MSG Data", data);
      socket.emit("add-message", { msg, slug });
      if (isAdmin) {
        clientSockets.forEach(({ k, v }) => {
          console.log("k,v", k, v);
        });
      } else {
        clientSockets;
      }

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
