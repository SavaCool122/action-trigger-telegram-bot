export async function sendMessage(client, channelName, message, file) {
  console.log(channelName, message, file);

  await client.sendMessage(channelName, {
    message,
    file,
  });

  // return await client.invoke(
  //   new Api.messages.SendMedia({
  //     peer: channelName,
  //     media: new Api.InputMediaUploadedPhoto({ file }),
  //     message,
  //     randomId: generateId(),
  //   })
  // );
}
