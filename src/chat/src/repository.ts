import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { StoreMessageDataModel } from "./model";

dotenv.config();

const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export async function storeMessageRepository(data: StoreMessageDataModel[]) {
  const connection = await mysqlPool.getConnection();
  try {
    const query = `
      INSERT INTO chat_in (uid, cid, message, timestamp)
      VALUES (?, ?, ?, ?)
    `;
    const values = data.map((element) => [
      element.uid,
      element.cid,
      element.message,
      element.timestamp,
    ]);
    await connection.query(query, values);
  } catch (err) {
    console.error("Error inserting chat messages:", err);
  } finally {
    connection.release();
  }
}
