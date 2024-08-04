import { listenChannelForMessage } from "./listen-channel-for-message.js";
import { parseMessage } from "../message-filtering/parse-message.js";
import { createSendPostMethod } from "../send-post/create-send-post-method.js";

async function getSource(db) {
  return db.get("channels:input");
}

async function getSearchAria(db) {
  return db.get("channels:input:aria");
}

export async function telegramChannelUpdateListner(client, db, logger) {
  const source = await getSource(db);
  const aria = await getSearchAria(db);

  // created with listner to reduce time to send
  const sendStart = await createSendPostMethod("START", db, logger);
  const sendEnd = await createSendPostMethod("END", db, logger);

  const handler = async (update) => {
    const parsedMessage = parseMessage(update.message.message);

    const isValidAria = parsedMessage.aria === aria;
    const isValidType = ["START", "END"].includes(parsedMessage.type);
    const isStartType = isValidAria && parsedMessage.type === "START";
    const isEndType = isValidAria && parsedMessage.type === "END";

    if (!isValidAria || !isValidType)
      logger.info(
        "[Listner] [Skipped] Invalid message format. Aria: %s, Type: %s",
        parsedMessage.aria,
        parsedMessage.type
      );

    if (isStartType) await sendStart(client, logger);
    if (isEndType) await sendEnd(client, logger);
  };

  listenChannelForMessage(client, source, handler, logger);
}
