// //app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { DashboardData, Space, CollectionType, Theme, Language, Question, ExtraInformationField } from '@/types/space';

export async function GET() {
  try {
    const spaces = await prisma.space.findMany({
      include: {
        _count: {
          select: {
            testimonials: {
              where: {
                type: 'VIDEO'
              }
            }
          }
        },
        testimonials: {
          select: {
            type: true
          }
        }
      }
    });

    const formattedSpaces: Space[] = spaces.map(space => ({
      ...space,
      questions: space.questions ? (space.questions as any as Question[]) : [],
      extraInformationFields: space.extraInformationFields ? (space.extraInformationFields as any as ExtraInformationField[]) : [],
      collectionType: space.collectionType as CollectionType,
      theme: space.theme as Theme,
      language: space.language as Language,
      videoTestimonialsCount: space._count.testimonials,
      textTestimonialsCount: space.testimonials.filter(t => t.type === 'TEXT').length,
      testimonials: undefined,
      _count: undefined,
      hideImage: null
    }));

    const totalVideos = formattedSpaces.reduce((sum, space) => sum + space.videoTestimonialsCount, 0);
    const totalSpaces = formattedSpaces.length;

    // TODO: Implement actual plan logic
    const currentPlan = 'Starter';

    const dashboardData: DashboardData = {
      spaces: formattedSpaces,
      totalVideos,
      totalSpaces,
      currentPlan
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Error fetching dashboard data' }, { status: 500 });
  }
}