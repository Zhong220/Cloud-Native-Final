import express from "express";
import cors from "cors";
import mysqlPool from "../../utils/mysql";
import redisClient from "../../utils/redis";

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

router.post("/userGetChatroomRedis", async (req, res) => {
  // input: user , 尋找 USEr 有的聊天室
  try {
    const data = req.body;
    const user = data.user;
    const exists = await redisClient.exists(`user:${user}:rooms`);
    if (exists) {
      const result = await redisClient.hgetall(`user:${user}:rooms`);
      const formattedResult = Object.entries(result).map(([chatroomID, name]) => ({
        chatroomID,
        name,
      }));
      console.log(formattedResult);
      res.status(200).send(formattedResult);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    console.error("Error [/getChatroomRedis] :", error);
    res.status(400);
  }
});

router.post("/getChatroomUsersRedis", async (req, res) => {
  // input: chatroomID , 尋找聊天室有的人
  try {
    const data = req.body;
    const chatroomID = data.chatroomID;
    const exists = await redisClient.exists(`room:${chatroomID}:members`);
    if (exists) {
      const result = await redisClient.hgetall(`room:${chatroomID}:members`);
      console.log(result);
      const formattedResult = Object.entries(result).map(([userID, userName]) => ({
        userID,
        userName,
      }));
      console.log(formattedResult);
      res.status(200).send(formattedResult);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    
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
  // 從 redis 取得聊天室的訊息
  try {
    const data = req.body;
    const chatroomID = data.chatroomID;
    const exists = await redisClient.exists(`room:${chatroomID}`);
    if (exists) {
      const result = await redisClient.lrange(`room:${chatroomID}`, 0, -1);
      // 拿到的資料是字串，要轉換成json
      const resultJson = result.map((element) => JSON.parse(element));

      res.status(200).send(resultJson);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    console.error("Error [/getMessagesRadis] :", error);
    res.status(400);
  }
});



export default router;
