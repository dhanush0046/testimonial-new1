// // hooks/useTranslation.ts
// import { useState, useEffect } from 'react';
// import { Language } from '@/types/space';
// import { translateText } from '@/lib/api';

// export function useTranslation(text: string, language: Language) {
//   const [translatedText, setTranslatedText] = useState(text);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const translate = async () => {
//       if (language === Language.ENGLISH) {
//         setTranslatedText(text);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const result = await translateText(text, Language.ENGLISH, language);
//         setTranslatedText(result);
//       } catch (err) {
//         setError('Translation failed');
//         console.error('Translation error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     translate();
//   }, [text, language]);

//   return { translatedText, isLoading, error };
// }



// // hooks/useTranslation.ts
// import { useTranslation as useI18nTranslation } from 'react-i18next';
// import i18n from '@/app/i18n';

// export function useTranslation(namespace: string = 'common') {
//   const { t } = useI18nTranslation(namespace);

//   return {
//     t,
//     i18n,
//     changeLanguage: (lang: string) => i18n.changeLanguage(lang),
//   };
// }

// hooks/useTranslation.ts
// import { useTranslation as useI18nTranslation } from 'react-i18next';
// import i18n from '@/app/i18n';

// export function useTranslation(namespace: string = 'common') {
//   const { t } = useI18nTranslation(namespace);

//   return {
//     t,
//     i18n,
//     changeLanguage: (lang: string) => i18n.changeLanguage(lang),
//   };
// }

// // hooks/useTranslation.ts --fff
// import { useTranslation as useI18nTranslation } from 'react-i18next';
// import i18n from '@/app/i18n';

// export function useTranslation(namespace: string = 'common') {
//   const { t } = useI18nTranslation(namespace);

//   const changeLanguage = (lang: string) => {
//     const normalizedLang = lang.toLowerCase();
//     const supportedLngs = i18n.options.supportedLngs;
//     if (Array.isArray(supportedLngs) && supportedLngs.includes(normalizedLang)) {
//       return i18n.changeLanguage(normalizedLang);
//     } else {
//       console.warn(`Language ${lang} is not supported. Falling back to default language.`);
//       return i18n.changeLanguage(i18n.options.fallbackLng as string);
//     }
//   };

//   return {
//     t,
//     i18n,
//     changeLanguage,
//   };
// }