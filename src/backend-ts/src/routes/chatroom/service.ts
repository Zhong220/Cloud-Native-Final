import { DataModel, DtoModel, ViewModel } from "./model.js";
import loginRepository from "./repository.js";

export default function loginService(model: DtoModel): ViewModel {
  const result: DataModel = loginRepository(model);
  return { jwtToken: getJWTToken(result.mail) };
}

const getJWTToken = (sort: string): string => {
  return "sjlafjlaf";
};
