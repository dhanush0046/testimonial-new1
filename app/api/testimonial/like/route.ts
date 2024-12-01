// //app/api/testimonial/like/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      select: { isLiked: true, isHighlighted: true },
    });

    if (!testimonial) {
      return new Response(JSON.stringify({ message: 'Testimonial not found' }), { status: 404 });
    }

    const newIsLiked = !testimonial.isLiked;
    const newIsHighlighted = newIsLiked ? testimonial.isHighlighted : false;

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        isLiked: newIsLiked,
        isHighlighted: newIsHighlighted,
      },
    });

    return new Response(JSON.stringify(updatedTestimonial), { status: 200 });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return new Response(JSON.stringify({ message: 'Error updating testimonial' }), { status: 500 });
  }
}
