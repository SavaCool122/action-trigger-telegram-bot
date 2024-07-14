import { listenChannelForMessage } from "./listen-channel-for-message.js";
import { parseMessage } from "../message-filtering/parse-message.js";
import { sendStartPost } from "../send-post/send-start-post.js";
import { sendEndPost } from "../send-post/send-end-post.js";

const SEARCHING_ARIA = "Вінницька_область";

export async function telegramChannelUpdateListner(client, logger) {
  const handler = async (update) => {
    const parsedMessage = parseMessage(update.message.message);

    const isValidAria = parsedMessage.aria === SEARCHING_ARIA;
    const isValidType = ["START", "END"].includes(parsedMessage.type);

    if (!isValidAria && !isValidType)
      logger.info("[Listner] [Skipped] By invalid message type");
    if (!isValidAria)
      logger.info("[Listner] [Skipped] By Aria: %s", parsedMessage.aria);
    if (isValidAria && parsedMessage.type === "START") sendStartPost(client);
    if (isValidAria && parsedMessage.type === "END") sendEndPost(client);
    if (isValidAria && !isValidType)
      logger.info("[Listner] [Skipped] By Type: %s", parsedMessage.type);
  };

  listenChannelForMessage(client, "@testingyou1", handler, logger);
}
