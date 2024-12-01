// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/lib/auth';
// import prisma from '@/lib/prisma';
// import { generateApiKey } from '@/lib/apiKeyUtils';

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { spaceId: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const { spaceId } = params;

//   try {
//     const space = await prisma.space.findUnique({
//       where: { id: spaceId },
//       select: { userId: true },
//     });

//     if (!space || space.userId !== session.user.id) {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }

//     const apiKey = generateApiKey();
//     const hashedApiKey = await bcrypt.hash(apiKey, 10);

//     await prisma.apiKey.create({
//       data: {
//         key: hashedApiKey,
//         spaceId,
//       },
//     });

//     return NextResponse.json({ apiKey });
//   } catch (error) {
//     console.error('Error generating API key:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { spaceId: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const { spaceId } = params;

//   try {
//     const space = await prisma.space.findUnique({
//       where: { id: spaceId },
//       select: { userId: true },
//     });

//     if (!space || space.userId !== session.user.id) {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }

//     const apiKeys = await prisma.apiKey.findMany({
//       where: { spaceId },
//       select: { id: true, createdAt: true },
//     });

//     return NextResponse.json({ apiKeys });
//   } catch (error) {
//     console.error('Error fetching API keys:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { spaceId: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const { spaceId } = params;
//   const { searchParams } = new URL(req.url);
//   const apiKeyId = searchParams.get('apiKeyId');

//   if (!apiKeyId) {
//     return NextResponse.json({ error: 'API Key ID is required' }, { status: 400 });
//   }

//   try {
//     const space = await prisma.space.findUnique({
//       where: { id: spaceId },
//       select: { userId: true },
//     });

//     if (!space || space.userId !== session.user.id) {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }

//     await prisma.apiKey.delete({
//       where: { id: apiKeyId },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error deleting API key:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }


// // app/api/spaces/[spaceId]/api-key/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import { generateApiKey } from '@/lib/apiKeyUtils';
// import * as bcrypt from 'bcrypt';

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { spaceId: string } }
// ) {
//   const { spaceId } = params;

//   try {
//     const space = await prisma.space.findUnique({
//       where: { id: spaceId },
//     });

//     if (!space) {
//       return NextResponse.json({ error: 'Space not found' }, { status: 404 });
//     }

//     const apiKey = generateApiKey();
//     const hashedApiKey = await bcrypt.hash(apiKey, 10);

//     await prisma.apiKey.create({
//       data: {
//         key: hashedApiKey,
//         spaceId,
//       },
//     });

//     return NextResponse.json({ apiKey });
//   } catch (error) {
//     console.error('Error generating API key:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { spaceId: string } }
// ) {
//   const { spaceId } = params;

//   try {
//     const apiKeys = await prisma.apiKey.findMany({
//       where: { spaceId },
//       select: { id: true, createdAt: true },
//     });

//     return NextResponse.json({ apiKeys });
//   } catch (error) {
//     console.error('Error fetching API keys:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { spaceId: string } }
// ) {
//   const { spaceId } = params;
//   const { searchParams } = new URL(req.url);
//   const apiKeyId = searchParams.get('apiKeyId');

//   if (!apiKeyId) {
//     return NextResponse.json({ error: 'API Key ID is required' }, { status: 400 });
//   }

//   try {
//     await prisma.apiKey.delete({
//       where: { id: apiKeyId },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error deleting API key:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

//---hide

// app/api/spaces/[spaceId]/api-key/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateApiKey } from '@/lib/apiKeyUtils';
import * as bcrypt from 'bcrypt';

export async function POST(
  req: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  const { spaceId } = params;

  try {
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    const apiKey = generateApiKey();
    const hashedApiKey = await bcrypt.hash(apiKey, 10);

    const createdApiKey = await prisma.apiKey.create({
      data: {
        key: hashedApiKey,
        spaceId,
      },
    });

    return NextResponse.json({ 
      apiKey: {
        id: createdApiKey.id,
        key: apiKey,
        createdAt: createdApiKey.createdAt.toISOString(),
      }
    });
  } catch (error) {
    console.error('Error generating API key:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  const { spaceId } = params;

  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { spaceId },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ 
      apiKeys: apiKeys.map(key => ({
        id: key.id,
        createdAt: key.createdAt.toISOString(),
      }))
    });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  const { spaceId } = params;
  const { searchParams } = new URL(req.url);
  const apiKeyId = searchParams.get('apiKeyId');

  if (!apiKeyId) {
    return NextResponse.json({ error: 'API Key ID is required' }, { status: 400 });
  }

  try {
    await prisma.apiKey.delete({
      where: { id: apiKeyId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}