import { getType } from "./get-type.js";
import { getAria } from "./get-aria.js";

export function parseMessage(message) {
  const aria = getAria(message);
  const type = getType(message);

  return { aria, type };
}
