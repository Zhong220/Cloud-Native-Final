export type RoomMessageModel = {
  senderId: string;
  message: string;
  timestamp: string;
};

export type UserRoomModel = {
  userId: string;
  roomId: string;
};

export type JoinRooomModel = UserRoomModel & {
  userName: string;
  roomName: string;
};

export interface ServerToClientEvents {
  currentMessage: (data: RoomMessageModel) => void;
  partialMessage: (data: RoomMessageModel[]) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: JoinRooomModel) => void;
  chatMessage: (data: UserRoomModel & { message: string }) => void;
  getPartialMessage: (data: { roomId: string; lastLoad: number }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userID?: string;
}

export type StoreMessageDto = RoomMessageModel & {
  roomId: string;
};

export type StoreMessageDataModel = {
  uid: string;
  cid: string;
  message: string;
  timestamp: string;
};
