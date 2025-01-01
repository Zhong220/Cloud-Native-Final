export type RoomMessage = {
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
  currentMessage: (data: RoomMessage) => void;
  partialMessage: (data: RoomMessage[]) => void;
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

export type StoreMessageDto = RoomMessage & {
  roomId: string;
};

export type StoreMessageDataModel = {
  uid: string;
  cid: string;
  message: string;
  timestamp: string;
};
