import express, { Request, Response } from "npm:express";

const router = express.router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Authrouter is available.");
});

export default router;
