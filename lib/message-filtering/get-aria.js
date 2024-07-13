export function getAria(message) {
  const ariaName = message.split("#").at(1);
  return ariaName;
}
