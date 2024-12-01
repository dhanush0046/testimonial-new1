import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(
  request: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const testimonialId = params.testimonialId;

    if (!testimonialId) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { tags: true },
    });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ tags: testimonial.tags });
  } catch (error) {
    console.error('Error fetching testimonial tags:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}