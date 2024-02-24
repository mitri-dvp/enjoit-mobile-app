import axios from "axios";
import { accessTokenStore } from "./secureStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({ baseURL: API_URL });

accessTokenStore.get().then((token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
});
