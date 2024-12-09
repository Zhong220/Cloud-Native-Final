import Redis from "ioredis";
import { UserRoomMapModel, RoomMessage } from "./model";

const redisClient = new Redis("redis");

export async function joinRoomService(
  data: UserRoomMapModel
): Promise<RoomMessage[]> {
  const { room, userName } = data;
  let result: RoomMessage[] = [];

  try {
    // Check if the room exists in Redis
    const exists = await redisClient.exists(`room:${room}`);
    if (exists) {
      console.log(`A user: ${userName} joined room: ${room}`);

      // Add a welcome message to the room
      await redisClient.rpush(
        `room:${room}`,
        JSON.stringify({
          userName: "system",
          message: `Welcome ${userName} join ${room}`,
          timeStamp: new Date().toISOString(),
        })
      );

      // Get all elements in the room list (last 100 messages)
      const roomMessageAmount = await redisClient.llen(`room:${room}`);
      const start = Math.max(0, roomMessageAmount - 100);
      const elements = await redisClient.lrange(`room:${room}`, start, -1);
      result = elements.map((element) => JSON.parse(element));

      console.log("Retrieved messages:", result);
    } else {
      console.log(`Room ${room} does not exist. Creating it.`);

      // Create the room and add a welcome message
      await redisClient.rpush(
        `room:${room}`,
        JSON.stringify({
          userName: "system",
          message: `Welcome ${userName} join ${room}`,
          timeStamp: new Date().toISOString(),
        })
      );

      // Retrieve the initial message
      const elements = await redisClient.lrange(`room:${room}`, 0, -1);
      result = elements.map((element) => JSON.parse(element));
    }

    // Record user in room and update profile
    await redisClient.rpush(`room:${room}:members`, `${userName}`);
    await redisClient.hset(`room:${room}:members:${userName}`, {
      userName,
      load: 0,
    });
  } catch (err) {
    console.error("Error in joinRoomService:", err);
  }

  return result;
}

export function chatMessageService(data: RoomMessage, room: string) {
  // "room:${room}":"[{"sender":"Alice","message":"Hello","timestamp":"2021-12-01T00:00:00.000Z"}]"
  redisClient.rpush(
    `room:${room}`,
    JSON.stringify({
      sender: data.sender,
      message: data.message,
      timestamp: data.timestamp,
    }),
    (err) => {
      if (err) {
        console.error("Error adding message to room list in Redis:", err);
      }
    }
  );
}

export function partialMessageService(data: UserRoomMapModel): RoomMessage[] {
  const { room, userName } = data;
  let result: RoomMessage[] = [];

  // get last time load and amount of message in room
  // and decide how many to load
  const userLoad = Number(
    JSON.stringify(redisClient.hget(`room:${room}:members:${userName}`, "load"))
  );
  const roomMessageAmount = Number(redisClient.llen(`room:${room}`));
  const toLoad =
    roomMessageAmount >= userLoad + 100 ? userLoad + 100 : roomMessageAmount;

  // Get specific amount message in the room list and send back to frontend
  redisClient.lrange(`room:${room}`, 0, toLoad, (err, elements) => {
    if (err) {
      console.error("Error getting elements from room list:", err);
      return;
    }
    result = JSON.parse(`[${elements}]`);
    // socket.emit("historyMessage", JSON.parse(`[${elements}]`));
  });

  // update load
  redisClient.hset(`room:${room}:members:${userName}`, { load: toLoad });

  return result;
}
