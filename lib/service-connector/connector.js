export function connector(client, service, dependencies) {
  service(client, ...dependencies);
}
