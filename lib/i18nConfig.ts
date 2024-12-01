// // lib/i18nConfig.ts
// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';

// // Import your translation files
// import enTranslations from '../locales/en/common.json';
// import esTranslations from '../locales/es/common.json';
// import frTranslations from '../locales/fr/common.json';
// import deTranslations from '../locales/de/common.json';
// import zhTranslations from '../locales/zh/common.json';

// export const i18nConfig = {
//   resources: {
//     en: { common: enTranslations },
//     es: { common: esTranslations },
//     fr: { common: frTranslations },
//     de: { common: deTranslations },
//     zh: { common: zhTranslations },
//   },
//   fallbackLng: 'en',
//   defaultNS: 'common',
//   debug: process.env.NODE_ENV === 'development',
//   interpolation: {
//     escapeValue: false, // React already protects from XSS
//   },
//   detection: {
//     order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
//     caches: ['localStorage', 'cookie'],
//   },
// };

import enTranslations from '../locales/en/common.json';
import esTranslations from '../locales/es/common.json';
import frTranslations from '../locales/fr/common.json';
import deTranslations from '../locales/de/common.json';
import zhTranslations from '../locales/zh/common.json';

export const languages = ['en', 'es', 'fr', 'de', 'zh'];

export const i18nConfig = {
  resources: {
    en: { common: enTranslations },
    es: { common: esTranslations },
    fr: { common: frTranslations },
    de: { common: deTranslations },
    zh: { common: zhTranslations },
  },
  fallbackLng: 'en',
  defaultNS: 'common',
  supportedLngs: languages,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage', 'cookie'],
  },
  react: {
    useSuspense: false,
  },
};