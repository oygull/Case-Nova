import i18n from 'i18next';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

