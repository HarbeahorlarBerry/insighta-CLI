import axios from "axios";
import chalk from "chalk";
import { getAuth, clearAuth } from "../utils/authStore.js";

export const logout = async () => {
  const auth = await getAuth();

  if (!auth) {
    console.log(chalk.yellow("Not logged in"));
    return;
  }

  await axios.post("http://localhost:5000/api/v1/auth/logout", {
    token: auth.refreshToken
  });

  await clearAuth();

  console.log(chalk.green("Logged out successfully"));
};