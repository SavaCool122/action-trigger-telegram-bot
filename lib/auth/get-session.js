import { StringSession } from "telegram/sessions/index.js";

export async function getSession(db) {
  const session = (await db.getSession()) || "";
  const stringSession = new StringSession(session);

  return stringSession;
}
