export function getRealDelay(update) {
  const now = new Date().valueOf();
  const messageTime = update.message.date;
  return now - messageTime;
}
