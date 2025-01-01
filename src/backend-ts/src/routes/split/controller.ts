import express from "express";
import cors from "cors";
import mysqlPool from "../../utils/mysql";
import { error } from "node:console";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { payTransaction } from "./model";
import { RowDataPacket } from "mysql2";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).send("split router is availble");
});

router.post("/getSplits", async (req, res) => {
  try {
    console.log("/getSplits POST:", req.body);
    const mysql = mysqlPool.getConnection();
    const { chatroomID } = req.body; // 需要從前端獲取 req.body : chatRoomID
    const q = `select * from accounting where super_cid = ? and issplited = false;`;
    const [rows, fields] = await (await mysql).query(q, chatroomID);
    console.log("/getSplits Rows:", rows);
    res.status(200).send(rows);
  } catch (error) {
    console.error("Error: /getSplits", error);
    res.status(400);
  }
});

router.post("/addSplits", async (req, res) => {
  try {
    const mysql = mysqlPool.getConnection();
    const { title, super_cid, payer, attendees_ids, price } = req.body; // 需要從前端獲取 req.data

    const q = `insert into accounting (\`title\`, \`super_cid\`, \`payer\`, \`attendees_ids\`, \`price\`, \`issplited\`) values
  (?, ?, ?, ?, ?, FALSE);`;
    const value = [title, super_cid, payer, attendees_ids, price];
    const [rows, fields] = await (await mysql).query(q, value);
    res.status(200).send(rows);
  } catch (error) {
    console.error("Error: /AddSplits", error);
    res.status(400);
  }
});

router.post("/startSplits", async (req, res) => {
  const debts: payTransaction[] = [];
  try {
    const mysql = mysqlPool.getConnection();
    const { chatroomID } = req.body; // 需要從前端獲取 req.body : chatRoomID
    const q = `select * from accounting where super_cid = ? and issplited = false;`;
    const [rows, fields] = await (
      await mysql
    ).query<RowDataPacket[]>(q, chatroomID);
    console.log("ROWS:", rows);
    rows.forEach(({ acid, title, payer, attendees_ids, price, issplited }) => {
      const attendeesIds = attendees_ids
        .split(",")
        .map((id) => parseInt(id.trim()));
      const allParticipants = [payer, ...attendeesIds];
      const amountPerPerson = parseFloat(
        (price / allParticipants.length).toFixed(2)
      );
      allParticipants.forEach((participant) => {
        if (participant !== payer) {
          debts.push({
            from: participant,
            to: payer,
            amount: amountPerPerson,
          });
        }
      });
    });
    console.log(debts);
  } catch (error) {
    console.error("/startSplits Error:", error);
    res.status(400);
  } finally {
    try {
      const awsClient = new LambdaClient({ region: "ap-southeast-2" }); // 替換為你的 AWS 區域
      const functionName = "splitBillGreedy"; // 替換為你的 Lambda 函數名稱
      const command = new InvokeCommand({
        FunctionName: functionName,
        Payload: JSON.stringify(debts),
      });

      const response = await awsClient.send(command);
      const result = JSON.parse(
        new TextDecoder("utf-8").decode(response.Payload)
      );

      console.log("Lambda response:", result);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error invoking Lambda:", error);
      res.status(400);
    }
  }
});

export default router;
