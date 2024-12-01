// lib/i18nServer.ts
// import i18n from 'i18next';
// import Backend from 'i18next-fs-backend';
// import { i18nConfig } from './i18nConfig';

// i18n
//   .use(Backend)
//   .init({
//     ...i18nConfig,
//     backend: {
//       loadPath: './locales/{{lng}}/{{ns}}.json',
//     },
//     detection: {
//       order: ['querystring', 'cookie'],
//       caches: ['cookie'],
//     },
//   });

// export default i18n;

//lib/i18nServer.ts
import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { i18nConfig } from './i18nConfig';
import path from 'path';

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .init({
      ...i18nConfig,
      backend: {
        loadPath: path.join(process.cwd(), 'locales', '{{lng}}', '{{ns}}.json'),
      },
      detection: {
        order: ['querystring', 'cookie'],
        caches: ['cookie'],
      },
    });
}

export default i18n;
