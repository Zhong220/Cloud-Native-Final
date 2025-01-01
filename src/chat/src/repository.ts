import { RowDataPacket } from "mysql2/promise";
import { StoreMessageDataModel, CreateRoomModel } from "./model";
import { generateChatroomID } from "./service";
import mysqlPool from "./utils/mysql";

export async function storeMessageRepository(data: StoreMessageDataModel[]) {
  const connection = await mysqlPool.getConnection();
  try {
    // Ensure there is data to insert
    if (data.length === 0) {
      console.warn("No data provided to insert.");
      return;
    }

    const query = `
      INSERT INTO chat_in (uid, cid, message, timestamp)
      VALUES 
      ${data.map(() => "(?, ?, ?, ?)").join(", ")}
    `;

    // Flatten the values array for parameterized query
    const values = data.flatMap((element) => [
      element.uid,
      element.cid,
      element.message,
      element.timestamp,
    ]);

    await connection.query(query, values);
    console.log("Messages successfully inserted into chat_in.");
  } catch (err) {
    console.error("Error inserting chat messages:", err);
  } finally {
    connection.release();
  }
}

export async function getMessageRepository(data: {
  startTime: string;
  endTime: string;
}): Promise<StoreMessageDataModel[]> {
  const connection = await mysqlPool.getConnection();
  let result: StoreMessageDataModel[] = [];

  try {
    const query = `
      SELECT uid, cid, message, timestamp FROM chat_in
      WHERE timestamp >= ? AND timestamp <= ?
    `;
    const values = [data.startTime, data.endTime];

    // Explicitly type the query result
    const [rows] = await connection.query<RowDataPacket[]>(query, values);
    result = rows.map((row) => ({
      uid: row.uid,
      cid: row.cid,
      message: row.message,
      timestamp: row.timestamp,
    }));
  } catch (err) {
    console.error("Error getting chat messages:", err);
  } finally {
    connection.release();
  }

  return result;
}

export async function createAChatroom(data: CreateRoomModel) {
  try {
    const connection = await mysqlPool.getConnection();
    const query = `INSERT INTO \`chatroom\` (\`cid\`, \`name\`, \`description\`) VALUES (?, ?, ?);`;
    const value = [generateChatroomID(), data.name, data.description];
    const [rows, fields] = connection.query(query, value);
  } catch (error) {
    console.error("createAChatroom Error", error);
  }
}
