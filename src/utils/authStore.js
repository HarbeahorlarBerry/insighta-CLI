import fs from "fs-extra";
import path from "path";
import os from "os";

const dir = path.join(os.homedir(), ".insighta");
const file = path.join(dir, "credentials.json");

export const saveAuth = async (data) => {
  await fs.ensureDir(dir);
  await fs.writeJson(file, data);
};

export const getAuth = async () => {
  if (!fs.existsSync(file)) return null;
  return await fs.readJson(file);
};

export const clearAuth = async () => {
  await fs.remove(file);
};