import { startAndGetClient } from "./lib/client.js";
import { getDBClient } from "../db/client.js";
import { getConfig } from "../config/config.js";
import { createLogger } from "../logger/logger.js";

(async () => {
  const client = startAndGetClient();
  const config = getConfig();
  const logger = createLogger();
  const db = await getDBClient(config, logger);

  db.set("session", client.session.save());
})();
