import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MusicParts =
  | "intro"
  | "verse"
  | "chorus"
  | "instrumental"
  | "prechorus"
  | "end"
  | "lowchorus";

export type MusicType = Record<
  "id" | "name" | "band" | "cover" | MusicParts | "createdAt" | "updatedAt",
  string
>;

export type MusicStore = {
  [id: number]: MusicType;
  setMusics: (id: number, music: MusicType) => void;
  play: (id: number) => void;
  currentlyPlaying: {
    id: number | null;
  };
  drawer: boolean;
  setDrawer: (value: boolean) => void;
};

export const useMusics = create<MusicStore>()(
  persist(
    (set, get) => ({
      currentlyPlaying: {
        id: null,
        playRate: 0,
        isPlaying: false,
        loop: false,
      },
      drawer: false,
      setDrawer: (value) => {
        set({
          drawer: value,
        });
      },
      setMusics: (id, music) => {
        set({
          [id]: music,
        });
      },
      play: (id) => {
        set({
          currentlyPlaying: {
            ...get().currentlyPlaying,
            id: id,
          },
        });
      },
    }),
    {
      name: "fga-missions-miniapp-musics",
    }
  )
);
