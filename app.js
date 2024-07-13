import { createClient } from "./lib/server.js";
import { getConfig } from "./config/config.js";
import { getDBClient } from "./db/client.js";
import { connector } from "./lib/service-connector/connector.js";
import { telegramChannelUpdateListner } from "./lib/telegram-channel-listener/index.js";
import { createLogger } from "./logger/logger.js";

const main = async () => {
  const logger = createLogger();

  process.on("unhandledRejection", (err) => {
    logger.error(err);
    process.exit(1);
  });

  const config = await getConfig();
  const db = await getDBClient(config, logger);
  const client = await createClient(db, config, logger);

  connector(client, telegramChannelUpdateListner, [db, config, logger]);
};

main();
