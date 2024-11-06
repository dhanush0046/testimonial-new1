// //pages/api/testimonials.ts


// //pages/api/testimonials.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import { CreateTestimonialInput } from '@/types/testimonial';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const testimonialData: CreateTestimonialInput = req.body;
//   console.log('Received testimonial data:', testimonialData);

//   try {
//     const newTestimonial = await prisma.testimonial.create({
//       data: {
//         spaceId: testimonialData.spaceId,
//         content: testimonialData.content,
//         type: testimonialData.type,
//         rating: testimonialData.rating || undefined,
//         photo: testimonialData.photo || undefined,
//         videoUrl: testimonialData.videoUrl || undefined,
//         permissionGranted: testimonialData.permissionGranted,
//         extraInformation: testimonialData.extraInformation || undefined,
//       },
//     });

//     console.log('Created testimonial:', newTestimonial);
//     res.status(201).json(newTestimonial);
//   } catch (error: any) {
//     console.error('Error creating testimonial:', error);
//     res.status(500).json({ message: 'Error creating testimonial', error: error.message });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

//pages/api/testimonials.ts -- working befor language trans
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { CreateTestimonialInput, TestimonialType } from '@/types/testimonial';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      spaceId,
      content,
      type,
      rating,
      attachedImages,
      photo,
      videoUrl,
      permissionGranted,
      extraInformation
    } = req.body;

    if (!spaceId || !type || permissionGranted === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newTestimonial = await prisma.testimonial.create({
      data: {
        spaceId,
        content,
        type,
        rating,
        photo,
        videoUrl,
        permissionGranted,
        extraInformation,
        attachedImages
      },
    });

    console.log('Created testimonial:', newTestimonial);
    res.status(201).json(newTestimonial);
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Error creating testimonial', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}


// //pages/api/testimonials.ts -- Language and TestimonialType enums are not working
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient, Language, TestimonialType } from '@prisma/client';
// import AWS from 'aws-sdk';

// const prisma = new PrismaClient();

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const translate = new AWS.Translate();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const {
//       spaceId,
//       content,
//       type,
//       rating,
//       attachedImages,
//       photo,
//       videoUrl,
//       permissionGranted,
//       extraInformation,
//       language,
//     } = req.body;

//     if (!spaceId || !type || permissionGranted === undefined) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const space = await prisma.space.findUnique({ where: { id: spaceId } });

//     if (!space) {
//       return res.status(404).json({ message: 'Space not found' });
//     }

//     let translations: Record<Language, string> | undefined;

//     if (space.autoTranslate && content) {
//       translations = {} as Record<Language, string>;
//       const languages = Object.values(Language).filter(lang => lang !== language);
//       for (const lang of languages) {
//         const params = {
//           Text: content,
//           SourceLanguageCode: language,
//           TargetLanguageCode: lang,
//         };
//         const translation = await translate.translateText(params).promise();
//         translations[lang] = translation.TranslatedText;
//       }
//     }
    
//     const newTestimonial = await prisma.testimonial.create({
//       data: {
//         spaceId,
//         content,
//         type,
//         rating,
//         photo,
//         videoUrl,
//         permissionGranted,
//         extraInformation,
//         attachedImages,
//         language,
//         translations,
//       },
//     });

//     console.log('Created testimonial:', newTestimonial);
//     res.status(201).json(newTestimonial);
//   } catch (error: any) {
//     console.error('Error creating testimonial:', error);
//     res.status(500).json({ message: 'Error creating testimonial', error: error.message });
//   } finally {
//     await prisma.$disconnect();
//   }
// }