import fs from "fs";
import os from "os";
import path from "path";

const dir = path.join(os.homedir(), ".insighta");
const file = path.join(dir, "credentials.json");

export const saveCredentials = (data) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

export const getCredentials = () => {
  if (!fs.existsSync(file)) return null;

  return JSON.parse(fs.readFileSync(file, "utf-8"));
};