import { sendMessage } from "./send-message";

const START_MESSAGE = "START_MESSAGE";

export async function sendStartPost(client) {
  await sendMessage(client, "@actrioutput", START_MESSAGE);
}
