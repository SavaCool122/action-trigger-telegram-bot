import { Api } from "telegram";
import { returnBigInt } from "telegram/Helpers.js";

export async function getCachedFile(db) {
  // you need start scripts/upload-file before using this function
  const fileData = await db.hGetAll(""); // get data about cached file
  return new Api.InputFile({
    id: returnBigInt(BigInt(fileData.id.slice(0, -1))),
    parts: Number(fileData.parts),
    name: fileData.name,
    md5Checksum: "",
  });
}
