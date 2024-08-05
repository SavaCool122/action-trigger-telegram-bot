import { createChildLogger } from "../../logger/create-child-logger.js";

export async function keepAlive(client, logger) {
  const keepLogger = createChildLogger(logger, "Keep Alive");

  keepLogger.info("Start");

  setInterval(async () => {
    if (!client.connected) {
      keepLogger.info("not connected");
      await client.connect();
    }

    if (client.checkAuthorization()) {
      await client.getMe();
      keepLogger.info("keep");
    }
  }, 30000);
}
