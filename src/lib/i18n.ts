import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/../locales/en.json";
import hr from "@/../locales/hr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    resources: {
      en: { translation: en },
      hr: { translation: hr },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
