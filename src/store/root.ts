import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";

type RootState = {
  acceptedTerms: boolean;
  acceptedDataTreatment: boolean;
  hasAccepted: boolean;
};

type RootActions = {
  accept: () => void;
};

type RootStore = RootState & RootActions;

const initialState = {
  acceptedTerms: false,
  acceptedDataTreatment: false,
  hasAccepted: false,
};

export const useRootStore = create(
  persist(
    immer<RootStore>((set) => ({
      ...initialState,
      accept: () => set({ hasAccepted: true }),
    })),
    {
      name: "root",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
