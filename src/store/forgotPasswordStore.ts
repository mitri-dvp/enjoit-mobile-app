import { create } from "zustand";
import dayjs from "src/utils/dayjs";

import { SignupValues } from "src/schemas/SignupSchema";
import { LoginValues } from "src/schemas/LoginSchema";

type ForgotPasswordState = {
  step: "step-1" | "step-2" | "step-3";
  data: {
    phone?: string;
    email?: string;
  };
};

type ForgotPasswordActions = {
  goToStep: (step: "step-1" | "step-2" | "step-3") => void;
  updatePhone: (value: string) => void;
  updateEmail: (value: string) => void;
  reset: () => void;
};

type ForgotPasswordStore = ForgotPasswordState & ForgotPasswordActions;

const initialState: ForgotPasswordState = {
  step: "step-1",
  data: {},
};

export const useForgotPasswordStore = create<ForgotPasswordStore>((set) => ({
  ...initialState,
  goToStep: (step) => set({ step: step }),
  updatePhone: (value) =>
    set((state) => ({
      ...state,
      data: { ...state.data, phone: value },
    })),
  updateEmail: (value) =>
    set((state) => ({
      ...state,
      data: { ...state.data, email: value },
    })),
  reset: () => set((state) => initialState),
}));
