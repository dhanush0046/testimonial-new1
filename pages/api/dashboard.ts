// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prisma';
// import { DashboardData } from '@/types/space';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<DashboardData>
// ) {
//   if (req.method === 'GET') {
//     try {
//       const spaces = await prisma.space.findMany({
//         include: {
//           _count: {
//             select: {
//               testimonials: {
//                 where: {
//                   type: 'VIDEO'
//                 }
//               }
//             }
//           },
//           testimonials: {
//             select: {
//               type: true
//             }
//           }
//         }
//       });

//       const formattedSpaces = spaces.map(space => ({
//         ...space,
//         videoTestimonialsCount: space._count.testimonials,
//         textTestimonialsCount: space.testimonials.filter(t => t.type === 'TEXT').length,
//         testimonials: undefined,
//         _count: undefined
//       }));

//       const totalVideos = formattedSpaces.reduce((sum, space) => sum + space.videoTestimonialsCount, 0);
//       const totalSpaces = formattedSpaces.length;

//       // TODO: Implement actual plan logic
//       const currentPlan = 'Starter';

//       res.status(200).json({
//         spaces: formattedSpaces,
//         totalVideos,
//         totalSpaces,
//         currentPlan
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       res.status(500).json({ error: 'Error fetching dashboard data' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { DashboardData, Space, CollectionType, Theme, Language, Question, ExtraInformationField } from '@/types/space';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardData>
) {
  if (req.method === 'GET') {
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
        questions: space.questions ? (space.questions as any as Question[]) : [], // Parse or fallback to empty array
        extraInformationFields: space.extraInformationFields ? (space.extraInformationFields as any as ExtraInformationField[]) : [], // Parse or fallback to empty array
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

      res.status(200).json({
        spaces: formattedSpaces,
        totalVideos,
        totalSpaces,
        currentPlan
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Error fetching dashboard data' } as any);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}