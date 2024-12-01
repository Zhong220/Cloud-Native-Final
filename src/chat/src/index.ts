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
app.use(express.static(path.join("../public")));

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle 'joinRoom' event
  socket.on("joinRoom", (data) => {
    const { room, userID } = data;

    // Check if the room exists in Redis
    redisClient.exists(`room:${room}`, (err, exists) => {
      if (err) {
        console.error("Error checking room existence:", err);
        return;
      }

      if (exists === 1) {
        // Room list exists, join the room
        socket.join(room);
        console.log(`A user ${userID} joined room: ${room}`);

        // Get all elements in the room list and send back to frontend
        redisClient.lrange(`room:${room}`, 0, -1, (err, elements) => {
          if (err) {
            console.error("Error getting elements from room list:", err);
            return;
          }
          socket.emit("historyMessage", JSON.parse(`[${elements}]`));
        });
      } else {
        // Room list does not exist, create the room list in Redis and join
        redisClient.rpush(`room:${room}`, JSON.stringify([]), (err) => {
          if (err) {
            console.error("Error creating room list in Redis:", err);
            return;
          }
          socket.join(room);
          console.log(`Room list ${room} created and user joined.`);
          socket.emit("historyMessage", []);
        });
      }
    });
  });

  // Handle 'chatMessage' event
  socket.on("chatMessage", ({ room, message }) => {
    const sender = socket.data.userID || "Anonymous";
    const curr = new Date();
    io.to(room).emit("currentMessage", {
      sender,
      message,
      timestamp: curr.toISOString(),
    });

    // Add the message to the room list in Redis
    redisClient.lpush(
      `room:${room}`,
      JSON.stringify({ sender, message, curr }),
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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
