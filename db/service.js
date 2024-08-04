export function createDBService(dbClient) {
  return {
    async getSession() {
      return dbClient.get("session");
    },
    async getAllOutputChannels() {
      return await dbClient.sMembers("channels:output");
    },
    async getChannelsWithData(channels) {
      return await Promise.all(
        channels.map(async (name) => await dbClient.hGetAll(name))
      );
    },
    async getSource() {
      return dbClient.get("channels:input");
    },
    async getSearchAria() {
      return dbClient.get("channels:input:aria");
    },
  };
}
