import { listenChannelForMessage } from "./listen-channel-for-message.js";
import { parseMessage } from "../message-filtering/parse-message.js";
import { createSendPostMethod } from "../send-post/create-send-post-method.js";

async function getSource(db) {
  return db.get("channels:input");
}

const SEARCHING_ARIA = "Вінницька_область";

const logSkipByInvalid = (parsedMessage) => (_, __, logger) => {
  logger.info(
    "[Listner] [Skipped] Invalid message: %s %s",
    parsedMessage.type,
    parsedMessage.aria
  );
};

const logSkipByType = (parsedMessage) => (_, __, logger) => {
  logger.info("[Listner] [Skipped] By Type: %s", parsedMessage.type);
};

const logSkipByAria = (parsedMessage) => (_, __, logger) => {
  logger.info("[Listner] [Skipped] By Aria: %s", parsedMessage.aria);
};

export async function telegramChannelUpdateListner(client, db, logger) {
  const source = await getSource(db);

  // created with listner to reduce time to send
  const sendStart = await createSendPostMethod("START", db, logger);
  const sendEnd = await createSendPostMethod("END", db, logger);

  const handler = async (update) => {
    const parsedMessage = parseMessage(update.message.message);

    const isValidAria = parsedMessage.aria === SEARCHING_ARIA;
    const isValidType = ["START", "END"].includes(parsedMessage.type);
    const isStartType = isValidAria && parsedMessage.type === "START";
    const isEndType = isValidAria && parsedMessage.type === "END";

    if (!isValidAria && !isValidType)
      logSkipByInvalid(parsedMessage, parsedMessage);
    if (!isValidAria) logSkipByAria(parsedMessage, parsedMessage);
    if (!isValidType) logSkipByType(parsedMessage, parsedMessage);

    if (isStartType) sendStart(client, logger);
    if (isEndType) sendEnd(client, logger);
  };

  listenChannelForMessage(client, source, handler, logger);
}
