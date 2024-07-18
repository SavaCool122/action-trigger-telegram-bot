import { END_MARKER, PARTIAL_MARKER, START_MARKER } from "./constants.js";
import { isType } from "./is-type.js";

export function getType(message) {
  if (isType(message, START_MARKER)) return "START";
  if (isType(message, END_MARKER)) return "END";
  if (isType(message, PARTIAL_MARKER)) return "PARTIAL";
  return "UNKNOWN";
}
