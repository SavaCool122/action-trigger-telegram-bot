import { createClient } from "redis";
import { createChildLogger } from "../logger/create-child-logger.js";

export async function getDBClient(config, logger) {
  const dbLogger = createChildLogger(logger, "DB");
  const client = createClient({ url: config.redis.url });

  client.on("connect", () => dbLogger.info("DB is connecting"));
  client.on("ready", () => dbLogger.info("DB is ready"));
  client.on("end", () => dbLogger.info("DB disconnected"));
  client.on("reconnecting", () => dbLogger.info("DB is reconnecting"));
  client.on("error", (e) => dbLogger.error(e));

  (async () => {
    await client.connect();
  })();

  process.on("SIGINT", async () => {
    await client.disconnect();
  });

  return client;
}
