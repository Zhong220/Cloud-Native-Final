import {
  EventLogRepositoryModel,
  HardwareLogRepositoryModel,
} from "./model.ts";
import pool from "../mysql.ts";

export async function eventLogRepository(log: EventLogRepositoryModel) {
  const connection = await pool.getConnection();
  try {
    const query = `
      INSERT INTO event_logs (timestamp, uid, event)
      VALUES (?, ?, ?)
    `;
    const values = [log.timestamp, log.uid, log.event];
    await connection.query(query, values);
  } catch (error) {
    console.error("Error inserting event log:", error);
  } finally {
    connection.release();
  }
}

export async function hardwareLogRepository(log: HardwareLogRepositoryModel) {
  const connection = await pool.getConnection();
  try {
    const query = `
      INSERT INTO hardware_logs (timestamp, cpu, ram, disk, network)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [log.timestamp, log.cpu, log.ram, log.disk, log.network];
    await connection.query(query, values);
  } catch (error) {
    console.error("Error inserting hardware log:", error);
  } finally {
    connection.release();
  }
}
