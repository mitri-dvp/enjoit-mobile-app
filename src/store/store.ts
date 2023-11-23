import { create } from "zustand";

type State = {
  state: any;
};

type Actions = {};

type Store = State & Actions;

export const useStore = create<Store>((set) => ({
  state: "state",
}));
