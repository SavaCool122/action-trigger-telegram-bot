import { createClient } from "./lib/server.js";
import { getConfig } from "./config/config.js";
import { getDBClient } from "./db/client.js";
import { connector } from "./lib/service-connector/connector.js";
import { telegramChannelUpdateListner } from "./lib/telegram-channel-listener/index.js";

const main = async () => {
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });

  const config = await getConfig();
  const db = await getDBClient(config);
  const client = await createClient(db, config);

  connector(client, telegramChannelUpdateListner, [db, config]);
};

main();
