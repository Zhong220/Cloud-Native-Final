export type RoomMessage = {
  sender: string;
  message: string;
  timestamp: string;
};

export type UserRoomModel = {
  room: string;
  userId: string;
  userName: string;
};

export interface ServerToClientEvents {
  currentMessage: (data: RoomMessage) => void;
  partialMessage: (data: RoomMessage[]) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: UserRoomModel) => void;
  chatMessage: (data: UserRoomModel & { message: string }) => void;
  getPartialMessage: (data: { room: string; lastLoad: number }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userID?: string;
}

export type StoreMessageDto = RoomMessage & {
  roomId: string;
};

export type StoreMessageDataModel = {
  uid: string;
  cid: string;
  message: string;
  timestamp: string;
};

export type CreateRoomModel = {
  name: string;
  description: string;
};
