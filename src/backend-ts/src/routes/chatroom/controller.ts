import express from "express";
import cors from "cors"
import mysqlPool from "../../utils/mysql";


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
  const [rows, fields] = await (await mysql).query(q);
  res.status(200).send(rows);
  } catch (error) {
    console.error("Error [/getChatrooms] :", error);
    res.status(400);
  }
});


router.post("/getMessages", async (req, res) => {
  try {
    const data = req.body;
    const num_of_data = 100;
    const mysql = mysqlPool.getConnection();
    const q = `select * from chatroom where super_cid = ? ORDER BY mid DESC LIMIT ?`;
    const value = [data.chatroomID, num_of_data];
    const rows = (await mysql).query(q, value);
    res.status(200).send(rows);
  } catch (error) {
    console.error("/getMessages Error: ");
    res.status(400);
  }
});

router.post("/getMessagesRadis", async (req, res) => {
  
});


export default router;