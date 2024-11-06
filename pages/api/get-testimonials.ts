// //pages/api/get-testimonials.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Testimonial, ExtraInformationItem } from '@/types/testimonial';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { spaceId } = req.query;

    if (!spaceId || typeof spaceId !== 'string') {
      return res.status(400).json({ message: 'Space ID is required' });
    }

    try {
      const testimonials = await prisma.testimonial.findMany({
        where: { spaceId: spaceId },
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
        extraInformation: testimonialData.extraInformation? (testimonialData.extraInformation as any as ExtraInformationItem[]) : [], // Parse or fallback to empty array
        createdAt: testimonialData.createdAt,
        updatedAt: testimonialData.updatedAt,
      }));

      res.status(200).json(formattedTestimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ message: 'Error fetching testimonials' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}