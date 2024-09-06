import { create } from "zustand";

interface TabsStore {
  messageTab: string;
  setMessageTab: (value: string) => void;

  musicTab: string;
  setMusicTab: (value: string) => void;
}

export const useTabsStore = create<TabsStore>((set) => ({
  messageTab: "All",
  setMessageTab: (value) => set({ messageTab: value }),

  musicTab: "All",
  setMusicTab: (value) => set({ musicTab: value }),
}));
