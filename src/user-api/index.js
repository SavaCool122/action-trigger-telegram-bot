import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { NewMessage } from "telegram/events/index.js";
import db from "../../db/client.js";

// todo filtration for messsage

async function createClient() {
  const apiId = Number(process.env.APP_ID);
  const apiHash = process.env.API_HASH;

  const session = (await db.get(process.env.SESSION_KEY)) || "";
  const stringSession = new StringSession(session);

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  return client;
}

async function markChannelAsRead(channelName) {
  await client.invoke(
    new Api.channels.ReadHistory({
      channel: channelName,
      maxId: 0,
    })
  );
}

async function subscribeForChannelMessages(channelName, fn) {
  client.addEventHandler(async (update) => {
    await fn(update);
    await markChannelAsRead(channelName);
  }, new NewMessage({ incoming: true, chats: [channelName] }));
  console.log(`Listening for new messages in the ${channelName}`);
}

function generateId() {
  return Math.floor(Math.random() * Date.now()).toString();
}

async function sendMessage(channelName, message) {
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

async function messageHandler(update) {
  const content = update.message.message;
  const date = new Date(update.message.date).toISOString();

  console.log(`[${date}] ${content}`);

  await sendMessage("@actrioutput", `Bot Reaction: ${update.message.message}`);
}

const client = await createClient();

export async function start() {
  console.log("Starting Telegram client...");
  await client.start({
    onError: (err) => console.log(err),
  });
  await client.connect(); // This assumes you have already authenticated with .start()
  console.log("You are now connected.");

  subscribeForChannelMessages("@testingyou1", messageHandler);
}
