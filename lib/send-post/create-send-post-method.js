import { sendMessage } from "./send-message.js";
import path from "node:path";

function getFieldByType(type) {
  if (type === "START") return { message: "start_message", image: "start.jpg" };
  else return { message: "end_message", image: "end.jpg" };
}

function getFullFilePath(fileName, folder) {
  return path.join(import.meta.dirname, "assets", folder, fileName);
}

export async function createSendPostMethod(type, db, logger) {
  const dataFieldByType = getFieldByType(type);

  logger.info(`[Listner] [${type}] [Getting data for message]`);

  const channels = await db.sMembers("channels:output");
  const channelsWithData = await Promise.all(
    channels.map(async (name) => await db.hGetAll(name))
  );

  const names = channelsWithData.map((channel) => channel.name).join(", ");

  logger.info(`[Listner] [${type}] Created senders for ${names}`);

  return async (client, logger) => {
    logger.info(`[Listner] [${type}] [Sending Message...]`);

    await Promise.all(
      channelsWithData.map(
        async (channel, idx) =>
          await sendMessage(
            client,
            channel.name,
            channel[dataFieldByType.message],
            getFullFilePath(dataFieldByType.image, String(idx + 1))
          )
      )
    );

    logger.info(`[Listner] [${type}] [Message Sended]`);
  };
}
