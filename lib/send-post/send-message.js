import { Api } from "telegram";
import { generateId } from "./generate-id.js";

export async function sendMessage(client, channelName, message) {
  return await client.invoke(
    new Api.messages.SendMessage({
      peer: channelName,
      message: message,
      randomId: generateId(),
      noWebpage: true,
      noforwards: true,
    })
  );
}
