import { create } from "zustand";

type NameState = {
  name: string;
  setName: (newName: string) => void;
};

export const useStore = create<NameState>((set) => ({
  name: "Jasun",
  setName: (newName: string) => set((state) => ({ ...state, name: newName })),
}));
