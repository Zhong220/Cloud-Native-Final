import { DataModel, DtoModel, ViewModel } from "./model.ts";
import loginRepository from "./repository.ts";

import pool from "../../utils/mysql.ts";
import process from "node:process";

// type loginError = {msg:string, data:string, error:};
export default function loginService(model: DtoModel): ViewModel {
  const result: DataModel = loginRepository(model);
  const mysql = mysqlConnection();

  return { jwtToken: getJWTToken(result.mail) };
}

async function mysqlConnection() {
  try {
    const mysql = await pool.getConnection();
    return mysql;
  } catch (err) {
    console.error("mysqlConnection fail:\n", err);
  }
}

const getJWTToken = (sort: string): string => { //要幹嘛
  return sort;
};

