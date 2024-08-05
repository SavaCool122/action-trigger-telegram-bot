import { createClient } from "./lib/server.js";
import { getConfig } from "./config/config.js";
import { getDBClient } from "./db/client.js";
import { telegramChannelUpdateListner } from "./lib/telegram-channel-listener/listner.js";
import { createLogger } from "./logger/logger.js";
import { keepAlive } from "./lib/auth/keepAlive.js";
import { createDBService } from "./db/service.js";

const logger = createLogger();

const main = async () => {
  const config = getConfig();

  const dbClient = await getDBClient(config, logger);
  const db = createDBService(dbClient);
  const client = await createClient(db, config, logger);

  telegramChannelUpdateListner(client, db, logger);

  keepAlive(client, logger);
};

main().catch(logger.error);
