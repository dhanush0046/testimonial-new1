// //app/api/testimonials/[testimonialId].route.ts

// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import { Testimonial, ExtraInformationItem } from '@/types/testimonial';

// const prisma = new PrismaClient();

// export async function GET(
//   request: Request,
//   { params }: { params: { testimonialId: string } }
// ) {
//   const testimonialId = params.testimonialId;

//   if (!testimonialId) {
//     return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });
//   }

//   try {
//     const testimonialData = await prisma.testimonial.findUnique({
//       where: { id: testimonialId },
//     });

//     if (!testimonialData) {
//       return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
//     }

//     const formattedTestimonial: Testimonial = {
//       ...testimonialData,
//       type: testimonialData.type as Testimonial['type'],
//       rating: testimonialData.rating || undefined,
//       photo: testimonialData.photo || undefined,
//       attachedImages: testimonialData.attachedImages || undefined,
//       content: testimonialData.content,
//       videoUrl: testimonialData.videoUrl || undefined,
//       permissionGranted: testimonialData.permissionGranted,
//       extraInformation: testimonialData.extraInformation
//         ? (testimonialData.extraInformation as any as ExtraInformationItem[])
//         : [], // Parse or fallback to empty array
//       tags: testimonialData.tags || [],
//       videoThumbnail: testimonialData.videoThumbnail || undefined,
//       companyLink: testimonialData.companyLink || undefined,
//       companyLogo: testimonialData.companyLogo || undefined,
//       internalComments: testimonialData.internalComments || undefined,
//       excerpt: testimonialData.excerpt || undefined,
//       readMoreLink: testimonialData.readMoreLink || undefined,
//       createdAt: testimonialData.createdAt,
//       updatedAt: testimonialData.updatedAt,
//     };

//     return NextResponse.json(formattedTestimonial);
//   } catch (error) {
//     console.error('Error fetching testimonial:', error);
//     return NextResponse.json({ message: 'Error fetching testimonial' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export function OPTIONS() {
//   return NextResponse.json({ message: 'Method OPTIONS allowed' }, { status: 204 });
// }

//app/api/testimonials/[testimonialId].route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Testimonial, ExtraInformationItem } from '@/types/testimonial';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { testimonialId: string } }
) {
  const testimonialId = params.testimonialId;

  if (!testimonialId) {
    return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });
  }

  try {
    const updatedData: Partial<Testimonial> = await request.json();

    // Handle file uploads if necessary
    // Note: File uploads should be handled separately, possibly using a different API endpoint
    // or a file storage service. The URLs of the uploaded files should be passed in updatedData.

    const testimonialData = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        content: updatedData.content,
        videoUrl: updatedData.videoUrl,
        videoDuration: updatedData.videoDuration,
        trimmedStartTime: updatedData.trimmedStartTime,
        trimmedEndTime: updatedData.trimmedEndTime,
        videoThumbnail: updatedData.videoThumbnail,
        photo: updatedData.photo,
        attachedImages: updatedData.attachedImages,
        companyLink: updatedData.companyLink,
        companyLogo: updatedData.companyLogo,
        internalComments: updatedData.internalComments,
        excerpt: updatedData.excerpt,
        readMoreLink: updatedData.readMoreLink,
        createdAt: updatedData.createdAt ? new Date(updatedData.createdAt) : undefined,
        extraInformation: updatedData.extraInformation as any, // Prisma will handle the JSON conversion
        tags: updatedData.tags,
      },
    });

    if (!testimonialData) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }

    const formattedTestimonial: Testimonial = {
      ...testimonialData,
      type: testimonialData.type as Testimonial['type'],
      rating: testimonialData.rating || undefined,
      photo: testimonialData.photo || undefined,
      attachedImages: testimonialData.attachedImages || undefined,
      content: testimonialData.content,
      videoUrl: testimonialData.videoUrl || undefined,
      permissionGranted: testimonialData.permissionGranted,
      extraInformation: testimonialData.extraInformation
        ? (testimonialData.extraInformation as any as ExtraInformationItem[])
        : [],
      tags: testimonialData.tags || [],
      trimmedStartTime: testimonialData.trimmedStartTime || undefined,
      trimmedEndTime: testimonialData.trimmedEndTime || undefined,
      videoDuration: testimonialData.videoDuration || undefined,
      videoThumbnail: testimonialData.videoThumbnail || undefined,
      companyLink: testimonialData.companyLink || undefined,
      companyLogo: testimonialData.companyLogo || undefined,
      internalComments: testimonialData.internalComments || undefined,
      excerpt: testimonialData.excerpt || undefined,
      readMoreLink: testimonialData.readMoreLink || undefined,
      createdAt: testimonialData.createdAt,
      updatedAt: testimonialData.updatedAt,
    };

    return NextResponse.json(formattedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ message: 'Error updating testimonial' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { testimonialId: string } }
) {
  const testimonialId = params.testimonialId;

  if (!testimonialId) {
    return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });
  }

  try {
    const testimonialData = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonialData) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }

    const formattedTestimonial: Testimonial = {
      ...testimonialData,
      type: testimonialData.type as Testimonial['type'],
      rating: testimonialData.rating || undefined,
      photo: testimonialData.photo || undefined,
      attachedImages: testimonialData.attachedImages || undefined,
      content: testimonialData.content,
      videoUrl: testimonialData.videoUrl || undefined,
      videoDuration: testimonialData.videoDuration || undefined,
      trimmedStartTime: testimonialData.trimmedStartTime || undefined,
      trimmedEndTime: testimonialData.trimmedEndTime || undefined,
      permissionGranted: testimonialData.permissionGranted,
      extraInformation: testimonialData.extraInformation
        ? (testimonialData.extraInformation as any as ExtraInformationItem[])
        : [],
      tags: testimonialData.tags || [],
      videoThumbnail: testimonialData.videoThumbnail || undefined,
      companyLink: testimonialData.companyLink || undefined,
      companyLogo: testimonialData.companyLogo || undefined,
      internalComments: testimonialData.internalComments || undefined,
      excerpt: testimonialData.excerpt || undefined,
      readMoreLink: testimonialData.readMoreLink || undefined,
      createdAt: testimonialData.createdAt,
      updatedAt: testimonialData.updatedAt,
    };

    return NextResponse.json(formattedTestimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ message: 'Error fetching testimonial' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export function OPTIONS() {
  return NextResponse.json({ message: 'Method OPTIONS allowed' }, { status: 204 });
}