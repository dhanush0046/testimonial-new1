//app/api/signed-url/route.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the request body
    const { videoName, videoType, spaceId } = body;

    if (!videoName || !videoType || !spaceId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const Key = `${spaceId}/videos/${videoName}`;
    const signedUrl = await getS3SignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key,
        ContentType: videoType,
      }),
      { expiresIn: 60 * 15 } // 15 minutes
    );

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
