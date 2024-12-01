// app/api/spaces/[spaceId]/tags-display/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  try {
    const { tagsDisplayOnWall } = await request.json()
    const updatedSpace = await prisma.space.update({
      where: { id: params.spaceId },
      data: { tagsDisplayOnWall },
    })
    return NextResponse.json(updatedSpace)
  } catch (error) {
    console.error('Error updating tags display on wall:', error)
    return NextResponse.json({ error: 'Failed to update tags display on wall' }, { status: 500 })
  }
}