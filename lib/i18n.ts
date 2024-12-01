// // lib/i18n.ts
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

// import enTranslations from '../locales/en/common.json';
// import esTranslations from '../locales/es/common.json';
// import frTranslations from '../locales/fr/common.json';
// import deTranslations from '../locales/de/common.json';
// import zhTranslations from '../locales/zh/common.json';

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         common: enTranslations
//       },
//       es: {
//         common: esTranslations
//       },
//       fr: {
//         common: frTranslations
//       },
//       de: {
//         common: deTranslations
//       },
//       zh: {
//         common: zhTranslations
//       }
//     },
//     fallbackLng: 'en',
//     defaultNS: 'common',
//     debug: process.env.NODE_ENV === 'development',
//     interpolation: {
//       escapeValue: false
//     },
//     detection: {
//       order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
//       caches: ['localStorage', 'cookie'],
//     },
//     backend: {
//       loadPath: '/locales/{{lng}}/{{ns}}.json',
//     },
//   });

// export default i18n;

// //lib/i18n.ts
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// import enTranslations from '../locales/en/common.json';
// import esTranslations from '../locales/es/common.json';
// import frTranslations from '../locales/fr/common.json';
// import deTranslations from '../locales/de/common.json';
// import zhTranslations from '../locales/zh/common.json';

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { common: enTranslations },
//       es: { common: esTranslations },
//       fr: { common: frTranslations },
//       de: { common: deTranslations },
//       zh: { common: zhTranslations },
//     },
//     fallbackLng: 'en',
//     defaultNS: 'common',
//     debug: process.env.NODE_ENV === 'development',
//     interpolation: {
//       escapeValue: false, // React already protects from XSS
//     },
//     detection: {
//       order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
//       caches: ['localStorage', 'cookie'],
//     },
//   });

// export default i18n;


// lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nConfig } from './i18nConfig';

// Initialize i18n specifically for the client-side
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig);
}

export default i18n;
