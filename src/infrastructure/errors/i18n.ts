import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translate from "assets/translate";

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: { ...translate }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  }, (err, t) => {
    if (err) return console.log("Something went wrong", err);
  });

export default i18next;
