export type RoomMessage = {
  sender: string;
  message: string;
  timestamp: string;
};

export type UserRoomMapModel = {
  room: string;
  userName: string;
};

export interface ServerToClientEvents {
  currentMessage: (data: RoomMessage) => void;
  historyMessage: (data: RoomMessage[]) => void;
  partialMessage: (data: RoomMessage[]) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: UserRoomMapModel) => void;
  chatMessage: (
    data: UserRoomMapModel & {
      message: string;
    }
  ) => void;
  getPartialMessage: (data: UserRoomMapModel) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userID?: string;
}
