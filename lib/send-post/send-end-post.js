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

async function getOutputSet(db) {
  return await db.sMembers("output_channel_set");
}

export async function sendEndPost(client, db, logger) {
  logger.info("[Listner] [Getting data for end message]");

  const outputs = await getOutputSet(db);

  const file = await getFile(db);
  const message = await getMessage(db);

  logger.info("[Listner] [Send Message End]");
  await Promise.all(
    outputs.map(
      async (output) => await sendMessage(client, output, message, file)
    )
  );
  logger.info("[Listner] [Message End Sended]");
}
