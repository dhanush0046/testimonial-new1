// //components/TestimonialActions/ThumbnailSelector.tsx -- new update testing
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { ImagePlus } from 'lucide-react';
// import { cn } from "@/lib/utils";

// interface ThumbnailSelectorProps {
//   videoUrl: string;
//   videoThumbnail: string | null;
//   onSelect: (file: File | string) => void;
//   selectedThumbnail: File | null;
// }

// const THUMBNAIL_COUNT = 3;
// const FALLBACK_DURATION = 10; // seconds

// export function ThumbnailSelector({
//   videoUrl,
//   videoThumbnail,
//   onSelect,
//   selectedThumbnail,
// }: ThumbnailSelectorProps) {
//   const [thumbnails, setThumbnails] = useState<File[]>([]);
//   const [thumbnailPreviews, setThumbnailPreviews] = useState<string[]>([]);
//   const [customThumbnail, setCustomThumbnail] = useState<File | null>(null);
//   const [customThumbnailPreview, setCustomThumbnailPreview] = useState<string | null>(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [shouldGenerateThumbnails, setShouldGenerateThumbnails] = useState<boolean>(true);


//   const generateThumbnails = useCallback(async () => {
//     if (!videoUrl) return;

//     setIsGenerating(true);
//     setError(null);

//     try {
//       const video = document.createElement("video");
//       video.crossOrigin = "anonymous";
//       video.src = videoUrl;

//       await new Promise<void>((resolve, reject) => {
//         video.onloadedmetadata = () => resolve();
//         video.onerror = () => reject(new Error("Failed to load video metadata"));
//         video.load();
//       });

//       const duration = isFinite(video.duration) ? video.duration : FALLBACK_DURATION;

//       const timestamps = Array.from(
//         { length: THUMBNAIL_COUNT },
//         (_, i) => (i + 1) * (duration / (THUMBNAIL_COUNT + 1))
//       );

//       const newThumbnails: File[] = [];
//       const newThumbnailPreviews: string[] = [];

//       for (const time of timestamps) {
//         await new Promise<void>((resolve) => {
//           video.currentTime = time;
//           video.onseeked = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = video.videoWidth || 640;
//             canvas.height = video.videoHeight || 360;
//             const ctx = canvas.getContext("2d");
//             if (ctx) {
//               ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//               canvas.toBlob((blob) => {
//                 if (blob) {
//                   const file = new File([blob], `thumbnail_${time.toFixed(2)}.jpg`, { type: "image/jpeg" });
//                   newThumbnails.push(file);
//                   newThumbnailPreviews.push(URL.createObjectURL(file));
//                 }
//                 resolve();
//               }, "image/jpeg", 0.8);
//             } else {
//               resolve();
//             }
//           };
//         });
//       }

//       setThumbnails(newThumbnails);
//       setThumbnailPreviews(newThumbnailPreviews);
//             if (!selectedThumbnail) {
//               if (videoThumbnail) {
//                 const videoThumbnailName = videoThumbnail.split('/').pop() || '';
//                 const matchingTimestamp = videoThumbnailName.match(/thumbnail_(\d+\.\d+)\.jpg$/);
                
//                 if (matchingTimestamp) {
//                   const timestamp = matchingTimestamp[1];
//                   const matchingIndex = newThumbnails.findIndex(file => 
//                     file.name === `thumbnail_${timestamp}.jpg`
//                   );
//                   if (matchingIndex !== -1) {
//                     onSelect(newThumbnails[matchingIndex]);
//                   } else {
//                     onSelect(videoThumbnail);
//                   }
//                 } else {
//                   onSelect(videoThumbnail);
//                 }
//               } else {
//                 onSelect(newThumbnails[0]);
//               }
//             }
//     } catch (error) {
//       setError("Failed to generate thumbnails. Try again or upload a custom thumbnail.");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [videoUrl, onSelect, selectedThumbnail]);

//   useEffect(() => {
//     if (videoUrl && shouldGenerateThumbnails) {
//       generateThumbnails();
//       setShouldGenerateThumbnails(false);
//     }
//   }, [videoUrl, generateThumbnails]);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setCustomThumbnail(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCustomThumbnailPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       onSelect(file);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <Label>Choose a thumbnail</Label>
//       {error && <div className="text-red-500 mb-2">{error}</div>}

//       <div className="grid grid-cols-4 gap-4 max-w-[600px]">
//         {isGenerating
//           ? Array(THUMBNAIL_COUNT)
//               .fill(0)
//               .map((_, i) => (
//                 <div
//                   key={i}
//                   className="aspect-video w-full bg-muted animate-pulse rounded-md"
//                 />
//               ))
//           : thumbnailPreviews.map((url, index) => (
//               <button
//                 key={index}
//                 onClick={() => onSelect(thumbnails[index])}
//                 className={cn(
//                   "relative aspect-video w-full rounded-md overflow-hidden border-2 transition-colors",
//                   selectedThumbnail === thumbnails[index]
//                     ? "border-primary"
//                     : "border-border hover:border-primary/50"
//                 )}
//               >
//                 <Image src={url} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
//               </button>
//             ))}
//         {customThumbnailPreview ? (
//           <button
//             onClick={() => onSelect(customThumbnail as File)}
//             className={cn(
//               "relative aspect-video w-full rounded-md overflow-hidden border-2 transition-colors",
//               selectedThumbnail === customThumbnail
//                 ? "border-primary"
//                 : "border-border hover:border-primary/50"
//             )}
//           >
//             <Image src={customThumbnailPreview} alt="Custom Thumbnail" fill className="object-cover" />
//           </button>
//         ) : (
//           <div className="w-full h-full">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => fileInputRef.current?.click()}
//               className="w-full h-full"
//             >
//               <ImagePlus className="mr-2 h-6 w-6" />
//               <span>Upload a thumbnail</span>
//             </Button>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFileUpload}
//               ref={fileInputRef}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//components/TestimonialActions/ThumbnailSelector.tsx -- above workings here testing
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ThumbnailSelectorProps {
  videoUrl: string;
  videoThumbnail: string | null;
  onSelect: (file: File | string) => void;
  selectedThumbnail: File | null;
}

const THUMBNAIL_COUNT = 3;

export function ThumbnailSelector({
  videoUrl,
  videoThumbnail,
  onSelect,
  selectedThumbnail,
}: ThumbnailSelectorProps) {
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState<string[]>([]);
  const [customThumbnail, setCustomThumbnail] = useState<File | null>(null);
  const [customThumbnailPreview, setCustomThumbnailPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [shouldGenerateThumbnails, setShouldGenerateThumbnails] = useState<boolean>(true);

  const getVideoDuration = async (videoUrl: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.src = videoUrl;
  
      video.onloadedmetadata = () => {
        if (isFinite(video.duration) && video.duration > 0) {
          resolve(video.duration);
          console.log("Video duration:", video.duration);
        } else {
          console.error("Invalid video duration:", video.duration);
          resolve(10); // Use a fallback duration
        }
      };
  
      video.onerror = () => {
        console.error("Error loading video metadata");
        reject(new Error("Failed to load video metadata"));
      };
  
      video.load();
    });
  };
  
  const generateThumbnails = useCallback(async () => {
    if (!videoUrl) return;
  
    setIsGenerating(true);
    setError(null);
  
    try {
      const duration = await getVideoDuration(videoUrl);
      const timestamps = Array.from(
        { length: THUMBNAIL_COUNT },
        (_, i) => (i + 1) * (duration / (THUMBNAIL_COUNT + 1))
      );
  
      const newThumbnails: File[] = [];
      const newThumbnailPreviews: string[] = [];
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.src = videoUrl;
  
      for (const time of timestamps) {
        await new Promise<void>((resolve) => {
          video.currentTime = time;
          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 360;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              canvas.toBlob((blob) => {
                if (blob) {
                  const file = new File([blob], `thumbnail_${time.toFixed(2)}.jpg`, { type: "image/jpeg" });
                  newThumbnails.push(file);
                  newThumbnailPreviews.push(URL.createObjectURL(file));
                }
                resolve();
              }, "image/jpeg", 0.8);
            } else {
              resolve();
            }
          };
        });
      }

      setThumbnails(newThumbnails);
      setThumbnailPreviews(newThumbnailPreviews);
            if (!selectedThumbnail) {
              if (videoThumbnail) {
                const videoThumbnailName = videoThumbnail.split('/').pop() || '';
                const matchingTimestamp = videoThumbnailName.match(/thumbnail_(\d+\.\d+)\.jpg$/);
                
                if (matchingTimestamp) {
                  const timestamp = matchingTimestamp[1];
                  const matchingIndex = newThumbnails.findIndex(file => 
                    file.name === `thumbnail_${timestamp}.jpg`
                  );
                  if (matchingIndex !== -1) {
                    onSelect(newThumbnails[matchingIndex]);
                  } else {
                    onSelect(videoThumbnail);
                  }
                } else {
                  onSelect(videoThumbnail);
                }
              } else {
                onSelect(newThumbnails[0]);
              }
            }
    } catch (error) {
      setError("Failed to generate thumbnails. Try again or upload a custom thumbnail.");
    } finally {
      setIsGenerating(false);
    }
  }, [videoUrl, onSelect, selectedThumbnail]);

  useEffect(() => {
    if (videoUrl && shouldGenerateThumbnails) {
      generateThumbnails();
      setShouldGenerateThumbnails(false);
    }
  }, [videoUrl, generateThumbnails]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCustomThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Choose a thumbnail</Label>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="grid grid-cols-4 gap-4 max-w-[600px]">
        {isGenerating
          ? Array(THUMBNAIL_COUNT)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="aspect-video w-full bg-muted animate-pulse rounded-md"
                />
              ))
          : thumbnailPreviews.map((url, index) => (
              <button
                key={index}
                onClick={() => onSelect(thumbnails[index])}
                className={cn(
                  "relative aspect-video w-full rounded-md overflow-hidden border-2 transition-colors",
                  selectedThumbnail === thumbnails[index]
                    ? "border-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Image src={url} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
        {customThumbnailPreview ? (
          <button
            onClick={() => onSelect(customThumbnail as File)}
            className={cn(
              "relative aspect-video w-full rounded-md overflow-hidden border-2 transition-colors",
              selectedThumbnail === customThumbnail
                ? "border-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            <Image src={customThumbnailPreview} alt="Custom Thumbnail" fill className="object-cover" />
          </button>
        ) : (
          <div className="w-full h-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-full"
            >
              <ImagePlus className="mr-2 h-6 w-6" />
              <span>Upload a thumbnail</span>
            </Button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}