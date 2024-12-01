// import { NextResponse } from 'next/server';
// import ffmpeg from 'fluent-ffmpeg';
// import { v4 as uuidv4 } from 'uuid';
// import path from 'path';
// import fs from 'fs';

// // Ensure the thumbnails directory exists
// const thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');
// if (!fs.existsSync(thumbnailsDir)) {
//   fs.mkdirSync(thumbnailsDir, { recursive: true });
// }

// export async function POST(req: Request) {
//   const { videoUrl } = await req.json();

//   if (!videoUrl) {
//     return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
//   }

//   try {
//     const thumbnails = await generateThumbnails(videoUrl);
//     return NextResponse.json({ thumbnails });
//   } catch (error) {
//     console.error('Error generating thumbnails:', error);
//     return NextResponse.json({ error: 'Failed to generate thumbnails' }, { status: 500 });
//   }
// }

// async function generateThumbnails(videoUrl: string): Promise<string[]> {
//   return new Promise((resolve, reject) => {
//     const thumbnails: string[] = [];

//     ffmpeg(videoUrl)
//       .on('filenames', (filenames: string[]) => {
//         thumbnails.push(...filenames.map(filename => `/thumbnails/${filename}`));
//       })
//       .on('end', () => resolve(thumbnails))
//       .on('error', (err: Error) => reject(err))
//       .screenshots({
//         count: 3,
//         folder: thumbnailsDir,
//         filename: `thumbnail-${uuidv4()}-%i.png`,
//         size: '320x180'
//       });
//   });
// }

import { NextResponse } from 'next/server';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export async function POST(req: Request) {
  const { videoUrl } = await req.json();

  if (!videoUrl) {
    return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
  }

  try {
    const thumbnails = await generateThumbnails(videoUrl);
    return NextResponse.json({ thumbnails });
  } catch (error) {
    console.error('Error generating thumbnails:', error);
    return NextResponse.json({ error: 'Failed to generate thumbnails' }, { status: 500 });
  }
}

async function generateThumbnails(videoUrl: string): Promise<string[]> {
  const ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: await toBlobURL(`/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`/ffmpeg-core.wasm`, 'application/wasm'),
  });

  const timestamps = [1, 5, 10]; // Generate thumbnails at 1, 5, and 10 seconds
  const thumbnails: string[] = [];

  try {
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoUrl));

    for (let i = 0; i < timestamps.length; i++) {
      await ffmpeg.exec(['-i', 'input.mp4', '-ss', `${timestamps[i]}`, '-frames:v', '1', `output_${i}.jpg`]);
      const data = await ffmpeg.readFile(`output_${i}.jpg`);
      const blob = new Blob([data], { type: 'image/jpeg' });
      const base64 = await blobToBase64(blob);
      thumbnails.push(base64);
    }
  } finally {
    await ffmpeg.terminate();
  }

  return thumbnails;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};