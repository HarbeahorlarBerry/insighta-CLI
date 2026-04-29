import inquirer from "inquirer";
import axios from "axios";
import { saveCredentials } from "../core/authStore.js";

const API_BASE = "http://localhost:5000/api/v1";

export const login = async () => {
  try {
    console.log("Logging into Insighta...");

    const { refreshToken } = await inquirer.prompt([
      {
        type: "input",
        name: "refreshToken",
        message: "Paste your refresh token:"
      }
    ]);

    const response = await axios.post(
      `${API_BASE}/auth/refresh`,
      { token: refreshToken }
    );

    const accessToken = response.data.accessToken;

    saveCredentials({
      accessToken,
      refreshToken
    });

    console.log("Login successful");
  } catch (error) {
    console.log("Login failed");

    console.log(error.response?.data || error.message);
  }
};


// import inquirer from "inquirer";
// import axios from "axios";
// import fs from "fs";
// import os from "os";
// import path from "path";
// import { saveCredentials } from "../core/authStore";

// const API_BASE = "http://localhost:5000/api/v1";

// /**
//  * CLI LOGIN
//  * User pastes refresh token
//  * Backend returns fresh access token
//  * CLI stores both tokens locally
//  */
// export const login = async () => {
//   try {
//     console.log("Logging into Insighta...");

//     const answers = await inquirer.prompt([
//       {
//         type: "input",
//         name: "refreshToken",
//         message: "Paste your refresh token:"
//       }
//     ]);

//     /**
//      * Send refresh token to backend
//      */
//     const response = await axios.post(
//       `${API_BASE}/auth/refresh`,
//       {
//         token: answers.refreshToken
//       }
//     );

//     /**
//      * Create ~/.insighta folder
//      */
//     const dir = path.join(os.homedir(), ".insighta");

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     /**
//      * Save credentials.json
//      */
//     const credentialsPath = path.join(
//       dir,
//       "credentials.json"
//     );

//     fs.writeFileSync(
//       credentialsPath,
//       JSON.stringify(
//         {
//           accessToken: response.data.accessToken,
//           refreshToken: answers.refreshToken
//         },
//         null,
//         2
//       )
//     );

//     console.log("Login successful");
//     console.log("Credentials saved at:");
//     console.log(credentialsPath);

//   } catch (error) {
//     console.log("Login failed");

//     if (error.response?.data) {
//       console.log(error.response.data);
//     }
//   }
// };


// export const login = async () => {
//   console.log("Logging into Insighta...");

//   const inquirer = await import("inquirer");

//   const { refreshToken } = await inquirer.default.prompt([
//     {
//       type: "password",
//       name: "refreshToken",
//       message: "Paste your refresh token:"
//     }
//   ]);

//   try {
//     const res = await axios.post("http://localhost:5000/api/v1/auth/refresh", {
//       token: refreshToken
//     });

//     const accessToken = res.data.accessToken;

//     saveCredentials({
//       refreshToken,
//       accessToken
//     });

//     console.log("Login successful");
//   } catch (err) {
//     console.log("Login failed");
//   }
// };