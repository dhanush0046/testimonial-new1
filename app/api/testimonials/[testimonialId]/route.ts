//app/api/testimonials/[testimonialId].route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { Testimonial, ExtraInformationItem } from '@/types/testimonial';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
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
      permissionGranted: testimonialData.permissionGranted,
      extraInformation: testimonialData.extraInformation
        ? (testimonialData.extraInformation as any as ExtraInformationItem[])
        : [], // Parse or fallback to empty array
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