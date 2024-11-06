// //pages/api/upload-photo.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable, { File, Fields } from 'formidable';
import fs from 'fs';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Disable body parsing, since formidable will handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Use formidable to parse form data
  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields: Fields, files: formidable.Files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error parsing form' });
    }

    // Ensure file is correctly typed and exists
    const file = Array.isArray(files.photo) ? files.photo[0] : files.photo;
    if (!file || !file.filepath) {
      return res.status(400).json({ message: 'No photo file provided' });
    }

    const spaceId = Array.isArray(fields.spaceId) ? fields.spaceId[0] : fields.spaceId;
    if (!spaceId) {
      return res.status(400).json({ message: 'No spaceId provided' });
    }

    const fileContent = fs.readFileSync(file.filepath);
    const Key = `${spaceId}/photos/${Date.now()}-${file.originalFilename}`;

    try {
      // Upload to S3
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key,
          Body: fileContent,
          ContentType: file.mimetype!,
        })
      );

      const photoUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${Key}`;
      res.status(200).json({ photoUrl });
    } catch (error: any) {
      console.error('Error uploading to S3:', error);
      res.status(500).json({ message: 'Error uploading photo', error: error.message });
    }
  });
}
