import express, { Request, Response } from "express";
import loginService from "./service.ts";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Channel router is availble");
});

export default router;
