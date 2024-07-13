import { TelegramClient } from "telegram";
import { getSession } from "./auth/get-session.js";

export async function createClient(db, config, logger) {
  const apiId = config.app.id;
  const apiHash = config.app.hash;

  const client = new TelegramClient(await getSession(db), apiId, apiHash, {
    connectionRetries: 5,
  });

  logger.info("Starting Telegram client...");
  await client.start({
    onError: (err) => logger.error(err),
  });
  logger.info("Started Telegram client successfully.");

  logger.info("Starting connect...");
  await client.connect();
  logger.info("You are now connected.");

  return client;
}
