import { create } from "zustand";

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

export const useRootStore = create<RootStore>((set) => ({
  ...initialState,
  accept: () => set({ hasAccepted: true }),
}));
