// pages/api/testimonial/like-testimonial.ts

// import { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' })
//   }

//   try {
//     const { id } = req.body
//     const testimonial = await prisma.testimonial.findUnique({
//       where: { id },
//       select: { isLiked: true }
//     })

//     if (!testimonial) {
//       return res.status(404).json({ message: 'Testimonial not found' })
//     }

//     const updatedTestimonial = await prisma.testimonial.update({
//       where: { id },
//       data: { isLiked: !testimonial.isLiked },
//     })

//     res.status(200).json(updatedTestimonial)
//   } catch (error) {
//     console.error('Error liking testimonial:', error)
//     res.status(500).json({ message: 'Error liking testimonial' })
//   }
// }

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
      select: { isLiked: true, isHighlighted: true }
    })

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' })
    }

    const newIsLiked = !testimonial.isLiked
    const newIsHighlighted = newIsLiked ? testimonial.isHighlighted : false

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: { 
        isLiked: newIsLiked,
        isHighlighted: newIsHighlighted
      },
    })

    res.status(200).json(updatedTestimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    res.status(500).json({ message: 'Error updating testimonial' })
  }
}