import Redis from "ioredis";
import {
  RoomMessage,
  StoreMessageDataModel,
  StoreMessageDto,
  UserRoomModel,
} from "./model";
import { storeMessageRepository } from "./repository";

const redisClient = new Redis("redis");

export async function joinRoomService(
  data: UserRoomModel
): Promise<RoomMessage[]> {
  console.log(data);
  const { room, userId, userName } = data;
  let result: RoomMessage[] = [];

  try {
    // Check if the room exists in Redis
    const exists = await redisClient.exists(`room:${room}`);
    if (exists) {
      console.log(`A user: ${userName} joined room: ${room}`);

      // Get all elements in the room list (last 100 messages)
      const amount = await redisClient.llen(`room:${room}`);
      result = await partialMessageService({ room, lastLoad: amount });
    } else {
      console.log(`Room ${room} does not exist. Creating it.`);

      // Create the room and add a welcome message
      await redisClient.rpush(
        `room:${room}`,
        JSON.stringify({
          sender: "system",
          message: `Room ${room} created.`,
          timestamp: new Date().toISOString(),
        })
      );

      // Retrieve the initial message
      const elements = await redisClient.lrange(`room:${room}`, 0, -1);
      result = elements.map((element) => JSON.parse(element));
    }

    // Record user in room
    await redisClient.hset(`room:${room}:members`, userId, userName);
  } catch (err) {
    console.error("Error in joinRoomService:", err);
  }

  return result;
}

export async function chatMessageService(data: RoomMessage, room: string) {
  // "room:${room}":"[{"sender":"Alice","message":"Hello","timestamp":"2021-12-01T00:00:00.000Z"}]"
  try {
    // if amount in memory greater than 3000 or message exist in memory for too long
    // store into db

    await redisClient.rpush(
      `room:${room}`,
      JSON.stringify({
        sender: data.sender,
        message: data.message,
        timestamp: data.timestamp,
      })
    );
  } catch (err) {
    console.error("Error adding message to room list in Redis:", err);
  }
}

export async function partialMessageService(data: {
  room: string;
  lastLoad: number;
  end?: number;
}): Promise<RoomMessage[]> {
  const { room, lastLoad } = data;
  let result: RoomMessage[] = [];

  try {
    // Get specific amount message in the room list
    const start = Math.max(0, lastLoad - 100);
    const messages = await redisClient.lrange(
      `room:${room}`,
      start,
      data.end ? data.end : -1
    );
    result = messages.map((element) => JSON.parse(element));
    console.log("Retrieved messages:", result);
  } catch (err) {
    console.error("Error in partialMessageService:", err);
  }

  return result;
}

// function is

async function storeMessageService(data: StoreMessageDto[]) {
  try {
    const toStore: StoreMessageDataModel[] = data.map((e) => {
      return {
        uid: e.sender,
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

export function  generateChatroomID() {
  const length = 6 
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
  return result;

}
