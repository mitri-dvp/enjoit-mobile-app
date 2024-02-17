import {
  LoginModelType,
  SignupModelType,
  FPIdentifierType,
} from "src/models/zod/auth";

import type { User } from "src/models/zod";

import { api } from "src/utils/http";
import { removeAccessToken, saveAccessToken } from "src/utils/secureStore";

import { useUserStore } from "src/store/user";

export const signupUser = async (payload: SignupModelType) => {
  const res = await api.post<{ user: User; accessToken: string }>(
    "/auth/signup",
    payload
  );

  // Success
  await saveAccessToken(res.data.accessToken);

  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${res.data.accessToken}`;

  useUserStore.getState().signin(res.data.user);
};

export const loginUser = async (payload: LoginModelType) => {
  const res = await api.post<{ user: User; accessToken: string }>(
    "/auth/login",
    payload
  );

  // Success
  await saveAccessToken(res.data.accessToken);

  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${res.data.accessToken}`;

  useUserStore.getState().signin(res.data.user);
};

export const logoutUser = async () => {
  await removeAccessToken();

  api.defaults.headers.common["Authorization"] = ``;

  useUserStore.getState().logout();
};

export const getFPConfirmationCode = async (identifier: FPIdentifierType) => {
  // TO-DO #1 send resetPasswordToken to identifier (phone | email)
  const res = await api.get<{
    confirmationCode: string;
  }>("/auth/forgot-password/confirm-code", {
    params: { identifier: identifier.value },
  });

  return res.data;
};

export const validateFPConfirmationCode = async ({
  identifier,
  confirmationCode,
}: {
  identifier: FPIdentifierType;
  confirmationCode: string;
}) => {
  const res = await api.post("/auth/forgot-password/confirm-code", {
    identifier: identifier.value,
    confirmationCode,
  });

  return res.data;
};

export const changePassword = async ({
  identifier,
  confirmationCode,
  newPassword,
}: {
  identifier: FPIdentifierType;
  confirmationCode: string;
  newPassword: string;
}) => {
  const res = await api.post("/auth/change-password", {
    identifier: identifier.value,
    confirmationCode,
    newPassword,
  });

  return res.data;
};
