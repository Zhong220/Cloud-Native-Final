import { DataModel, DtoModel, ViewModel } from "./model.ts";
import loginRepository from "./repository.ts";

type loginError = {msg:string, data:string, error:};
export default function loginService(model: DtoModel): ViewModel {
  const result: DataModel = loginRepository(model);
  
  return { jwtToken: getJWTToken(result.mail) };
}

const getJWTToken = (sort: string): string => { //要幹嘛
  return sort;
};
