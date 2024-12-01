// // pages/api/translate.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import AWS from 'aws-sdk';

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const translate = new AWS.Translate();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { text, targetLanguage } = req.body;

//     try {
//       const params = {
//         Text: text,
//         SourceLanguageCode: 'auto',
//         TargetLanguageCode: targetLanguage,
//       };

//       const translation = await translate.translateText(params).promise();
//       res.status(200).json({ translatedText: translation.TranslatedText });
//     } catch (error) {
//       console.error('Translation error:', error);
//       res.status(500).json({ error: 'Translation failed' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

//pages/api/translate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";
import { Language } from '@/types/space';

// Initialize the AWS Translate client
const translateClient = new TranslateClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

function getLanguageCode(language: Language): string {
  switch (language) {
    case Language.ENGLISH:
      return 'en';
    case Language.SPANISH:
      return 'es';
    case Language.FRENCH:
      return 'fr';
    case Language.GERMAN:
      return 'de';
    case Language.CHINESE:
      return 'zh';
    default:
      return 'en';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { text, sourceLanguage, targetLanguage } = req.body;

  if (!text || !sourceLanguage || !targetLanguage) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const params = {
      Text: text,
      SourceLanguageCode: getLanguageCode(sourceLanguage as Language),
      TargetLanguageCode: getLanguageCode(targetLanguage as Language),
    };

    const command = new TranslateTextCommand(params);
    const response = await translateClient.send(command);

    console.log("Response:", response);
    console.log("TranslatedText:", response.TranslatedText);
    if (response.TranslatedText) {
      res.status(200).json({ translatedText: response.TranslatedText });
    } else {
      throw new Error('Translation failed');
    }
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ message: 'Error translating text', error: (error as Error).message });
  }
}