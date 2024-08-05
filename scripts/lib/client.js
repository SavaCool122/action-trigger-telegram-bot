import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "node:readline";
import { getConfig } from "../../config/config.js";
import { createLogger } from "../../logger/logger.js";

const config = await getConfig();
const logger = createLogger();

const apiId = config.app.id;
const apiHash = config.app.hash;
const stringSession = new StringSession("");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function startAndGetClient() {
  logger.info("Loading script for sessions...");

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your number: ", resolve)
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your password: ", resolve)
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question("Please enter the code you received: ", resolve)
      ),
    onError: (err) => logger.info(err),
  });

  return client;
}
