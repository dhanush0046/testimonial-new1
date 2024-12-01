// app/api/spaces/[spaceId]/tags/[tagId]/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: Request,
  { params }: { params: { spaceId: string; tagId: string } }
) {
  try {
    const { displayOnWall, isActive } = await request.json()
    const updatedTag = await prisma.tag.update({
      where: { id: params.tagId },
      data: { displayOnWall, isActive },
    })
    return NextResponse.json(updatedTag)
  } catch (error) {
    console.error('Error updating tag:', error)
    return NextResponse.json({ error: 'Failed to update tag' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { spaceId: string; tagId: string } }
) {
  try {
    await prisma.tag.delete({ where: { id: params.tagId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting tag:', error)
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 })
  }
}