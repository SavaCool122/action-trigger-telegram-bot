import { Api } from "telegram";
import { sendMessage } from "./send-message.js";
import { returnBigInt } from "telegram/Helpers.js";

const START_MESSAGE = "🔴 Повітряна тривога на Вінниччині";

const START_FILE = {
  id: -8939472796202294689n,
  parts: 1,
  name: "alert-start.jpg",
  md5Checksum: "",
};

function getFile() {
  return new Api.InputFile({
    id: returnBigInt(START_FILE.id),
    parts: START_FILE.parts,
    name: START_FILE.name,
    md5Checksum: "",
  });
}

export async function sendStartPost(client, logger) {
  logger.info("[Listner] [Send Message Start]");
  await sendMessage(client, "@actrioutput", START_MESSAGE, getFile());
  logger.info("[Listner] [Message Start Sended]");
}
