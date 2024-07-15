import { Api } from "telegram";
import { sendMessage } from "./send-message.js";
import { returnBigInt } from "telegram/Helpers.js";

async function getFile(db) {
  const fileData = await db.hGetAll("end_file");
  return new Api.InputFile({
    id: returnBigInt(BigInt(fileData.id.slice(0, -1))),
    parts: Number(fileData.parts),
    name: fileData.name,
    md5Checksum: "",
  });
}

async function getMessage(db) {
  return await db.get("end_message");
}

export async function sendEndPost(client, db, logger) {
  logger.info("[Listner] [Getting data for end message]");

  const file = await getFile(db);
  const message = await getMessage(db);

  logger.info("[Listner] [Send Message End]");
  await sendMessage(client, "@actrioutput", message, file);
  logger.info("[Listner] [Message End Sended]");
}
