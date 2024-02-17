import axios from "axios";
import { getAccessToken } from "./secureStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({ baseURL: API_URL });

getAccessToken().then((token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
});
