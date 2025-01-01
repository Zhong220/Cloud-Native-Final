import { DataModel, DtoModel, ViewModel } from "./model.js";
import loginRepository from "./repository.js";

export default function loginService(model: DtoModel): ViewModel {
  const result: DataModel = loginRepository(model);
  return { jwtToken: getJWTToken(result.mail) };
}

const getJWTToken = (sort: string): string => {
  return "sjlafjlaf";
};

export function generateChatroomID() {
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export async function createAChatroom(data: CreateRoomModel) {
  // redis client
  try {
    const connection = await mysqlPool.getConnection();
    const query = `INSERT INTO \`chatroom\` (\`cid\`, \`name\`, \`description\`) VALUES (?, ?, ?);`;
    const value = [generateChatroomID(), data.name, data.description];
    const [rows, fields] = connection.query(query, value);
  } catch (error) {
    console.error("createAChatroom Error", error);
  }
}


export async function searchChatroomRedis(data: SearchRoomModel) {
  try {
    const result = await redisClient.get(data.cid);
    return result;
  } catch (error) {
    console.error("searchChatroomRedis Error", error);
  }
}

export function isoToMySQLTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const milliseconds = ('00' + date.getMilliseconds()).slice(-3);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
