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
//       select: { isArchived: true }
//     })

//     if (!testimonial) {
//       return res.status(404).json({ message: 'Testimonial not found' })
//     }

//     const updatedTestimonial = await prisma.testimonial.update({
//       where: { id },
//       data: { isArchived: !testimonial.isArchived },
//     })

//     res.status(200).json(updatedTestimonial)
//   } catch (error) {
//     console.error('Error archiving testimonial:', error)
//     res.status(500).json({ message: 'Error archiving testimonial' })
//   }
// }

//pages/api/testimonial/archive-testimonial.ts
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
      select: { isArchived: true, isLiked: true, isHighlighted: true }
    })

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' })
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: { 
        isArchived: !testimonial.isArchived,
        // If archiving, set isLiked and isHighlighted to false
        ...((!testimonial.isArchived) && {
          isLiked: false,
          isHighlighted: false
        })
      },
    })

    res.status(200).json(updatedTestimonial)
  } catch (error) {
    console.error('Error archiving testimonial:', error)
    res.status(500).json({ message: 'Error archiving testimonial' })
  }
}