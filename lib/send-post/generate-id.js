export function generateId() {
  return Math.floor(Math.random() * Date.now()).toString();
}
