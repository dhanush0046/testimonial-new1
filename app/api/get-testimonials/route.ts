
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { Testimonial, ExtraInformationItem } from '@/types/testimonial';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const spaceId = searchParams.get('spaceId');

  if (!spaceId) {
    return NextResponse.json({ message: 'Space ID is required' }, { status: 400 });
  }

  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { spaceId },
      orderBy: { createdAt: 'desc' },
    });

    const formattedTestimonials: Testimonial[] = testimonials.map(testimonialData => ({
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
        : [], // Parse or fallback to empty array
      createdAt: testimonialData.createdAt,
      updatedAt: testimonialData.updatedAt,
    }));

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ message: 'Error fetching testimonials' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export function OPTIONS() {
  return NextResponse.json({ message: 'Method OPTIONS allowed' }, { status: 204 });
}
