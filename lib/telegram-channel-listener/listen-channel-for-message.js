import { NewMessage } from "telegram/events/index.js";
import { markChannelAsRead } from "./mark-channel-as-read.js";

export async function listenChannelForMessage(client, channelName, fn) {
  client.addEventHandler(async (update) => {
    await fn(update);
    await markChannelAsRead(client, channelName);
  }, new NewMessage({ incoming: true, chats: [channelName] }));

  console.log(`Listening for new messages in the ${channelName}`);
}
