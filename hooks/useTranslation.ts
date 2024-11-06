// // hooks/useTranslation.ts
// import { useState, useEffect } from 'react';
// import { Language } from '@/types/space';

// const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

// interface CacheItem {
//   translatedText: string;
//   timestamp: number;
// }

// export function useTranslation(text: string, language: Language) {
//   const [translatedText, setTranslatedText] = useState(text);

//   useEffect(() => {
//     const fetchTranslation = async () => {
//       const cacheKey = `translation_${text}_${language}`;
//       const cachedItem = localStorage.getItem(cacheKey);

//       if (cachedItem) {
//         const { translatedText, timestamp }: CacheItem = JSON.parse(cachedItem);
//         if (Date.now() - timestamp < CACHE_EXPIRATION) {
//           setTranslatedText(translatedText);
//           return;
//         }
//       }

//       try {
//         const response = await fetch('/api/translate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ text, targetLanguage: language }),
//         });

//         if (response.ok) {
//           const { translatedText } = await response.json();
//           setTranslatedText(translatedText);

//           const cacheItem: CacheItem = { translatedText, timestamp: Date.now() };
//           localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
//         } else {
//           console.error('Translation failed');
//         }
//       } catch (error) {
//         console.error('Error fetching translation:', error);
//       }
//     };

//     if (text && language !== Language.ENGLISH) {
//       fetchTranslation();
//     }
//   }, [text, language]);

//   return { translatedText };
// }

//hooks/useTranslation.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from '@/types/space';

const CACHE_EXPIRATION =  24 * 60 * 60 * 1000; // 24 hours

interface CacheItem {
  translatedText: string;
  timestamp: number;
}

export function useTranslation(text: string, language: Language) {
  const [translatedText, setTranslatedText] = useState(text);
  const textRef = useRef(text);
  const languageRef = useRef(language);

  const fetchTranslation = useCallback(async () => {
    const cacheKey = `translation_${textRef.current}_${languageRef.current}`;
    const cachedItem = localStorage.getItem(cacheKey);

    if (cachedItem) {
      const { translatedText, timestamp }: CacheItem = JSON.parse(cachedItem);
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        setTranslatedText(translatedText);
        return;
      }
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textRef.current, targetLanguage: languageRef.current }),
      });

      if (response.ok) {
        const { translatedText } = await response.json();
        setTranslatedText(translatedText);

        const cacheItem: CacheItem = { translatedText, timestamp: Date.now() };
        localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
      } else {
        console.error('Translation failed');
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  }, []);

  useEffect(() => {
    textRef.current = text;
    languageRef.current = language;
    if (text && language !== Language.ENGLISH) {
      fetchTranslation();
    } else {
      setTranslatedText(text);
    }
  }, [text, language, fetchTranslation]);

  return translatedText;
}