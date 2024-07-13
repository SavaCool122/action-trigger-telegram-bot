import { sendMessage } from "../send-post/send-message.js";
import { listenChannelForMessage } from "./listen-channel-for-message.js";

export async function telegramChannelUpdateListner(client, logger) {
  listenChannelForMessage(
    client,
    "@testingyou1",
    async (update) => {
      await sendMessage(
        client,
        "@actrioutput",
        `Bot Reaction: ${update.message.message}`
      );
    },
    logger
  );
}
