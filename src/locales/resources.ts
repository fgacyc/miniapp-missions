import en from "./translation/en.json";
import zh from "./translation/zh.json";

// 定义资源对象的类型
export type TranslationResources = {
  en: {
    translation: typeof en;
  };
  zh: {
    translation: typeof zh;
  };
};

export const resources: TranslationResources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};
