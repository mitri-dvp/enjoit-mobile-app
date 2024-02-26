import axios from "axios";
import { accessTokenStore } from "./secureStore";
import { env } from "./env";

export const api = axios.create({ baseURL: env.EXPO_PUBLIC_API_URL });

accessTokenStore.get().then((token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
});
