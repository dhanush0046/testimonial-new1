// app/api/testimonial/delete/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
    }

    const deletedTestimonial = await prisma.testimonial.delete({
      where: { id },
    })

    return NextResponse.json(deletedTestimonial)
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}