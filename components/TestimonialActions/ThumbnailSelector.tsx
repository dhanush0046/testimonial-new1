// //components/TestimonialActions/ThumbnailSelector.tsx
// "use client"

// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ImagePlus } from 'lucide-react'
// import { cn } from "@/lib/utils"

// interface ThumbnailSelectorProps {
//   videoUrl: string
//   onSelect: (url: string) => void
//   selectedThumbnail: string | null
// }

// export function ThumbnailSelector({ videoUrl, onSelect, selectedThumbnail }: ThumbnailSelectorProps) {
//   const [thumbnails, setThumbnails] = useState<string[]>([])
//   const [isGenerating, setIsGenerating] = useState(false)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   console.log("Video URL", videoUrl)

//   const generateThumbnail = async (time: number): Promise<string> => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
  
//     if (!video || !canvas) throw new Error('Video or canvas not ready');
  
//     return new Promise((resolve, reject) => {
//       video.currentTime = time;
//       video.onseeked = () => {
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return reject('Canvas context not available');
  
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         resolve(canvas.toDataURL('image/jpeg'));
//       };
//     });
//   };
  
//   const generateThumbnails = async () => {
//     if (!videoUrl) return

//     setIsGenerating(true)
//     try {
//       const video = videoRef.current
//       if (!video) return

//       video.src = videoUrl
//       await new Promise((resolve) => {
//         video.onloadedmetadata = resolve
//       })

//       const duration = video.duration
//       const timestamps = [0, duration / 3, (duration / 3) * 2]

//       const thumbnailUrls = await Promise.all(
//         timestamps.map(time => generateThumbnail(time))
//       )

//       setThumbnails(thumbnailUrls)
//       if (!selectedThumbnail) {
//         onSelect(thumbnailUrls[0])
//       }
//     } catch (error) {
//       console.error('Error generating thumbnails:', error)
//     } finally {
//       setIsGenerating(false)
//     }
//   }

//   useEffect(() => {
//     if (videoUrl) {
//       generateThumbnails()
//     }
//   }, [videoUrl])

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const url = URL.createObjectURL(file)
//       onSelect(url)
//     }
//     if (e.target.value) e.target.value = ''
//   }

//   return (
//     <div className="space-y-4">
//       <Label>Choose a thumbnail</Label>

//       <video ref={videoRef} className="hidden" crossOrigin="anonymous" />
//       <canvas ref={canvasRef} className="hidden" />

//       <video src={videoUrl} width={200} controls className="rounded-lg" />

//       <div className="flex gap-4 items-start">
//         {isGenerating ? (
//           Array(3).fill(0).map((_, i) => (
//             <div
//               key={i}
//               className="w-[160px] h-[90px] bg-muted animate-pulse rounded-md"
//             />
//           ))
//         ) : (
//           <>
//             {thumbnails.map((url, index) => (
//               <button
//                 key={index}
//                 onClick={() => onSelect(url)}
//                 className={cn(
//                   "relative w-[160px] h-[90px] rounded-md overflow-hidden border-2 transition-colors",
//                   selectedThumbnail === url ? "border-primary" : "border-border hover:border-primary/50"
//                 )}
//               >
//                 <Image
//                   src={url}
//                   alt={`Thumbnail ${index + 1}`}
//                   fill
//                   className="object-cover"
//                 />
//               </button>
//             ))}
//             <div className="w-[160px] h-[90px]">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleFileUpload}
//                 ref={fileInputRef}
//               />
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full h-full"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <ImagePlus className="h-5 w-5 mr-2" />
//                 Upload one
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// //components/TestimonialActions/ThumbnailSelector.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ThumbnailSelectorProps {
  videoUrl: string;
  onSelect: (url: string) => void;
  selectedThumbnail: string | null;
}

async function getVideoCover(videoUrl: string, seekTo: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const videoPlayer = document.createElement("video");
    videoPlayer.crossOrigin = "anonymous";
    
    const proxyUrl = `/api/proxy-video?url=${encodeURIComponent(videoUrl)}`;
    videoPlayer.src = proxyUrl;

    videoPlayer.addEventListener("error", (ex) => {
      reject("Error when loading video file: " + ex);
    });

    videoPlayer.addEventListener("loadedmetadata", () => {
      if (videoPlayer.duration < seekTo) {
        reject("Video is too short.");
        console.log("Video is too short.");
        return;
      }
      setTimeout(() => {
        videoPlayer.currentTime = seekTo;
      }, 200);
    });

    videoPlayer.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoPlayer.videoWidth;
      canvas.height = videoPlayer.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas context not available");
        return;
      }

      ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
    });

    videoPlayer.addEventListener("load", () => {
      console.log("Video loaded successfully");
    });

    videoPlayer.addEventListener("loadeddata", () => {
      console.log("Video data loaded successfully");
    });
  });
}

export function ThumbnailSelector({
  videoUrl,
  onSelect,
  selectedThumbnail,
}: ThumbnailSelectorProps) {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateThumbnails = async () => {
    if (!videoUrl) return;

    setIsGenerating(true);
    setError(null);
    try {
      const timestamps = [0, 5, 10];
      const thumbnailUrls = await Promise.all(
        timestamps.map((time) => getVideoCover(videoUrl, time))
      );

      setThumbnails(thumbnailUrls);
      if (!selectedThumbnail && thumbnailUrls.length > 0) {
        onSelect(thumbnailUrls[0]);
      }
    } catch (error) {
      console.error("Error generating thumbnails:", error);
      setError("Failed to generate thumbnails. Please check the video URL and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (videoUrl) {
      generateThumbnails();
    }
  }, [videoUrl]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onSelect(url);
    }
    if (e.target.value) e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <Label>Choose a thumbnail</Label>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="grid grid-cols-3 gap-4 max-w-[600px]">
        {isGenerating ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="aspect-video w-full bg-muted animate-pulse rounded-md"
              />
            ))
        ) : (
          <>
            {thumbnails.map((url, index) => (
              <button
                key={index}
                onClick={() => onSelect(url)}
                className={cn(
                  "relative aspect-video w-full rounded-md overflow-hidden border-2 transition-colors",
                  selectedThumbnail === url
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Image
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </>
        )}
      </div>
      <div className="w-full max-w-[600px]">
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
          ref={fileInputRef}
        />
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="h-5 w-5 mr-2" />
          Upload custom thumbnail
        </Button>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ImagePlus } from 'lucide-react';
// import { cn } from "@/lib/utils";

// interface ThumbnailSelectorProps {
//   videoUrl: string;
//   onSelect: (url: string) => void;
//   selectedThumbnail: string | null;
// }

// const THUMBNAIL_COUNT = 3;
// const DEFAULT_TIMESTAMPS = [1, 2, 3]; // Use fixed timestamps initially

// export function ThumbnailSelector({
//   videoUrl,
//   onSelect,
//   selectedThumbnail,
// }: ThumbnailSelectorProps) {
//   const [thumbnails, setThumbnails] = useState<string[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const generateThumbnail = useCallback((video: HTMLVideoElement, time: number): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const handleSeeked = () => {
//         try {
//           console.log(`Generating thumbnail at time: ${time}`);
//           const canvas = document.createElement("canvas");
//           canvas.width = video.videoWidth || 640;
//           canvas.height = video.videoHeight || 360;
//           const ctx = canvas.getContext("2d");
//           if (!ctx) throw new Error("Canvas context not available");
          
//           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//           const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
//           console.log(`Thumbnail generated successfully for time: ${time}`);
//           resolve(dataUrl);
//         } catch (error) {
//           console.error(`Error generating thumbnail at time ${time}:`, error);
//           reject(error);
//         } finally {
//           video.onseeked = null; // Cleanup
//         }
//       };

//       const handleError = () => {
//         console.error(`Video error at time ${time}:`, video.error);
//         reject(new Error(`Video error: ${video.error?.message || 'Unknown error'}`));
//         video.onseeked = null;
//       };

//       try {
//         video.onseeked = handleSeeked;
//         video.onerror = handleError;
//         console.log(`Setting video time to: ${time}`);
//         video.currentTime = time;
//       } catch (error) {
//         console.error(`Error setting video time to ${time}:`, error);
//         reject(error);
//       }
//     });
//   }, []);

//   const generateThumbnails = useCallback(async () => {
//     if (!videoUrl) return;

//     setIsGenerating(true);
//     setError(null);

//     try {
//       if (!videoRef.current) {
//         videoRef.current = document.createElement("video");
//       }
//       const video = videoRef.current;
//       video.crossOrigin = "anonymous";
//       video.preload = "metadata";

//       // Wait for video to be ready
//       await new Promise((resolve, reject) => {
//         const handleLoad = () => {
//           console.log("Video metadata loaded successfully");
//           resolve(true);
//         };

//         const handleError = () => {
//           console.error("Video load error:", video.error);
//           reject(new Error(`Failed to load video: ${video.error?.message || 'Unknown error'}`));
//         };

//         video.onloadedmetadata = handleLoad;
//         video.onerror = handleError;
        
//         console.log("Setting video source:", videoUrl);
//         video.src = `/api/proxy-video?url=${encodeURIComponent(videoUrl)}`;
//       });

//       console.log("Generating thumbnails using fixed timestamps");
//       const thumbnailUrls = await Promise.all(
//         DEFAULT_TIMESTAMPS.map(time => generateThumbnail(video, time))
//       );

//       console.log("All thumbnails generated:", thumbnailUrls.length);
//       setThumbnails(thumbnailUrls);
      
//       if (!selectedThumbnail && thumbnailUrls.length > 0) {
//         console.log("Setting default thumbnail");
//         onSelect(thumbnailUrls[0]);
//       }
//     } catch (error) {
//       console.error("Error in thumbnail generation process:", error);
//       setError("Failed to generate thumbnails. Please try again or upload a custom thumbnail.");
//     } finally {
//       setIsGenerating(false);
//       if (videoRef.current) {
//         videoRef.current.src = "";
//         videoRef.current = null;
//       }
//     }
//   }, [videoUrl, generateThumbnail, onSelect, selectedThumbnail]);

//   useEffect(() => {
//     if (videoUrl) {
//       generateThumbnails();
//     }
    
//     return () => {
//       if (videoRef.current) {
//         videoRef.current.src = "";
//         videoRef.current = null;
//       }
//     };
//   }, [videoUrl, generateThumbnails]);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       onSelect(url);
//     }
//     if (e.target.value) e.target.value = "";
//   };

//   return (
//     <div className="space-y-4">
//       <Label>Choose a thumbnail</Label>

//       {error && (
//         <div className="text-red-500 mb-2 text-sm">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-3 gap-4 max-w-[600px]">
//         {isGenerating ? (
//           Array(THUMBNAIL_COUNT)
//             .fill(0)
//             .map((_, i) => (
//               <div
//                 key={i}
//                 className="aspect-video w-full bg-muted animate-pulse rounded-md"
//               />
//             ))
//         ) : (
//           <>
//             {thumbnails.map((url, index) => (
//               <button
//                 key={index}
//                 onClick={() => onSelect(url)}
//                 className={cn(
//                   "relative aspect-video w-full rounded-md overflow-hidden border-2 transition-colors",
//                   selectedThumbnail === url
//                     ? "border-primary"
//                     : "border-border hover:border-primary/50"
//                 )}
//               >
//                 <Image
//                   src={url}
//                   alt={`Thumbnail ${index + 1}`}
//                   fill
//                   className="object-cover"
//                 />
//               </button>
//             ))}
//           </>
//         )}
//       </div>
//       <div className="w-full max-w-[600px]">
//         <Input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileUpload}
//           ref={fileInputRef}
//         />
//         <Button
//           type="button"
//           variant="outline"
//           className="w-full"
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <ImagePlus className="h-5 w-5 mr-2" />
//           Upload custom thumbnail
//         </Button>
//       </div>
//     </div>
//   );
// }