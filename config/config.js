import envSchema from "env-schema";
import S from "fluent-json-schema";

export function getConfig() {
  const env = envSchema({
    data: process.env,
    schema: S.object()
      .prop("MODE", S.string().required())
      .prop("APP_ID", S.number().required())
      .prop("API_HASH", S.string().required())
      .prop("BOT_TOKEN", S.string().required())
      .prop("REDIS_URL", S.string().required()),
  });

  const config = {
    app: {
      id: env.APP_ID,
      hash: env.API_HASH,
    },
    bot: {
      token: env.BOT_TOKEN,
    },
    redis: {
      url: env.REDIS_URL,
    },
    mode: env.MODE,
    prod: env.MODE === "production",
    dev: env.MODE === "development",
  };

  return config;
}
