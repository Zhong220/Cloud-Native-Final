import {
  DataModel,
  DtoModel,
  ViewModel,
  registerModel,
  searchResult,
  payLoad
} from "./model";
import { loginRepository, registerRepository } from "./repository";

import mysqlPool from "../../utils/mysql";

import SHA256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';
import jwt from "jsonwebtoken";
import process from "node:process";
import dotenv from "dotenv";
import { sha256 } from "js-sha256";
import redisClient from "../../utils/redis";
import { RowDataPacket } from "mysql2";
dotenv.config();



export async function loginService(model: DtoModel): Promise<ViewModel> {
  try {
    const result = await mysqlSearchAccount(model);
    if (!result.success) {
      // return { jwtToken:'0' };
      throw new Error("Wrong mail or password");
    }
    model.mail
    const pl:payLoad= {
      username:result.name,
      userID:result.uid
    } 
    const jwtToken = getJWTToken(pl);
    return { jwtToken };
  } catch (err) {
    console.error("loginService error:", err);
    throw err; // 確保錯誤傳遞到呼叫者
  }
}

export async function registerService(model: registerModel) {
  const result: DataModel = registerRepository(model);
  try {
    const mysql = await mysqlPool.getConnection();
    const q = `
    SELECT email, password FROM user WHERE email = ? and password = ?;`;
    const value = [model.mail, model.hashPassword];
    const [rows] = await mysql.query<RowDataPacket[]>(q, value);
    console.log(rows);
    if (!rows.length) {
      mysqlAddAccount(model);
    } else {
      throw new Error("Already have account!");
    }
  } catch (err) {
    console.error("registerService", err);
    throw err;
  }
}

async function mysqlAddAccount(userData: registerModel) {
  try {
    const mysql = await mysqlPool.getConnection();
    const query = `
      insert into user (\`username\`, \`email\`, \`password\`)
      value (?, ?, ?)
    `;
    const value = [userData.name, userData.mail, userData.hashPassword];
    const [rows, fields] = await mysql.query(query, value);
    console.log(rows, fields);
  } catch (err) {
    console.error("mysqlSearchAccount fail:\n", err);
  }
}

async function mysqlSearchAccount(userData: DtoModel) {
  try {
    const mysql = await mysqlPool.getConnection();
    const q = `
    SELECT * FROM user WHERE email = ? AND password = ?;`;
    const value = [userData.mail, userData.hashPassword];
    const [rows] = await mysql.query<RowDataPacket[]>(q, value);
    console.log("mysqlSearchAccount:", rows, typeof rows, rows.length);

    if (rows.length) {
      return { success: true, mail: userData.mail, uid:rows[0].uid, name:rows[0].username };
    }
    return { success: false, mail: userData.mail, uid:0, name:'0' };
  } catch (err) {
    console.error("mysqlSearchAccount fail:\n", err);
    return { success: false, mail: userData.mail, uid:0, name:'0' };

  }
}

// Base64Url 編碼方法
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "") // 去掉填充符號 "="
    .replace(/\+/g, "-") // "+" 替換成 "-"
    .replace(/\//g, "_"); // "/" 替換成 "_"
}

// HMAC SHA256 簽名方法
function createHmacSignature(message: string, secret: string): string {
  const signature = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Base64);
  return signature.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// 簽發 JWT Token
export const getJWTToken = (payload: payLoad): string => {
  const secret = "P9/mQY0iZqNJ9xAzMVSS+c7tPWay8673rMKVk7EjJyU=";

  // Header
  const header = {
    alg: "HS256", // 使用 HMAC SHA256
    typ: "JWT", // 類型是 JWT
  };

  // 編碼 Header 和 Payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // 創建簽名
  const signature = createHmacSignature(
    `${encodedHeader}.${encodedPayload}`,
    secret
  );

  // 返回最終 Token
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};


export function verifyJWTToken(token: string): payLoad {
  const secret = "P9/mQY0iZqNJ9xAzMVSS+c7tPWay8673rMKVk7EjJyU=";

  try {
    // 驗證並解碼
    const decoded = jwt.verify(token, secret) as payLoad;
    return decoded;
  } catch (error) {
    throw new Error("Invalid JWT token");
  }
}
