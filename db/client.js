import { createClient } from "redis";

export async function getDBClient(config) {
  const client = createClient({ url: config.redis.url });

  client.on("connect", () => console.log("DB is connecting"));
  client.on("ready", () => console.log("DB is ready"));
  client.on("end", () => console.log("DB disconnected"));
  client.on("reconnecting", () => console.log("DB is reconnecting"));
  client.on("error", (e) => console.error(e));

  (async () => {
    await client.connect();
  })();

  process.on("SIGINT", async () => {
    await client.disconnect();
  });

  return client;
}
