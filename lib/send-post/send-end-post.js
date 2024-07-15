import { Api } from "telegram";
import { sendMessage } from "./send-message.js";
import { returnBigInt } from "telegram/Helpers.js";

const END_MESSAGE = "🟢 Відбій тривоги на Вінниччині";

const END_FILE = {
  id: -872540674456119680n,
  parts: 1,
  name: "alert-end.jpg",
  md5Checksum: "",
};

function getFile() {
  return new Api.InputFile({
    id: returnBigInt(END_FILE.id),
    parts: END_FILE.parts,
    name: END_FILE.name,
    md5Checksum: "",
  });
}

export async function sendEndPost(client, logger) {
  logger.info("[Listner] [Send Message End]");
  await sendMessage(client, "@actrioutput", END_MESSAGE, getFile());
  logger.info("[Listner] [Message End Sended]");
}
