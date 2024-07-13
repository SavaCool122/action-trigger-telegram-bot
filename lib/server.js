import { TelegramClient } from "telegram";
import { getSession } from "./auth/get-session.js";

export async function createClient(db, config) {
  const apiId = config.app.id;
  const apiHash = config.app.hash;

  const client = new TelegramClient(await getSession(db), apiId, apiHash, {
    connectionRetries: 5,
  });

  console.log("Starting Telegram client...");
  await client.start({
    onError: (err) => console.log(err),
  });
  console.log("Started Telegram client successfully.");

  console.log("Starting connect...");
  await client.connect();
  console.log("You are now connected.");

  return client;
}
