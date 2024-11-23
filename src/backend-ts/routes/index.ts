import { Router } from "express";
import { default as authRouter } from "./auth/controller.ts";
import { default as channelRouter } from "./channel/controller.ts";
import Redis from "ioredis";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

type RouteProps = {
  addr: string;
  router: Router;
};

// Integration of routers
const routes: RouteProps[] = [
  { addr: "/auth", router: authRouter },
  { addr: "/channel", router: channelRouter },
];

export const redis = new Redis(Number(process.env.REDIS_PORT) || 6380);

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default routes;
