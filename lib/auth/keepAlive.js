export async function keepAlive(client, logger) {
  logger.info("[Keep Alive] Start");
  setInterval(async () => {
    if (!client.connected) {
      logger.info("[Keep Alive] not connected");
      await client.connect();
    }

    if (client.checkAuthorization()) {
      await client.getMe();
      logger.info("[Keep Alive] keep");
    }
  }, 30000);
}
