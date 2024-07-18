import { Api } from "telegram";

export async function markChannelAsRead(client, channelName) {
  await client.invoke(
    new Api.channels.ReadHistory({
      channel: channelName,
      maxId: 0,
    })
  );
}
