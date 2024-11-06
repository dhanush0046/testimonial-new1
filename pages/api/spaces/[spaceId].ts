// // pages/api/spaces/[spaceId].ts
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { spaceId } = req.query;

//   if (req.method === "GET") {
//     try {
//       const space = await prisma.space.findUnique({
//         where: { id: spaceId as string },
//         // select: {
//         //   id: true,
//         //   spaceName: true,
//         //   headerTitle: true,
//         //   customMessage: true,
//         //   logo: true,
//         //   logoShape: true,
//         //   shareableLink: true,
//         //   collectionType: true,
//         //   collectStarRatings: true,
//         //   theme: true,
//         //   customButtonColor: true,
//         //   language: true,
//         //   autoTranslate: true,
//         //   extraInformationFields: true,
//         //   questions: true,
//         //   createdAt: true,
//         //   updatedAt: true,
//         // },
//       });
//       console.log("space", space);
//       if (!space) {
//         return res.status(404).json({ message: "Space not found" });
//       }

//       // Ensure the logo URL is correctly formatted
//       let logoUrl = space.logo;
//       if (logoUrl && !logoUrl.startsWith('http')) {
//         logoUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${logoUrl}`;
//       }
      
//       //No need to parse `extraInformationFields` or `questions` as they're already in JSON format
//       // const parsedSpace = {
//       //   ...space,
//       //   extraInformationFields: space.extraInformationFields,  // Already an object
//       //   questions: space.quetions,  // Already an object
//       // };

//        res.status(200).json(space);
//     } catch (error) {
//       console.error("Error fetching space:", error);
//       res.status(500).json({ message: "Error fetching space", error });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

// // pages/api/spaces/[spaceId].ts
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { spaceId } = req.query;

//   if (req.method === "GET") {
//     try {
//       const space = await prisma.space.findUnique({
//         where: { id: spaceId as string },
//       });
//       console.log("space", space);
//       if (!space) {
//         return res.status(404).json({ message: "Space not found" });
//       }

//        res.status(200).json(space);
//     } catch (error) {
//       console.error("Error fetching space:", error);
//       res.status(500).json({ message: "Error fetching space", error });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }


// //pages/api/spaces/[spaceId].ts Working
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { spaceId } = req.query;

//   if (req.method === "GET") {
//     try {
//       const space = await prisma.space.findUnique({
//         where: { id: spaceId as string },
//       });

//       if (!space) {
//         return res.status(404).json({ message: "Space not found" });
//       }

//       // Ensure the logo URL is correctly formatted
//       let logoUrl = space.logo;
//       if (logoUrl && !logoUrl.startsWith('http')) {
//         logoUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${logoUrl}`;
//       }

//       // Create the parsed space object
//       const parsedSpace = {
//         ...space,
//         extraInformationFields: space.extraInformationFields,
//         logo: logoUrl,
//       };

//       res.status(200).json(parsedSpace);
//     } catch (error) {
//       console.error("Error fetching space:", error);
//       res.status(500).json({ message: "Error fetching space", error });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }


// //pages/api/spaces/[spaceId].ts GET and PUT

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { spaceId } = req.query;

  if (req.method === "GET") {
    try {
      const space = await prisma.space.findUnique({
        where: { id: spaceId as string },
      });

      if (!space) {
        return res.status(404).json({ message: "Space not found" });
      }

      const formatImageUrl = (url: string | null) => {
        if (url && !url.startsWith('http')) {
          return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${url}`;
        }
        return url;
      };


      // Create the parsed space object
      const parsedSpace = {
        ...space,
        extraInformationFields: space.extraInformationFields,
        questions: space.questions,
        logo: formatImageUrl(space.logo),
        thankYouImage: formatImageUrl(space.thankYouImage),
        openGraphImage: formatImageUrl(space.openGraphImage),
      };

      res.status(200).json(parsedSpace);
    } catch (error) {
      console.error("Error fetching space:", error);
      res.status(500).json({ message: "Error fetching space", error });
    }
  } else if (req.method === "PUT") {
    try {
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
        openGraphImage
      } = req.body;

      // Validate required fields
      if (!spaceName) {
        return res.status(400).json({ message: "Space name is required" });
      }

      // Validate other fields
      if (headerTitle && typeof headerTitle !== 'string') {
        return res.status(400).json({ message: "Invalid header title" });
      }

      if (customMessage && typeof customMessage !== 'string') {
        return res.status(400).json({ message: "Invalid custom message" });
      }

      if (questions && !Array.isArray(questions)) {
        return res.status(400).json({ message: "Invalid questions format" });
      }

      // Add more validations for other fields as needed

      // Update the space in the database
      const updatedSpace = await prisma.space.update({
        where: { id: spaceId as string },
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
      });

      const formatImageUrl = (url: string | null) => {
        if (url && !url.startsWith('http')) {
          return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${url}`;
        }
        return url;
      };

      updatedSpace.logo = formatImageUrl(updatedSpace.logo);
      updatedSpace.thankYouImage = formatImageUrl(updatedSpace.thankYouImage);
      updatedSpace.openGraphImage = formatImageUrl(updatedSpace.openGraphImage);

      const shareableLink = `${origin}/submit-testimonial/${updatedSpace.spaceName}/${updatedSpace.id}`;
      const newUpdatedSpace = await prisma.space.update({
        where: { id: updatedSpace.id },
        data: { shareableLink },
      });

      res.status(200).json({ updatedSpace });
      res.status(201).json({ updatedSpace: newUpdatedSpace });
    } catch (error) {
      console.error("Error updating space:", error);
      res.status(500).json({ message: "Error updating space", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}