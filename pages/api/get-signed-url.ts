// import { NextApiRequest, NextApiResponse } from 'next';
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const fileName = `logos/${Date.now()}-${req.query.fileName}`;
//   const fileType = req.query.fileType as string;

//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME!,
//     Key: fileName,
//     ContentType: fileType,
//   };

//   try {
//     const command = new PutObjectCommand(params);
//     const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
//     const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

//     res.status(200).json({ uploadUrl, fileUrl });
//   } catch (error) {
//     console.error('Error generating pre-signed URL:', error);
//     res.status(500).json({ message: 'Error generating pre-signed URL' });
//   }
// }

//pages/api/get-signed-url.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const fileName = req.query.fileName as string;
  const fileType = req.query.fileType as string;
  const uploadType = req.query.uploadType as string;

  if (!fileName || !fileType || !uploadType) {
    return res.status(400).json({ message: 'Missing required parameters' });
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
    default:
      return res.status(400).json({ message: 'Invalid upload type' });
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

    res.status(200).json({ uploadUrl, fileUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ message: 'Error generating pre-signed URL' });
  }
}