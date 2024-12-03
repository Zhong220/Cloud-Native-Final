import Redis from "ioredis";

const redis = new Redis(6380);

export const REDIS_URL = "http://localhost:6380";

export default redis;
