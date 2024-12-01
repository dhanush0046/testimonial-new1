// //app/i18n.ts
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: true,
//     interpolation: {
//       escapeValue: false,
//     },
//     backend: {
//       loadPath: '/locales/{{lng}}/{{ns}}.json',
//     },
//     supportedLngs: ['en', 'es', 'fr', 'de', 'zh'],
//     ns: ['common', 'translation'],
//     defaultNS: 'common',
//   });

// export default i18n;

//app/i18n.ts
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: process.env.NODE_ENV === 'development',
//     interpolation: {
//       escapeValue: false,
//     },
//     backend: {
//       loadPath: '/locales/{{lng}}/{{ns}}.json',
//     },
//     supportedLngs: ['en', 'es', 'fr', 'de', 'zh'],
//     ns: ['common', 'translation'],
//     defaultNS: 'common',
//     react: {
//       useSuspense: false,
//     },
//   });

// // Preload language resources
// const loadResources = async () => {
//   const languages = ['en', 'es', 'fr', 'de', 'zh'];
//   const namespaces = ['common', 'translation'];

//   for (const lang of languages) {
//     for (const ns of namespaces) {
//       try {
//         const module = await import(`/public/locales/${lang}/${ns}.json`);
//         i18n.addResourceBundle(lang, ns, module.default, true, true);
//       } catch (error) {
//         console.warn(`Failed to load translation file for language ${lang} and namespace ${ns}`);
//       }
//     }
//   }
// };

// loadResources();

// export default i18n;