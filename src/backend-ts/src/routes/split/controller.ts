import express from "express";
import cors from "cors"
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
  const {chatroomID} = req.body; // 需要從前端獲取 req.body : chatRoomID
  const q = `select * from accounting where super_cid = ? and issplited = false;`;
  const [rows, fields] = await (await mysql).query(q, chatroomID);
  console.log("/getSplits Rows:", rows);
  res.status(200).send(rows);
  } catch (error) {
    console.error("Error: /getSplits", error);
    res.status(400);
  }
})

router.post("/addSplits", async (req, res) => {
  try {
  const mysql = mysqlPool.getConnection();
  const {title, super_cid, payer, attendees_ids, price} = req.body; // 需要從前端獲取 req.data

  const q = `insert into accounting (\`title\`, \`super_cid\`, \`payer\`, \`attendees_ids\`, \`price\`, \`issplited\`) values
  (?, ?, ?, ?, ?, FALSE);`
  const value = [title, super_cid, payer, attendees_ids, price];
  const [rows, fields] = await (await mysql).query(q, value);
  res.status(200).send(rows);
  } catch (error) {
    console.error("Error: /AddSplits", error);
    res.status(400);
  }
})

router.post("/startSplits", async (req, res) => {
  const debts:payTransaction= [];
  try {
    const mysql = mysqlPool.getConnection();
    const {chatroomID} = req.body; // 需要從前端獲取 req.body : chatRoomID
    const q = `select * from accounting where super_cid = ? and issplited = false;`;
    const [rows, fields] = await (await mysql).query<RowDataPacket[]>(q, chatroomID); 
    console.log("ROWS:", rows);
    rows.forEach(({acid, title, payer, attendees_ids, price, issplited}) => {
      const attendeesIds = attendees_ids.split(',').map(id => parseInt(id.trim()));
      const allParticipants = [payer, ...attendeesIds];
      const amountPerPerson = parseFloat((price / allParticipants.length).toFixed(2));
      allParticipants.forEach(participant => {
        if (participant !== payer) {
          debts.push({
            from: participant,
            to: payer,
            amount: amountPerPerson
          });
        }
      });
    
    });
    console.log(debts);
  }catch(error) {
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
      const result = JSON.parse(new TextDecoder("utf-8").decode(response.Payload));
  
      console.log("Lambda response:", result);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error invoking Lambda:", error);
      res.status(400);
    }
  }

  
  

  
  
})


// router.post("/", async (req, res) => {
//   try {
//     const mysql = await mysqlPool.getConnection();
//     const q = `select * from feat_accounting where super_cid = 'C001';`
//     const [rows] = await mysql.query(q);
//     console.log(rows)
//     const records = rows.map((record) => ({
//       text: record.description, // 將 description 作為 text
//       amount: `$${parseFloat(record.amount).toLocaleString()}` // 格式化金額並轉換為字串
//     }));
//     console.log(rows)
//     res.status(200).send(records);
//   }
//   catch(error) {
//     console.error("Split:Error", error);
//   }
//   // const records = [
//   //   {  text: "香蕉", amount: "-$5,000,000,000" },
//   //   {  text: "陶朱隱園", amount: "-$5,000,000,000" },
//   //   // 可以添加更多記錄
//   // ];

// })

// router.post("/add", async(req, res) => {
//   try {
//     const mysql = await mysqlPool.getConnection();
//     const value = 'C001';
//     const q = `select * from feat_accounting, channel,\`groups\` where super_cid = cid and cid = 'C001';
// `
//     const [rows] = await mysql.query(q, value);
//     console.log(rows);
//     res.status(200).send(rows);
//   }
//   catch (error) {
//     console.error("Split/add:Error", error);
//   }
// })


// router.post("/addBill", async(req, res) => {
//   try {
//     const mysql = await mysqlPool.getConnection();
    
//     // 查詢最後一筆記錄
//     const [rows] = await mysql.query("SELECT accid FROM feat_accounting ORDER BY id DESC LIMIT 1");
//     let lastId = rows.length > 0 ? rows[0].id : "Ac000"; // 若無資料，預設從 Ac000 開始

//     // 生成新 ID
//     const numericPart = parseInt(lastId.substring(2), 10) + 1; // 提取數字部分並加 1
//     const newId = `AC${numericPart.toString().padStart(3, "0")}`; // 格式化為 AcXXX 

//     const q = `
//       INSERT INTO your_table_name (
//           accid, 
//           super_cid, 
//           payer, 
//           amount, 
//           unit, 
//           attendees_ids, 
//           description, 
//           event_time, 
//           is_split, 
//           created_by
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//   `;
//     const values = [
//       newId,                          // accid (假設由程式生成)
//       "C001",                           // super_cid (假設為固定值)
//       req.payers[0],                   // payer (取付款人的第一個)
//       parseFloat(data.amount),          // amount (轉為數字)
//       "NTD",                            // unit (假設為固定值)
//       data.splitters.join(","),         // attendees_ids (分攤人轉為逗號分隔字串)
//       req.title || null,         // description
//       new Date(data.date),              // event_time (轉為 Date 物件)
//       0, // is_split (根據分攤人數量決定)
//       "U001"                            // created_by (假設為固定值)
//     ];
    
//     const [rows2, fields] = await mysql.query(q, values);
//   } catch (error) {
//     console.error("Add bill:", error);
//   }
// })

export default router;