import express from "express";
import cors from "cors"
import mysqlPool from "../../utils/mysql";
import { error } from "node:console";

const router = express.Router();
router.use(cors());
router.use(express.json());


router.get("/", (req, res) => {
  res.status(200).send("chatroom router is availble");
});


router.post("/getChatrooms", async (req, res) => {
  try {
  const mysql = mysqlPool.getConnection();
  const q = `select * from chatroom`;
  const rows = (await mysql).query(q);
  res.status(200).send(rows);
  } catch (error) {
    console.error("Error [/getChatrooms] :", error);
  }
});


export default router;