import {
  JoinRooomModel,
  RoomMessageModel,
  StoreMessageDataModel,
  StoreMessageDto,
  UserRoomModel,
} from "./model";
import { storeMessageRepository } from "./repository";
import redisClient from "./utils/redis";

export async function joinRoomService(
  data: JoinRooomModel
): Promise<RoomMessageModel[]> {
  console.log(data);
  const { roomId, roomName, userId, userName } = data;
  let result: RoomMessageModel[] = [];

  try {
    // Check if the room exists in Redis
    const isRoomExists = await redisClient.exists(`room:${roomId}`);
    if (isRoomExists) {
      console.log(`A user: ${userName} joined room: ${roomId}, ${roomName}`);

      // Get all elements in the room list (last 100 messages)
      const amount = await redisClient.llen(`room:${roomId}`);
      result = await partialMessageService({ roomId, lastLoad: amount });
    } else {
      console.log(`Room ${roomId}, ${roomName} does not exist. Creating it.`);

      // Create the room and add a welcome message
      await redisClient.rpush(
        `room:${roomId}`,
        JSON.stringify({
          senderId: "system",
          message: `Room ${roomId} created.`,
          timestamp: new Date().toISOString(),
        })
      );

      // Retrieve the initial message
      const elements = await redisClient.lrange(`room:${roomId}`, 0, -1);
      result = elements.map((element) => JSON.parse(element));
    }

    // Record users in rooms
    await redisClient.hset(`room:${roomId}:members`, userId, userName);
    await redisClient.hset(`user:${userId}:rooms`, roomId, roomName);
  } catch (err) {
    console.error("Error in joinRoomService:", err);
  }

  return result;
}

export async function chatMessageService(
  data: RoomMessageModel & { roomId: string }
) {
  // "room:${room}":"[{"senderId":"Alice","message":"Hello","timestamp":"2021-12-01T00:00:00.000Z"}]"
  try {
    await redisClient.rpush(
      `room:${data.roomId}`,
      JSON.stringify({
        senderId: data.senderId,
        message: data.message,
        timestamp: data.timestamp,
      })
    );
  } catch (err) {
    console.error("Error adding message to room list in Redis:", err);
  }
}

export async function partialMessageService(data: {
  roomId: string;
  lastLoad: number;
}): Promise<RoomMessageModel[]> {
  const { roomId, lastLoad } = data;
  const loadAmount = 20;
  let result: RoomMessageModel[] = [];

  try {
    // Get specific amount message in the room list
    const start = Math.max(0, lastLoad - loadAmount);
    const messages = await redisClient.lrange(`room:${roomId}`, start, -1);
    result = messages.map((element) => JSON.parse(element));
    console.log("Retrieved messages:", result);
  } catch (err) {
    console.error("Error in partialMessageService:", err);
  }

  return result;
}

async function storeMessageService(data: StoreMessageDto[]) {
  try {
    const toStore: StoreMessageDataModel[] = data.map((e) => {
      return {
        uid: e.senderId,
        cid: e.roomId,
        message: e.message,
        timestamp: e.timestamp,
      };
    });
    await storeMessageRepository(toStore);
  } catch (error) {
    console.error(error);
  }
}
