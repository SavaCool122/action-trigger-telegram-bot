import { createClient } from "redis";

export async function getDBClient(config, logger) {
  const client = createClient({ url: config.redis.url });

  client.on("connect", () => logger.info("DB is connecting"));
  client.on("ready", () => logger.info("DB is ready"));
  client.on("end", () => logger.info("DB disconnected"));
  client.on("reconnecting", () => logger.info("DB is reconnecting"));
  client.on("error", (e) => logger.error(e));

  (async () => {
    await client.connect();
  })();

  process.on("SIGINT", async () => {
    await client.disconnect();
  });

  return client;
}
