import { create } from "zustand";
import dayjs from "src/utils/dayjs";

import { SignupValues } from "src/schemas/SignupSchema";

type SignupValuesType = typeof SignupValues;

type UserState = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | undefined;
  phone: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
};

type UserActions = {
  signup: (data: SignupValuesType) => void;
};

type UserStore = UserState & UserActions;

const initialState = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastName: "",
  gender: "",
  dateOfBirth: undefined,
  phone: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  signup: (data: SignupValuesType) => set(() => data),
}));
