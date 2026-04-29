import chalk from "chalk";
import { getCredentials } from "../core/authStore.js";

export const whoami = async () => {
  const auth = getCredentials();

  if (!auth || !auth.accessToken) {
    console.log(chalk.red("Not logged in"));
    return;
  }

  console.log(chalk.green("Current Session:"));
  console.log({
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken
  });
};


// import chalk from "chalk";
// import { getCredentials } from "../core/authStore.js";

// export const whoami = async () => {
//   const auth = getCredentials();

//   if (!auth || !auth.accessToken) {
//     console.log(chalk.red("Not logged in"));
//     return;
//   }

//   console.log(chalk.green("Current Session:"));
//   console.log({
//     accessToken: auth.accessToken,
//     refreshToken: auth.refreshToken
//   });
// };