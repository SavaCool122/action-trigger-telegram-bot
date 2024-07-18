import { CustomFile } from "telegram/client/uploads.js";
import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { createClient } from "../lib/server.js";
import { getDBClient } from "../db/client.js";
import { getConfig } from "../config/config.js";
import { createLogger } from "../logger/logger.js";

async function uploadFile(client, filePath) {
  const fileFullPath = path.join(import.meta.dirname, filePath);
  const fileStat = await fs.stat(fileFullPath);

  const toUpload = new CustomFile(
    path.basename(filePath),
    fileStat.size,
    fileFullPath
  );

  const uploadedFile = await client.uploadFile({
    file: toUpload,
    onProgress: (progress) => console.log(progress),
  });

  return uploadedFile;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getFilePath() {
  return new Promise((resolve) => {
    rl.question("Please enter file path: ", resolve);
  });
}

(async () => {
  const config = getConfig();

  const logger = createLogger();
  const db = await getDBClient(config, logger);

  const client = await createClient(db, config, logger);

  const filePath = await getFilePath();

  const file = await uploadFile(client, filePath);
  console.log("[Upload] uploadedFile: ", file);
})();
