import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessageType = Record<
  "verse" | "cover" | "subtitle" | "title" | "content" | "tag",
  string
>;

export type MessageStore = {
  [id: number]: MessageType;
  setMessage: (id: number, message: MessageType) => void;
};

export const useMessages = create<MessageStore>()(
  persist(
    (set) => ({
      setMessage: (id, message) => {
        set({
          [id]: message,
        });
      },
    }),
    {
      name: "fga-missions-miniapp-messages",
    }
  )
);
