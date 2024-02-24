import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";

type AccessToken = string;
type DeviceId = string;

const accessTokenKey = "access_token";
const deviceIdKey = "device_id";

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

export const accessTokenStore = {
  get: () => get<AccessToken>(accessTokenKey),
  remove: () => remove(accessTokenKey),
  save: (payload: AccessToken) => save(accessTokenKey, payload),
};

export const deviceIdStore = {
  get: async () => {
    const deviceId = await get<DeviceId>(deviceIdKey);
    if (!deviceId) {
      const newDeviceId = Crypto.randomUUID();
      await deviceIdStore.save(newDeviceId);
      return newDeviceId;
    }
    return deviceId;
  },
  remove: () => remove(deviceIdKey),
  save: (payload: DeviceId) => save(deviceIdKey, payload),
};
