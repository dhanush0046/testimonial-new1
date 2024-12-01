// app/api/spaces/[spaceId]/tags/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  try {
    const tags = await prisma.tag.findMany({
      where: { spaceId: params.spaceId },
      orderBy: { position: 'asc' },
    })
    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  try {
    const { name, position } = await request.json()
    const newTag = await prisma.tag.create({
      data: {
        name,
        position,
        spaceId: params.spaceId,
      },
    })
    return NextResponse.json(newTag)
  } catch (error) {
    console.error('Error creating tag:', error)
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }
}

// New route for reordering tags
export async function PUT(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  try {
    const { tags } = await request.json()
    await prisma.$transaction(
      tags.map((tag: { id: string; position: number }) =>
        prisma.tag.update({
          where: { id: tag.id },
          data: { position: tag.position },
        })
      )
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering tags:', error)
    return NextResponse.json({ error: 'Failed to reorder tags' }, { status: 500 })
  }
}