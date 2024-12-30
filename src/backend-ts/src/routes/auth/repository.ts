import { DataModel, DtoModel, registerTokenRedisModle} from "./model";

import redisClient from "../../utils/redis";



export function loginRepository(model: DtoModel): DataModel {
  const result: DataModel = { mail: model.mail };
  return result;
}

export function registerRepository(model: DtoModel): DataModel {
  const result: DataModel = { mail: model.mail };
  return result;
}


export async function registerTokenRedis (model:registerTokenRedisModle) {
  try {
    await redisClient.set(
      `verify:${model.token}`,
      JSON.stringify({ email:model.mail, name:model.name, password:model.hashPassword })
    );
    await redisClient.expire(`verify:${model.token}`, 15 * 60); // 15mins
  } catch (error) {
    console.error("registerTokenRedis Error:", error);
  }
}
