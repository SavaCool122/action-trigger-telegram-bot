import { sendMessage } from "./send-message";

const END_MESSAGE = "START_MESSAGE";

export async function sendEndPost(client) {
  await sendMessage(client, "@actrioutput", END_MESSAGE);
}
