import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, TranslationResources } from "./resources";

// 定义 i18n 的配置类型
interface I18nConfig {
  resources: TranslationResources;
  lng: string;
  interpolation: {
    escapeValue: boolean;
  };
}

const i18nConfig: I18nConfig = {
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(initReactI18next)
  .init(i18nConfig)
  .then(() => console.log("i18n initialized"))
  .catch((e) => console.error("i18n error", e));

export default i18n;
