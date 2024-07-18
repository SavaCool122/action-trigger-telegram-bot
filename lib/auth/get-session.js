import { StringSession } from "telegram/sessions/index.js";

export async function getSession(db) {
  const session = (await db.get("session")) || "";
  const stringSession = new StringSession(session);

  return stringSession;
}
