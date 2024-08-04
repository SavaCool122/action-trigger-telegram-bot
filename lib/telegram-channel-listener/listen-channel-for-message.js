import { NewMessage } from "telegram/events/index.js";
import { markChannelAsRead } from "./mark-channel-as-read.js";
import { getRealDelay } from "./log-real-delay.js";

export async function listenChannelForMessage(client, channelName, fn, logger) {
  client.addEventHandler(async (update) => {
    logger.info("[Listner] Message received: %s", update.message.message);
    await fn(update);
    logger.info("[Listner] Real delay: %d", getRealDelay(update) / 1000);
    await markChannelAsRead(client, channelName);
  }, new NewMessage({ incoming: true, chats: [channelName] }));

  logger.info(`[Listner] Listening for new messages in the ${channelName}`);
}
