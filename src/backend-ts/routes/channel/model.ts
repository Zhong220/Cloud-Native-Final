// from repository to service
export interface DataModel {
  mail: string;
}

// between service and controller/repository
export interface DtoModel {
  mail: string;
  hashPassword: string;
}

// from service to controller
export interface ViewModel {
  jwtToken: string;
}

// for socket.io
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
