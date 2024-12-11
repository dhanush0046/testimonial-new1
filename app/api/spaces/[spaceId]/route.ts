// // pages/api/spaces/[spaceId].ts
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";
// import { mapStringToLanguageCode } from "@/types/space";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { spaceId } = req.query;

//   // Helper function to format S3 image URLs
//   const formatImageUrl = (url: string | null) => {
//     if (url && !url.startsWith("http")) {
//       return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${url}`;
//     }
//     return url;
//   };

//   // Retry function for Prisma operations to handle timeout errors
//   async function prismaRetry(operation: () => Promise<any>, retries: number = 3): Promise<any> {
//     while (retries > 0) {
//       try {
//         return await operation();
//       } catch (error) {
//         console.error("Prisma operation failed, retrying...", error);
//         retries -= 1;
//         if (retries === 0) throw error;
//         await new Promise((res) => setTimeout(res, 1000)); // wait 1 second before retrying
//       }
//     }
//   }

//   if (req.method === "GET") {
//     try {
//       const space = await prismaRetry(() =>
//         prisma.space.findUnique({ where: { id: spaceId as string } })
//       );

//       if (!space) {
//         return res.status(404).json({ message: "Space not found" });
//       }

//       const parsedSpace = {
//         ...space,
//         extraInformationFields: space.extraInformationFields,
//         questions: space.questions,
//         logo: formatImageUrl(space.logo),
//         thankYouImage: formatImageUrl(space.thankYouImage),
//         openGraphImage: formatImageUrl(space.openGraphImage),
//         language: mapStringToLanguageCode(space.language) // Map language code here
//       };

//       res.status(200).json(parsedSpace);
//     } catch (error) {
//       console.error("Error fetching space:", error);
//       res.status(500).json({ message: "Error fetching space", error });
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const {
//         spaceName,
//         headerTitle,
//         customMessage,
//         questions,
//         logo,
//         logoShape,
//         collectionType,
//         collectStarRatings,
//         theme,
//         language,
//         autoTranslate,
//         extraInformationFields,
//         thankYouImage,
//         thankYouTitle,
//         thankYouMessage,
//         allowSocialShare,
//         redirectUrl,
//         autoReward,
//         origin,
//         maxVideoDuration,
//         maxTextCharacters,
//         videoButtonText,
//         textButtonText,
//         consentDisplay,
//         consentStatement,
//         textSubmissionTitle,
//         questionLabel,
//         customButtonColorRV,
//         customButtonColorST,
//         affiliateLink,
//         thirdPartyReviewPlatform,
//         thirdPartyReviewLink,
//         autoPopulateWallOfLove,
//         disableVideoForIphone,
//         allowSearchEngineIndexing,
//         openGraphTitle,
//         openGraphDescription,
//         openGraphImage
//       } = req.body;

//       if (!spaceName) {
//         return res.status(400).json({ message: "Space name is required" });
//       }

//       // Perform update with retry mechanism
//       const updatedSpace = await prismaRetry(() =>
//         prisma.space.update({
//           where: { id: spaceId as string },
//           data: {
//             spaceName,
//             headerTitle,
//             customMessage,
//             questions,
//             logo,
//             logoShape,
//             collectionType,
//             collectStarRatings,
//             theme,
//             language,
//             autoTranslate,
//             extraInformationFields,
//             thankYouImage,
//             thankYouTitle,
//             thankYouMessage,
//             allowSocialShare,
//             redirectUrl,
//             autoReward,
//             maxVideoDuration,
//             maxTextCharacters,
//             videoButtonText,
//             textButtonText,
//             consentDisplay,
//             consentStatement,
//             textSubmissionTitle,
//             questionLabel,
//             customButtonColorRV,
//             customButtonColorST,
//             affiliateLink,
//             thirdPartyReviewPlatform,
//             thirdPartyReviewLink,
//             autoPopulateWallOfLove,
//             disableVideoForIphone,
//             allowSearchEngineIndexing,
//             openGraphTitle,
//             openGraphDescription,
//             openGraphImage,
//           },
//         })
//       );

//       // Format URLs
//       updatedSpace.logo = formatImageUrl(updatedSpace.logo);
//       updatedSpace.thankYouImage = formatImageUrl(updatedSpace.thankYouImage);
//       updatedSpace.openGraphImage = formatImageUrl(updatedSpace.openGraphImage);

//       // Update shareable link
//       const shareableLink = `${origin}/submit-testimonial/${updatedSpace.spaceName}/${updatedSpace.id}`;
//       const newUpdatedSpace = await prismaRetry(() =>
//         prisma.space.update({
//           where: { id: updatedSpace.id },
//           data: { shareableLink },
//         })
//       );

//       res.status(200).json({ updatedSpace: newUpdatedSpace });
//     } catch (error) {
//       console.error("Error updating space:", error);
//       res.status(500).json({ message: "Error updating space", error });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

//app/space/[spaceId]/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { mapStringToLanguageCode } from "@/types/space";

// Helper function to format S3 image URLs
const formatImageUrl = (url: string | null) => {
  if (url && !url.startsWith("http")) {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${url}`;
  }
  return url;
};

// Retry function for Prisma operations to handle timeout errors
async function prismaRetry(operation: () => Promise<any>, retries: number = 3): Promise<any> {
  while (retries > 0) {
    try {
      return await operation();
    } catch (error) {
      console.error("Prisma operation failed, retrying...", error);
      retries -= 1;
      if (retries === 0) throw error;
      await new Promise((res) => setTimeout(res, 1000)); // wait 1 second before retrying
    }
  }
}

export async function GET(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  const spaceId = params.spaceId;

  try {
    const space = await prismaRetry(() =>
      prisma.space.findUnique({ where: { id: spaceId } })
    );

    if (!space) {
      return NextResponse.json({ message: "Space not found" }, { status: 404 });
    }

    const parsedSpace = {
      ...space,
      extraInformationFields: space.extraInformationFields,
      questions: space.questions,
      logo: formatImageUrl(space.logo),
      thankYouImage: formatImageUrl(space.thankYouImage),
      openGraphImage: formatImageUrl(space.openGraphImage),
      language: mapStringToLanguageCode(space.language)
    };

    return NextResponse.json(parsedSpace);
  } catch (error) {
    console.error("Error fetching space:", error);
    return NextResponse.json({ message: "Error fetching space", error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  const spaceId = params.spaceId;
  const body = await request.json();

  const {
    spaceName,
    headerTitle,
    customMessage,
    questions,
    logo,
    logoShape,
    collectionType,
    collectStarRatings,
    theme,
    language,
    autoTranslate,
    extraInformationFields,
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
    openGraphImage
  } = body;

  if (!spaceName) {
    return NextResponse.json({ message: "Space name is required" }, { status: 400 });
  }

  try {
    const updatedSpace = await prismaRetry(() =>
      prisma.space.update({
        where: { id: spaceId },
        data: {
          spaceName,
          headerTitle,
          customMessage,
          questions,
          logo,
          logoShape,
          collectionType,
          collectStarRatings,
          theme,
          language,
          autoTranslate,
          extraInformationFields,
          thankYouImage,
          hideImage,
          thankYouTitle,
          thankYouMessage,
          allowSocialShare,
          redirectUrl,
          autoReward,
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
        },
      })
    );

    updatedSpace.logo = formatImageUrl(updatedSpace.logo);
    updatedSpace.thankYouImage = formatImageUrl(updatedSpace.thankYouImage);
    updatedSpace.openGraphImage = formatImageUrl(updatedSpace.openGraphImage);

    const shareableLink = `${origin}/submit-testimonial/${updatedSpace.spaceName}/${updatedSpace.id}`;
    const newUpdatedSpace = await prismaRetry(() =>
      prisma.space.update({
        where: { id: updatedSpace.id },
        data: { shareableLink },
      })
    );

    return NextResponse.json({ updatedSpace: newUpdatedSpace });
  } catch (error) {
    console.error("Error updating space:", error);
    return NextResponse.json({ message: "Error updating space", error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  const spaceId = params.spaceId;

  try {
    // Start a transaction to ensure all related data is deleted
    await prisma.$transaction(async (tx) => {
      // Delete all testimonials associated with the space
      await tx.testimonial.deleteMany({
        where: { spaceId: spaceId },
      });

      // Delete the Wall of Love settings associated with the space
      await tx.wallOfLoveSettings.deleteMany({
        where: { spaceId: spaceId },
      });

      // Delete any other related data (e.g., tags, extra settings)
      await tx.tag.deleteMany({
        where: { spaceId: spaceId },
      });

      // Finally, delete the space itself
      await tx.space.delete({
        where: { id: spaceId },
      });
    });

    return NextResponse.json({ message: 'Space and related data deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting space:', error);
    return NextResponse.json({ error: 'Failed to delete space' }, { status: 500 });
  }
}