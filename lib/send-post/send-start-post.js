import { Api } from "telegram";
import { sendMessage } from "./send-message.js";
import { returnBigInt } from "telegram/Helpers.js";

async function getFile(db) {
  const fileData = await db.hGetAll("start_file");
  return new Api.InputFile({
    id: returnBigInt(BigInt(fileData.id.slice(0, -1))),
    parts: Number(fileData.parts),
    name: fileData.name,
    md5Checksum: "",
  });
}

async function getMessage(db) {
  return await db.get("start_message");
}

export async function sendStartPost(client, db, logger) {
  logger.info("[Listner] [Getting data for start message]");

  const file = await getFile(db);
  const message = await getMessage(db);

  logger.info("[Listner] [Send Message Start]");
  await sendMessage(client, "@actrioutput", message, file);
  logger.info("[Listner] [Message Start Sended]");
}
