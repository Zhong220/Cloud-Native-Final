import express from "express";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./model";
import {
  chatMessageService,
  joinRoomService,
  partialMessageService,
} from "./service";

const app = express();
const PORT = 8080;
const server = http.createServer(app);
const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
      origin: PORT, // Allow your frontend origin
      methods: ["GET", "POST"], // Specify allowed methods
      credentials: true, // Allow credentials if needed
  },
});


// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:8081", // Replace with your frontend origin
    methods: ["GET", "POST"], // Allowed HTTP methods
    credentials: true, // Enable this if cookies or auth headers are needed
  })
);

app.use(express.static(path.join(__dirname, "../public")));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle 'joinRoom' event
  socket.on("joinRoom", async (data) => {
    const elements = await joinRoomService(data);
    const systemWelcomeMessage = {
      sender: "system",
      message: `Welcome ${data.userName} join ${data.room}`,
      timestamp: new Date().toISOString(),
    };
    socket.join(data.room);
    socket.emit("partialMessage", elements);
    socket.emit("currentMessage", systemWelcomeMessage);
    socket.to(data.room).emit("currentMessage", systemWelcomeMessage);
  });

  // Handle 'chatMessage' event
  socket.on("chatMessage", (data) => {
    const curr = new Date().toISOString();
    io.to(data.room).emit("currentMessage", {
      sender: data.userName,
      message: data.message,
      timestamp: curr,
    });

    // Add the message to the room list in Redis
    chatMessageService(
      { sender: data.userName, message: data.message, timestamp: curr },
      data.room
    );
  });

  // Handle 'getPartialMessage' event
  socket.on("getPartialMessage", async (data) => {
    socket.emit("partialMessage", await partialMessageService(data));
  });

  // Handle 'disconnect' event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export default io;
