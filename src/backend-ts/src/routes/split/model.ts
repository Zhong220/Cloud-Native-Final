import exp from "node:constants";

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

export type Record = {
  payer: number;
  attendees_ids: string;
  price: number;
};

export type AccountingRecord = {
  acid: number;
  title: string | null;
  super_cid: number;
  payer: number;
  attendees_ids: string;
  price: number;
  issplited: boolean;
};