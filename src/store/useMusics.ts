import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MusicType = Record<
  | "id"
  | "name"
  | "band"
  | "cover"
  | "intro"
  | "verse"
  | "chorus"
  | "instrumental"
  | "createdAt"
  | "updatedAt",
  string
>;

export type MusicStore = {
  [id: number]: MusicType;
  setMusics: (id: number, music: MusicType) => void;
  play: (
    id: number,
    loop: boolean,
    isPlaying: boolean,
    playRate?: number
  ) => void;
  setPlayRate: (rate: number) => void;
  currentlyPlaying: {
    id: number | null;
    playRate: number;
    loop: boolean;
    isPlaying: boolean;
  };
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
      setMusics: (id, music) => {
        set({
          [id]: music,
        });
      },
      setPlayRate: (rate) => {
        set({
          currentlyPlaying: {
            ...get().currentlyPlaying,
            playRate: rate,
          },
        });
      },
      play: (id, loop, isPlaying, playRate) => {
        set({
          currentlyPlaying: {
            id: id,
            isPlaying: !get().currentlyPlaying.isPlaying ? isPlaying : false,
            loop: !get().currentlyPlaying.loop ? loop : false,
            playRate: playRate ?? 0,
          },
        });
      },
    }),
    {
      name: "fga-missions-miniapp-musics",
    }
  )
);
