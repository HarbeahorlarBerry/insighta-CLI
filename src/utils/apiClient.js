import axios from "axios";
import { getAuth } from "./authStore.js";

const API_BASE = "http://localhost:5000/api/v1";

export const apiRequest = async (method, endpoint) => {
  const auth = await getAuth();

  if (!auth?.accessToken) {
    throw new Error("Not logged in. Run: insighta login");
  }

  const res = await axios({
    method,
    url: `${API_BASE}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  });

  return res.data;
};