import { createClient } from "redis";
import { envVars } from "./env";
import { RedisStore } from "connect-redis";

export const redisClient = createClient({
  username: envVars.REDIS_USERNAME,
  password: envVars.REDIS_PASSWORD,
  socket: {
    host: envVars.REDIS_HOST,
    port: Number(envVars.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

// await client.set("foo", "bar");
// const result = await client.get("foo");
// console.log(result); // >>> bar

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis Connected");
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
    console.log("Redis disconnected on app termination");
  }
  process.exit(0);
});

export const redisStore = new RedisStore({
  client: redisClient,
  ttl: 7 * 24 * 60 * 60,
});

// export const abc = new RedisStore;
