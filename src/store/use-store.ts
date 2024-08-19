import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import i18n from "../locales/i18n";

export type User = {
  sub: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

export type Decoded = {
  email: string;
  role: string;
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
};

function extractTokenAndLanguage(url: string) {
  const regex = /token=([^&]+).*?&language=([^&]+)/;

  const match = url.match(regex);

  if (match) {
    const token = match[1];
    const language = match[2];
    return { token, language };
  } else {
    return { token: null, language: null };
  }
}

interface UserStore {
  token: string | null;
  user: User | null;
  UID: string | null;
  language: string;
  initUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  token: null,
  user: null,
  UID: null,
  language: "en",
  initUser: async () => {
    const currentUrl: string = window.location.href;
    const { token, language } = extractTokenAndLanguage(currentUrl);
    if (!token) return;
    set({ token: token });
    if (language) set({ language: language });
    await i18n.changeLanguage(language);
    const decodedData: Decoded = jwtDecode(token);
    if (!decodedData) return;
    set({ UID: decodedData.sub });
    const domain = decodedData.aud[1];
    if (!domain) return;
    const response = await fetch(domain, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response.json()) as User;
    // console.log("data", data)
    set({ user: data });
  },
}));
