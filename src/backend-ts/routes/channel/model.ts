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
export interface ServerToClientEvents {
  chatMessage: (data: { message: string; sender: string }) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: { room: string; username: string }) => void;
  chatMessage: (data: { room: string; message: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username?: string;
}
