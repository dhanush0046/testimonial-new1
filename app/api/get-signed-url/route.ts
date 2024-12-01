// //app/api/get-signed-url/route.ts
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName');
  const fileType = searchParams.get('fileType');
  const uploadType = searchParams.get('uploadType');

  if (!fileName || !fileType || !uploadType) {
    return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
  }

  let folderName: string;
  switch (uploadType) {
    case 'logo':
      folderName = 'logos';
      break;
    case 'attachment':
      folderName = 'attachments';
      break;
    case 'photo':
      folderName = 'photos';
      break;
    case 'thankYouImage':
      folderName = 'thankYouImages';
      break;
    case 'defaultAvatar':
      folderName = 'defaultAvatars';
      break;
    case 'openGraphImage':
      folderName = 'openGraphImages';
      break;
    case 'coverImage':
      folderName = 'coverImages';
      break;
    default:

      return NextResponse.json({ message: 'Invalid upload type' }, { status: 400 });
  }

  const key = `${folderName}/${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
  };

  try {
    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;

    return NextResponse.json({ uploadUrl, fileUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return NextResponse.json({ message: 'Error generating pre-signed URL' }, { status: 500 });
  }
}