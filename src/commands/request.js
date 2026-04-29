import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";

const API_BASE = "http://localhost:5000/api/v1";

export const requestCommand = async (endpoint) => {
  try {
    if (!endpoint) {
      console.log("Please provide an endpoint");
      return;
    }

    const credentialsPath = path.join(
      os.homedir(),
      ".insighta",
      "credentials.json"
    );

    if (!fs.existsSync(credentialsPath)) {
      console.log("Not logged in. Run: insighta login");
      return;
    }

    const credentials = JSON.parse(
      fs.readFileSync(credentialsPath, "utf-8")
    );

    const accessToken = credentials.accessToken;

    const response = await axios.get(
      `${API_BASE}/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log("Response:");
    console.log(response.data);

  } catch (error) {
    console.log("Request failed");

    if (error.response?.data) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};


// import axios from "axios";
// import fs from "fs";
// import os from "os";
// import path from "path";
// import { apiRequest } from "../core/apiClient";
// import { log } from "console";

// const API_BASE = "http://localhost:5000/api/v1";

// /**
//  * Generic API Request Command
//  * Example:
//  * insighta request profiles
//  * insighta request profiles/me
//  */
// export const requestCommand = async (endpoint) => {
//   try {
//     if (!endpoint) {
//       console.log("Please provide an endpoint");
//       return;
//     }

//     /**
//      * Read saved credentials
//      */
//     const credentialsPath = path.join(
//       os.homedir(),
//       ".insighta",
//       "credentials.json"
//     );

//     if (!fs.existsSync(credentialsPath)) {
//       console.log("You are not logged in.");
//       console.log("Run: insighta login");
//       return;
//     }

//     const credentials = JSON.parse(
//       fs.readFileSync(credentialsPath, "utf-8")
//     );

//     const accessToken = credentials.accessToken;

//     if (!accessToken) {
//       console.log("Access token missing.");
//       console.log("Please login again.");
//       return;
//     }

//     const url = `${API_BASE}/${endpoint}`;

//     console.log(`Calling API: ${endpoint}`);

//     /**
//      * Send authenticated request
//      */
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     });

//     console.log("Response:");
//     console.log(response.data);

//   } catch (error) {
//     console.log("Request failed");

//     if (error.response?.data) {
//       console.log(error.response.data);
//     } else {
//       console.log(error.message);
//     }
//   }
// };

// export const request = async (endpoint) => {
//   try {
//     console.log(`Calling API: ${endpoint}`);

//     const reponse = await apiRequest( endpoint);

//     console.log("Response:");
//     console.log(reponse);
//   } catch (error) {
//     console.log("Request failed");
//     console.log(error);
//     }
// }