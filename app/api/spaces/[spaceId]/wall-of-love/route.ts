import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  const spaceId = params.spaceId;

  try {
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      include: { wallOfLoveSettings: true }
    });

    if (!space) {
      return NextResponse.json({ message: "Space not found" }, { status: 404 });
    }

    return NextResponse.json(space);
  } catch (error) {
    console.error("Error fetching space with Wall of Love settings:", error);
    return NextResponse.json({ message: "Error fetching space", error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { spaceId: string } }
) {
  const spaceId = params.spaceId;
  const body = await request.json();

  try {
    const updatedSettings = await prisma.wallOfLoveSettings.upsert({
      where: { spaceId },
      create: { spaceId, ...body },
      update: body,
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Error updating Wall of Love settings:", error);
    return NextResponse.json({ message: "Error updating settings", error }, { status: 500 });
  }
}