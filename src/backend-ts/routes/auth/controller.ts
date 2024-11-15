import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Auth router is availble");
});

router.get("/login", (req: Request, res: Response) => {
  res.status(200).send("Login router is availble");
});

export default router;
