import { TelegramClient } from "telegram";
import { getSession } from "./auth/get-session.js";
import { createChildLogger } from "../logger/create-child-logger.js";

export async function createClient(db, config, logger) {
  const authLogger = createChildLogger(logger, "Auth");

  const apiId = config.app.id;
  const apiHash = config.app.hash;

  const client = new TelegramClient(await getSession(db), apiId, apiHash, {
    connectionRetries: 5,
  });

  authLogger.info("Starting Telegram client...");

  await client.start({
    onError: (err) => authLogger.error(err),
  });

  authLogger.info("Started Telegram client successfully.");

  authLogger.info("Starting connect...");

  await client.connect();
  const username = (await client.getMe()).username;

  authLogger.info(`You are now connected as @${username}.`);

  return client;
}
