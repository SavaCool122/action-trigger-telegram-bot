import { createClient } from "./lib/server.js";
import { getConfig } from "./config/config.js";
import { getDBClient } from "./db/client.js";
import { connector } from "./lib/service-connector/connector.js";
import { telegramChannelUpdateListner } from "./lib/telegram-channel-listener/listner.js";
import { createLogger } from "./logger/logger.js";

const logger = createLogger();

const main = async () => {
  const config = getConfig();
  const db = await getDBClient(config, logger);
  const client = await createClient(db, config, logger);

  connector(client, telegramChannelUpdateListner, [db, logger]);
};

main().catch(logger.error);
