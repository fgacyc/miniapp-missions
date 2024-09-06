import { create } from "zustand";

interface TabsStore {
    isDarkMode: boolean;
    toggleDarkMode: () => void;

    messageTab : string,
    setMessageTab: (value: string) => void;

    musicTab : string,
    setMusicTab: (value: string) => void;
}

export const useTabsStore = create<TabsStore>((set) => ({
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

    messageTab: "All",
    setMessageTab: (value) => set({ messageTab: value }),

    musicTab: "All",
    setMusicTab: (value) => set({ musicTab: value }),
}));
