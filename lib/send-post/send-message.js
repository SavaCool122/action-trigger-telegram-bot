import { Api } from "telegram";
import { generateId } from "./generate-id.js";

export async function sendMessage(client, channelName, message, file) {
  return await client.invoke(
    new Api.messages.SendMedia({
      peer: channelName,
      media: new Api.InputMediaUploadedPhoto({ file }),
      message,
      randomId: generateId(),
    })
  );
}
