import * as SecureStore from "expo-secure-store";

import type { User } from "src/models/zod";
type AccessToken = string;

const userKey = "user";
const accessTokenKey = "access_token";

const get = async <T>(key: string): Promise<T | null> => {
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
};

const remove = async (key: string) => {
  return await SecureStore.deleteItemAsync(key);
};

const save = async <T>(key: string, value: T) => {
  return await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getAccessToken = () => get<AccessToken>(accessTokenKey);
export const removeAccessToken = () => remove(accessTokenKey);
export const saveAccessToken = (payload: AccessToken) =>
  save(accessTokenKey, payload);
