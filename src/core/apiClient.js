import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";

const API_BASE = "http://localhost:5000/api/v1";

const credentialPath = path.join(
  os.homedir(),
  ".insighta",
  "credentials.json"
);

/**
 * Read stored credentials
 */
function getCredentials() {
  if (!fs.existsSync(credentialPath)) return null;
  return JSON.parse(fs.readFileSync(credentialPath, "utf-8"));
}

/**
 * Save updated credentials
 */
function saveCredentials(data) {
  fs.writeFileSync(
    credentialPath,
    JSON.stringify(data, null, 2)
  );
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(refreshToken) {
  const res = await axios.post(`${API_BASE}/auth/refresh`, {
    token: refreshToken
  });

  return res.data.accessToken;
}

/**
 * MAIN REQUEST ENGINE (AUTO REFRESH)
 */
export async function apiRequest(endpoint, method = "GET", data = null) {
  let creds = getCredentials();

  if (!creds) {
    throw new Error("Not logged in");
  }

  try {
    // FIRST REQUEST
    const response = await axios({
      url: `${API_BASE}/${endpoint}`,
      method,
      data,
      headers: {
        Authorization: `Bearer ${creds.accessToken}`
      }
    });

    return response.data;

  } catch (error) {

    // IF TOKEN EXPIRED → AUTO REFRESH
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(
          creds.refreshToken
        );

        creds.accessToken = newAccessToken;
        saveCredentials(creds);

        // RETRY REQUEST
        const retry = await axios({
          url: `${API_BASE}/${endpoint}`,
          method,
          data,
          headers: {
            Authorization: `Bearer ${newAccessToken}`
          }
        });

        return retry.data;

      } catch (refreshError) {
        throw new Error("Session expired. Please login again.");
      }
    }

    throw error.response?.data || error.message;
  }
}