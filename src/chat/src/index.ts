import express from "express";
import http from "node:http";
import path from "node:path";
import Redis from "ioredis";
import { fileURLToPath } from "node:url";
import { Server as SocketIOServer } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types/socketTypes";

const app = express();
const PORT = 8080;
const redisClient = new Redis("redis");
const server = http.createServer(app);
const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server);

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle 'joinRoom' event
  socket.on("joinRoom", (data) => {
    const { room, userName } = data;

    // Check if the room exists in Redis
    redisClient.exists(`room:${room}`, (err, exists) => {
      if (err) {
        console.error("Error checking room existence:", err);
        return;
      }

      if (exists === 1) {
        // Room list exists, join the room
        socket.join(room);
        console.log(`A user: ${userName} joined room: ${room}`);

        // Get all elements in the room list and send back to frontend
        redisClient.lrange(`room:${room}`, 1, -1, (err, elements) => {
          if (err) {
            console.error("Error getting elements from room list:", err);
            return;
          }
          // const messages = elements.map((element) => JSON.parse(element));
          socket.emit("historyMessage", JSON.parse(`[${elements}]`));
            // messages);
        });
      } else {
        // Room list does not exist, create the room list in Redis and join
        redisClient.rpush(`room:${room}`, JSON.stringify([]), (err) => {
          if (err) {
            console.error("Error creating room list in Redis:", err);
            return;
          }
          socket.join(room);
          console.log(
            `Room list room: ${room} created and user:${userName} joined.`
          );
          socket.emit("historyMessage", []);
        });
      }
    });
  });

  // Handle 'chatMessage' event
  socket.on("chatMessage", ({ userName, room, message }) => {
    const sender = userName || "Anonymous";
    const curr = new Date().toISOString();
    io.to(room).emit("currentMessage", {
      sender,
      message,
      timestamp: curr,
    });

    // Add the message to the room list in Redis
    // "room:${room}":"[{"sender":"Alice","message":"Hello","timestamp":"2021-12-01T00:00:00.000Z"}]"
    redisClient.rpush(
      `room:${room}`,
      JSON.stringify({ sender, message, timestamp: curr }),
      (err) => {
        if (err) {
          console.error("Error adding message to room list in Redis:", err);
        }
      }
    );
  });

  // Handle 'disconnect' event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
