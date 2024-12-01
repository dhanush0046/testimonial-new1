// //app/api/testimonial/highlight/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      select: { isHighlighted: true },
    });

    if (!testimonial) {
      return new Response(JSON.stringify({ message: 'Testimonial not found' }), { status: 404 });
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: { isHighlighted: !testimonial.isHighlighted },
    });

    return new Response(JSON.stringify(updatedTestimonial), { status: 200 });
  } catch (error) {
    console.error('Error highlighting testimonial:', error);
    return new Response(JSON.stringify({ message: 'Error highlighting testimonial' }), { status: 500 });
  }
}
