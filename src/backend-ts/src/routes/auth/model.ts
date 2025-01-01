// from repository to service
export type DataModel = {
  mail: string;
};

// between service and controller/repository
export type DtoModel = {
  mail: string;
  hashPassword: string;
};

// from service to controller
export type ViewModel = {
  jwtToken: string;
};

export type registerModel = {
  name: string;
  mail: string;
  hashPassword: string;
};

export type searchResult = {
  success: boolean;
  mail: string;
};

export type payLoad = {
  userID: number;
  username: string;
  userMail: string;
  currentTime: number;
};

type payTransaction = {
  from: number;
  to: number;
  amount: number;
};

export type registerTokenRedisModle = {
  token: string;
  mail: string;
  name: string;
  hashPassword: string;
};
