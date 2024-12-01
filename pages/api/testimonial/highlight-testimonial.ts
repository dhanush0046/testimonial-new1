import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id } = req.body
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      select: { isHighlighted: true }
    })

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' })
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: { isHighlighted: !testimonial.isHighlighted },
    })

    res.status(200).json(updatedTestimonial)
  } catch (error) {
    console.error('Error highlighting testimonial:', error)
    res.status(500).json({ message: 'Error highlighting testimonial' })
  }
}