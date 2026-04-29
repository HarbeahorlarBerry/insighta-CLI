import axios from "axios";
import { getCredentials, saveCredentials } from "./authStore.js";

const API_BASE = "http://localhost:5000/api/v1";

/**
 * Get new access token using refresh token
 */
export const refreshAccessToken = async () => {
  const creds = getCredentials();

  if (!creds?.refreshToken) {
    throw new Error("No refresh token found. Please login again.");
  }

  const res = await axios.post(`${API_BASE}/auth/refresh`, {
    token: creds.refreshToken
  });

  const newAccessToken = res.data.accessToken;

  saveCredentials({
    ...creds,
    accessToken: newAccessToken
  });

  return newAccessToken;
};