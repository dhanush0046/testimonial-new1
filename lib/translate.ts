// lib/translate.ts

// import AWS from 'aws-sdk';
// import { Language, Space, CreateSpaceInput } from '@/types/space';

// console.log("Region", process.env.AWS_REGION);

// // Check if AWS region and credentials are set
// if (!process.env.AWS_REGION || !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY) {
//   console.error("Missing AWS configuration in environment variables");
// }

// AWS.config.update({
//   region: process.env.NEXT_PUBLIC_AWS_REGION,
//   accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
// });

// const translate = new AWS.Translate();

// export async function translateText(text: string, targetLanguage: Language): Promise<string> {
//   if (!text) return '';

//   const params = {
//     Text: text,
//     SourceLanguageCode: 'auto',
//     TargetLanguageCode: getLanguageCode(targetLanguage),
//   };

//   try {
//     const result = await translate.translateText(params).promise();
//     return result.TranslatedText;
//   } catch (error) {
//     console.error('Error translating text:', error);
//     return text; // Return original text if translation fails
//   }
// }

// export async function translateSpaceData(data: CreateSpaceInput, targetLanguage: Language): Promise<Partial<CreateSpaceInput>> {
//   const translatedData: Partial<CreateSpaceInput> = {};

//   translatedData.headerTitle = await translateText(data.headerTitle, targetLanguage);
//   translatedData.customMessage = await translateText(data.customMessage, targetLanguage);
//   translatedData.questions = await Promise.all(
//     data.questions.map(async (question) => ({
//       ...question,
//       content: await translateText(question.content, targetLanguage),
//     }))
//   );

//   // Translate other relevant fields
//   if (data.textSubmissionTitle) {
//     translatedData.textSubmissionTitle = await translateText(data.textSubmissionTitle, targetLanguage);
//   }
//   if (data.questionLabel) {
//     translatedData.questionLabel = await translateText(data.questionLabel, targetLanguage);
//   }
//   if (data.videoButtonText) {
//     translatedData.videoButtonText = await translateText(data.videoButtonText, targetLanguage);
//   }
//   if (data.textButtonText) {
//     translatedData.textButtonText = await translateText(data.textButtonText, targetLanguage);
//   }
//   if (data.consentStatement) {
//     translatedData.consentStatement = await translateText(data.consentStatement, targetLanguage);
//   }

//   return translatedData;
// }

// function getLanguageCode(language: Language): string {
//   switch (language) {
//     case Language.ENGLISH: return 'en';
//     case Language.SPANISH: return 'es';
//     case Language.FRENCH: return 'fr';
//     case Language.GERMAN: return 'de';
//     case Language.CHINESE: return 'zh';
//     default: return 'en';
//   }
// }