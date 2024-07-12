import { createClient } from "redis";

const redisURL = process.env.REDIS_URL;

const client = createClient({ url: redisURL });

client.on("connect", () => console.log("Cache is connecting"));
client.on("ready", () => console.log("Cache is ready"));
client.on("end", () => console.log("Cache disconnected"));
client.on("reconnecting", () => console.log("Cache is reconnecting"));
client.on("error", (e) => console.error(e));

(async () => {
  await client.connect();
})();

process.on("SIGINT", async () => {
  await client.disconnect();
});

export default client;
