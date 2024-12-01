// //app/api/testimonial/archive/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      select: { isArchived: true, isLiked: true, isHighlighted: true },
    });

    if (!testimonial) {
      return new Response(JSON.stringify({ message: 'Testimonial not found' }), { status: 404 });
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        isArchived: !testimonial.isArchived,
        // If archiving, set isLiked and isHighlighted to false
        ...(!testimonial.isArchived && {
          isLiked: false,
          isHighlighted: false,
        }),
      },
    });

    return new Response(JSON.stringify(updatedTestimonial), { status: 200 });
  } catch (error) {
    console.error('Error archiving testimonial:', error);
    return new Response(JSON.stringify({ message: 'Error archiving testimonial' }), { status: 500 });
  }
}
