//app/api/testimonials/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      spaceId,
      content,
      type,
      rating,
      attachedImages,
      photo,
      videoUrl,
      permissionGranted,
      extraInformation,
      videoDuration
    } = body;

    if (!spaceId || !type || permissionGranted === undefined) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
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
        attachedImages,
        videoDuration
      },
    });

    console.log('Created testimonial:', newTestimonial);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ message: 'Error creating testimonial', error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

//pages/api/testimonials.ts
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

// //pages/api/testimonials.ts -- working befor language trans
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

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
//       extraInformation
//     } = req.body;

//     if (!spaceId || !type || permissionGranted === undefined) {
//       return res.status(400).json({ message: 'Missing required fields' });
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
//         attachedImages
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
