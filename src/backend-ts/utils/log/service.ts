import { EventLogServiceModel, HardwareLogRepositoryModel } from "./model.ts";
import { eventLogRepository, hardwareLogRepository } from "./repository.ts";
import si from "systeminformation";

export function eventLogService(log: EventLogServiceModel) {
  try {
    eventLogRepository({
      timestamp: new Date(),
      uid: log.uid,
      event: `API:[${log.apiUrl}], http code:[${log.httpCode}], description:[${log.description}]`,
    });
  } catch (error) {
    console.error("Error inserting event log:", error);
  }
}

export async function hardwareLogService() {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const disk = await si.fsSize();
    const network = await si.networkStats();

    const hardwareLog: HardwareLogRepositoryModel = {
      timestamp: new Date(),
      cpu: cpu.currentLoad,
      ram: memory.used / (1024 * 1024 * 1024), // Convert bytes to GB
      disk: disk.reduce((acc, d) => acc + d.use, 0) / disk.length, // Average disk usage percentage
      network: `in:[${network[0].rx_sec / (1024 * 1024)}] MB/s, 
        out:[${network[0].tx_sec / (1024 * 1024)}] MB/s`, // Convert bytes to MB
    };

    hardwareLogRepository(hardwareLog);
  } catch (error) {
    console.error("Error inserting hardware log:", error);
  }
}
