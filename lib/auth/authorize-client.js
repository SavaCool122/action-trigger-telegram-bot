// export async function authorizeClient(client, db) {
// import { TelegramClient } from "telegram";
// import { StringSession } from "telegram/sessions";
// import readline from "readline";
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// (async () => {
//   console.log("Loading interactive example...");
//   const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });
//   await client.start({
//     phoneNumber: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter your number: ", resolve)
//       ),
//     password: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter your password: ", resolve)
//       ),
//     phoneCode: async () =>
//       new Promise((resolve) =>
//         rl.question("Please enter the code you received: ", resolve)
//       ),
//     onError: (err) => console.log(err),
//   });
//   console.log("You should now be connected.");
//   console.log(client.session.save()); // Save this string to avoid logging in again
// })();
// }
