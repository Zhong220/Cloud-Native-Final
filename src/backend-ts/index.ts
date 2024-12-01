import express from "express";
import http from "node:http";
import routes from "./routes/index.ts";
import { Server as SocketIOServer } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./routes/channel/model.ts";

const app = express();
const port = 8000;

// for socket.io
const server = http.createServer(app);
const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server);

app.get("/", (req, res) => {
  res.status(200).send("CNS ts express backend is available.");
});

// assign url
routes.forEach((e) => {
  app.use(e.addr, e.router);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { io };
