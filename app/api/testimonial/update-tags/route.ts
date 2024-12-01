import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, tags } = body

    if (!id || !Array.isArray(tags)) {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      )
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: { tags },
      include: {
        space: {
          select: {
            spaceName: true, // Adjusted to match your schema field `spaceName`
          },
        },
      },
    })

    return NextResponse.json(updatedTestimonial, { status: 200 })
  } catch (error) {
    console.error('Error updating testimonial tags:', error)
    return NextResponse.json(
      { message: 'Error updating testimonial tags' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
