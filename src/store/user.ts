import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";

import type { User } from "src/models/zod";

// ForgotPassword https://github.com/strapi/strapi/blob/aa7c7ec6724534e157d8a23fe85ee8318dabbf37/packages/plugins/users-permissions/server/content-types/user/index.js#L43

type UserState = {
  user: User | null;
};

type UserActions = {
  signin: (payload: User) => void;
  logout: () => void;
  reset: () => void;
};

type UserStore = UserState & UserActions;

const initialState: UserState = {
  user: null,
};

export const useUserStore = create(
  persist(
    immer<UserStore>((set) => ({
      ...initialState,
      signin: (payload: User) => {
        set(() => ({ user: payload }));
      },
      logout: () => {
        set(() => ({ user: null }));
      },
      reset: () => {
        set((state) => ({
          ...state,
          ...initialState,
        }));
      },
    })),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
