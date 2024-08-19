import { create } from "zustand";

interface SettingsStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  radioValue: number | string;
  setRadioValue: (value: SettingsStore["radioValue"]) => void;

  inputValue: string;
  setInputValue: (value: SettingsStore["inputValue"]) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  radioValue: 2,
  setRadioValue: (value) => set({ radioValue: value }),

  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
}));
