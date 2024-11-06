// //pages/api/spaces.ts working
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

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
//       customButtonColor,
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
//       autoReward
//     } = req.body;

//     if (!spaceName || !headerTitle || !customMessage || !questions || !collectionType || !theme || !language) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newSpace = await prisma.space.create({
//       data: {
//         spaceName,
//         headerTitle,
//         customMessage,
//         logo,
//         logoShape,
//         collectionType,
//         collectStarRatings: collectStarRatings === true,
//         theme: theme as 'LIGHT' | 'DARK',
//         customButtonColor: customButtonColor || '#4F46E5',
//         language,
//         autoTranslate: autoTranslate === true,
//         questions,
//         extraInformationFields,
//         thankYouImage,
//         thankYouTitle,
//         thankYouMessage,
//         allowSocialShare: allowSocialShare === true,
//         redirectUrl,
//         autoReward: autoReward === true,
//       },
//     });

//     const shareableLink = `/submit-testimonial/${newSpace.spaceName}/${newSpace.id}`;
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

// //pages/api/spaces.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

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
//       customButtonColor,
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
//       origin
      
//     } = req.body;

//     if (!spaceName || !headerTitle || !customMessage || !questions || !collectionType || !theme || !language || !origin) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newSpace = await prisma.space.create({
//       data: {
//         spaceName,
//         headerTitle,
//         customMessage,
//         logo,
//         logoShape,
//         collectionType,
//         collectStarRatings: collectStarRatings === true,
//         theme: theme as 'LIGHT' | 'DARK',
//         customButtonColor: customButtonColor || '#4F46E5',
//         language,
//         autoTranslate: autoTranslate === true,
//         questions,
//         extraInformationFields,
//         thankYouImage,
//         thankYouTitle,
//         thankYouMessage,
//         allowSocialShare: allowSocialShare === true,
//         redirectUrl,
//         autoReward: autoReward === true,
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


//  //pages/api/spaces.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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
    } = req.body;

    if (!spaceName || !headerTitle || !customMessage || !questions || !collectionType || !theme || !language || !origin) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

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
        thankYouTitle : thankYouTitle || "Thank you!",
        thankYouMessage : thankYouMessage || "Thank you so much for your shoutout! It means a ton for us! 🙏",
        allowSocialShare: Boolean(allowSocialShare),
        redirectUrl,
        autoReward: Boolean(autoReward),
        maxVideoDuration: Number(maxVideoDuration) || 120,
        maxTextCharacters: Number(maxTextCharacters) || 0,
        videoButtonText: videoButtonText || "Record a video",
        textButtonText: textButtonText || "Send in text",
        consentDisplay: consentDisplay || "required",
        consentStatement: consentStatement || "I give permission to use this testimonial.",
        textSubmissionTitle: textSubmissionTitle || "Write text testimonial to",
        questionLabel: questionLabel || "Questions",
        customButtonColorRV: customButtonColorRV || "#4F46E5",
        customButtonColorST: customButtonColorST || "#6B7280",
        affiliateLink: affiliateLink || "",
        thirdPartyReviewPlatform: thirdPartyReviewPlatform || "Google",
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

    res.status(201).json({ newSpace: updatedSpace });
  } catch (error) {
    console.error('Error creating space:', error);
    res.status(500).json({ message: 'Error creating space', error: error instanceof Error ? error.message : String(error) });
  } finally {
    await prisma.$disconnect();
  }
}