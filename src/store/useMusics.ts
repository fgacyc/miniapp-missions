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
    paused: boolean;
  };
  drawer: boolean;
  setDrawer: (value: boolean) => void;
  setPaused: (paused: boolean) => void;
};

export const useMusics = create<MusicStore>()(
  persist(
    (set, get) => ({
      currentlyPlaying: {
        id: null,
        paused: true,
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
      setPaused: (paused) => {
        set({
          currentlyPlaying: {
            id: get().currentlyPlaying.id,
            paused: paused,
          },
        });
      },
      play: (id) => {
        set({
          currentlyPlaying: {
            paused: get().currentlyPlaying.paused,
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
