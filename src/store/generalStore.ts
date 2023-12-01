import { create } from "zustand";

type GeneralState = {
  acceptedTerms: boolean;
  acceptedDataTreatment: boolean;
};

type GeneralActions = {};

type GeneralStore = GeneralState & GeneralActions;

const initialState = {
  acceptedTerms: false,
  acceptedDataTreatment: false,
};

export const useStore = create<GeneralStore>((set) => ({
  ...initialState,
}));
