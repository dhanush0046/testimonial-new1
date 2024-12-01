//app/api/proxy-video/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const videoUrl = url.searchParams.get('url');

  if (!videoUrl) {
    return new NextResponse('Video URL is required', { status: 400 });
  }

  try {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error proxying video:', error);
    return new NextResponse('Failed to proxy video', { status: 500 });
  }
}

// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const videoUrl = url.searchParams.get('url');

//   if (!videoUrl) {
//     console.error('Proxy request missing video URL');
//     return new NextResponse('Video URL is required', { status: 400 });
//   }

//   try {
//     console.log(`Proxying video request for: ${videoUrl}`);
//     const response = await fetch(videoUrl, {
//       headers: {
//         'Range': request.headers.get('Range') || 'bytes=0-',
//       },
//     });

//     if (!response.ok) {
//       console.error(`Proxy request failed with status: ${response.status}`);
//       return new NextResponse(`Failed to fetch video: ${response.statusText}`, { status: response.status });
//     }

//     const headers = new Headers(response.headers);
//     headers.set('Access-Control-Allow-Origin', '*');
//     headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
//     headers.set('Access-Control-Allow-Headers', 'Range');

//     // Ensure Content-Type is set
//     if (!headers.has('Content-Type')) {
//       headers.set('Content-Type', 'video/mp4');
//     }

//     console.log(`Successfully proxied video request for: ${videoUrl}`);
//     return new NextResponse(response.body, {
//       status: response.status,
//       statusText: response.statusText,
//       headers,
//     });
//   } catch (error) {
//     console.error('Error proxying video:', error);
//     return new NextResponse('Failed to proxy video', { status: 500 });
//   }
// }

// export async function OPTIONS(request: Request) {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, OPTIONS',
//       'Access-Control-Allow-Headers': 'Range',
//     },
//   });
// }