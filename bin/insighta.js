#!/usr/bin/env node

import { login } from "../src/commands/login.js";
import { logout } from "../src/commands/logout.js";
import { whoami } from "../src/commands/whoami.js";
import { requestCommand } from "../src/commands/request.js";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "login":
    login();
    break;

  case "logout":
    logout();
    break;

  case "whoami":
    whoami();
    break;

  case "request":
    requestCommand(args[1]);
    break;

  default:
    console.log("Usage:");
    console.log("insighta login");
    console.log("insighta logout");
    console.log("insighta whoami");
    console.log("insighta request <endpoint>");
}