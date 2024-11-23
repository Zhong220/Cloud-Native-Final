import express, { Request, Response } from "express";
import routes from "./routes/index.ts";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const redis = new Redis(Number(process.env.REDIS_PORT) || 6380);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("CNS ts express backend is available.");
});

// assign url
routes.forEach((e) => {
  app.use(e.addr, e.router);
});

app.listen(port);
