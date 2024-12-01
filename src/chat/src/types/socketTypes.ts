type roomMessage = {
  sender: string;
  message: string;
  timestamp: string;
};

export interface ServerToClientEvents {
  currentMessage: (data: roomMessage) => void;
  historyMessage: (data: roomMessage[]) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: { room: string; userID: string }) => void;
  chatMessage: (data: { room: string; message: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userID?: string;
}
