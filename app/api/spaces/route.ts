// // pages/api/spaces.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import { mapStringToLanguageCode, Language } from '@/types/space';
// import i18n from '@/lib/i18nServer';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const {
//       spaceName,
//       headerTitle,
//       customMessage,
//       questions,
//       collectionType,
//       collectStarRatings,
//       theme,
//       language,
//       autoTranslate,
//       extraInformationFields,
//       logo,
//       logoShape,
//       thankYouImage,
//       thankYouTitle,
//       thankYouMessage,
//       allowSocialShare,
//       redirectUrl,
//       autoReward,
//       origin,
//       maxVideoDuration,
//       maxTextCharacters,
//       videoButtonText,
//       textButtonText,
//       consentDisplay,
//       consentStatement,
//       textSubmissionTitle,
//       questionLabel,
//       customButtonColorRV,
//       customButtonColorST,
//       affiliateLink,
//       thirdPartyReviewPlatform,
//       thirdPartyReviewLink,
//       autoPopulateWallOfLove,
//       disableVideoForIphone,
//       allowSearchEngineIndexing,
//       openGraphTitle,
//       openGraphDescription,
//       openGraphImage,
//     } = req.body;

//     if (!spaceName || !headerTitle || !customMessage || !questions || !collectionType || !theme || !language || !origin) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Set the language for translations
//     const langCode = mapStringToLanguageCode(language);
//     console.log("Lang code:", langCode);
//     await i18n.changeLanguage(langCode);

//     const t = (key: string, defaultValue: string) => {
//       const translation = i18n.t(key);
//       return translation === key ? defaultValue : translation;
//     };

//     const newSpace = await prisma.space.create({
//       data: {
//         spaceName,
//         headerTitle,
//         customMessage,
//         logo,
//         logoShape,
//         collectionType,
//         collectStarRatings: Boolean(collectStarRatings),
//         theme,
//         language,
//         autoTranslate: Boolean(autoTranslate),
//         questions,
//         extraInformationFields,
//         thankYouImage,
//         thankYouTitle,//: thankYouTitle || t('preview.thankYou', 'Thank you!'),
//         thankYouMessage,//: thankYouMessage || t('preview.thankYouMessage', 'Thank you so much for your message! It means a lot to us! 🙏'),
//         allowSocialShare: Boolean(allowSocialShare),
//         redirectUrl,
//         autoReward: Boolean(autoReward),
//         maxVideoDuration: Number(maxVideoDuration) || 120,
//         maxTextCharacters: Number(maxTextCharacters) || 0,
//         videoButtonText,//: videoButtonText || t('preview.videoButtonText', 'Record video'),
//         textButtonText,//: textButtonText || t('preview.textButtonText', 'Send text'),
//         consentDisplay,//: consentDisplay || t('preview.consentDisplay', 'required'),
//         consentStatement,//: consentStatement || t('preview.consentStatement', 'I give permission to use this testimonial.'),
//         textSubmissionTitle,//: textSubmissionTitle || t('preview.textSubmissionTitle', 'Write a text testimonial for'),
//         questionLabel,//: questionLabel || t('preview.questionLabel', 'Questions'),
//         customButtonColorRV,//: customButtonColorRV || "#4F46E5",
//         customButtonColorST,//: customButtonColorST || "#6B7280",
//         affiliateLink: affiliateLink || "",
//         thirdPartyReviewPlatform,//: thirdPartyReviewPlatform || "Google",
//         thirdPartyReviewLink: thirdPartyReviewLink || "",
//         autoPopulateWallOfLove: Boolean(autoPopulateWallOfLove),
//         disableVideoForIphone: Boolean(disableVideoForIphone),
//         allowSearchEngineIndexing: Boolean(allowSearchEngineIndexing),
//         openGraphTitle: openGraphTitle || "",
//         openGraphDescription: openGraphDescription || "",
//         openGraphImage: openGraphImage || null,
//       },
//     });

//     const shareableLink = `${origin}/submit-testimonial/${newSpace.spaceName}/${newSpace.id}`;
//     const updatedSpace = await prisma.space.update({
//       where: { id: newSpace.id },
//       data: { shareableLink },
//     });

//     res.status(201).json({ newSpace: updatedSpace });
//   } catch (error) {
//     console.error('Error creating space:', error);
//     res.status(500).json({ message: 'Error creating space', error: error instanceof Error ? error.message : String(error) });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

//app/api/spaces/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { mapStringToLanguageCode, Language } from '@/types/space';
import i18n from '@/lib/i18nServer';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Ensure Prisma connects only once in development
if (process.env.NODE_ENV === 'development') {
  if (!(global as any).prisma) {
    (global as any).prisma = prisma;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      spaceName,
      headerTitle,
      customMessage,
      questions,
      collectionType,
      collectStarRatings,
      theme,
      language,
      autoTranslate,
      extraInformationFields,
      logo,
      logoShape,
      thankYouImage,
      hideImage,
      thankYouTitle,
      thankYouMessage,
      allowSocialShare,
      redirectUrl,
      autoReward,
      origin,
      maxVideoDuration,
      maxTextCharacters,
      videoButtonText,
      textButtonText,
      consentDisplay,
      consentStatement,
      textSubmissionTitle,
      videoSubmissionTitle,
      questionLabel,
      customButtonColorRV,
      customButtonColorST,
      affiliateLink,
      thirdPartyReviewPlatform,
      thirdPartyReviewLink,
      autoPopulateWallOfLove,
      disableVideoForIphone,
      allowSearchEngineIndexing,
      openGraphTitle,
      openGraphDescription,
      openGraphImage,
    } = body;

    if (!spaceName || !headerTitle || !customMessage || !questions || !collectionType || !theme || !language || !origin) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Set the language for translations
    const langCode = mapStringToLanguageCode(language);
    console.log("Lang code:", langCode);
    await i18n.changeLanguage(langCode);

    // const t = (key: string, defaultValue: string) => {
    //   const translation = i18n.t(key);
    //   return translation === key ? defaultValue : translation;
    // };

    const newSpace = await prisma.space.create({
      data: {
        spaceName,
        headerTitle,
        customMessage,
        logo,
        logoShape,
        collectionType,
        collectStarRatings: Boolean(collectStarRatings),
        theme,
        language,
        autoTranslate: Boolean(autoTranslate),
        questions,
        extraInformationFields,
        thankYouImage,
        hideImage: Boolean(hideImage),
        thankYouTitle,
        thankYouMessage,
        allowSocialShare: Boolean(allowSocialShare),
        redirectUrl,
        autoReward: Boolean(autoReward),
        maxVideoDuration: Number(maxVideoDuration) || 120,
        maxTextCharacters: Number(maxTextCharacters) || 0,
        videoButtonText,
        textButtonText,
        consentDisplay,
        consentStatement,
        textSubmissionTitle,
        videoSubmissionTitle,
        questionLabel,
        customButtonColorRV,
        customButtonColorST,
        affiliateLink: affiliateLink || "",
        thirdPartyReviewPlatform,
        thirdPartyReviewLink: thirdPartyReviewLink || "",
        autoPopulateWallOfLove: Boolean(autoPopulateWallOfLove),
        disableVideoForIphone: Boolean(disableVideoForIphone),
        allowSearchEngineIndexing: Boolean(allowSearchEngineIndexing),
        openGraphTitle: openGraphTitle || "",
        openGraphDescription: openGraphDescription || "",
        openGraphImage: openGraphImage || null,
      },
    });

    const shareableLink = `${origin}/submit-testimonial/${newSpace.spaceName}/${newSpace.id}`;
    const updatedSpace = await prisma.space.update({
      where: { id: newSpace.id },
      data: { shareableLink },
    });

    return NextResponse.json({ newSpace: updatedSpace }, { status: 201 });
  } catch (error) {
    console.error('Error creating space:', error);
    return NextResponse.json(
      { message: 'Error creating space', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}