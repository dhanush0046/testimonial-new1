// //app/share/[spaceName]/[testimonialId]/page.tsx
// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useParams } from "next/navigation";
// import { Testimonial, TestimonialType } from "@/types/testimonial";
// import { getTestimonial } from "@/lib/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star } from 'lucide-react';
// import { format } from 'date-fns';

// export default function SharedTestimonial() {
//   const params = useParams();
//   const testimonialId = params?.testimonialId as string;
//   const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTestimonial = async () => {
//       if (!testimonialId) {
//         setError("Missing testimonial ID");
//         setIsLoading(false);
//         return;
//       }
//       try {
//         const data = await getTestimonial(testimonialId);
//         setTestimonial(data);
//       } catch (err) {
//         console.error("Error fetching testimonial data:", err);
//         setError("Failed to load testimonial data. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTestimonial();
//   }, [testimonialId]);

//   const extraInformation = useMemo(() => {
//     return Array.isArray(testimonial?.extraInformation) 
//       ? testimonial.extraInformation
//       : [];
//   }, [testimonial?.extraInformation]);

//   const name = useMemo(() => {
//     return extraInformation.find(info => info.label === "Name")?.value || "";
//   }, [extraInformation]);

//   const titleAndCompany = useMemo(() => {
//     return extraInformation.find(info => info.label === "Title,Company")?.value || "";
//   }, [extraInformation]);

//   if (isLoading) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-lg">Loading...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-lg text-red-500">Error: {error}</p>
//     </div>
//   );

//   if (!testimonial) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-lg">No testimonial data available.</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-indigo-200 p-4">
//           <Card className="w-full max-w-4xl rounded-3xl shadow-md">
//             <CardContent className="p-8">
//               <div className="flex items-start space-x-4 mb-6">
//                   {testimonial.photo && (
//                   <img
//                     src={testimonial.photo}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
//                   {titleAndCompany && (
//                     <p className="text-gray-600 mt-1">{titleAndCompany}</p>
//                   )}
//                 </div>
//               </div>
//               <>
//               <hr className="my-6" />
//               </>
//               {testimonial.type === TestimonialType.VIDEO && testimonial.videoUrl && (
//                 <div className="mb-6">
//                   <video 
//                     src={testimonial.videoUrl} 
//                     controls 
//                     className="w-full rounded-lg shadow-md" 
//                   />
//                 </div>
//               )}

//               <p className="text-gray-800 text-lg mb-6">{testimonial.content}</p>

//               {testimonial.rating && (
//                 <div className="flex items-center space-x-1 mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-6 w-6 ${
//                         i < testimonial.rating!
//                           ? "text-yellow-400 fill-current"
//                           : "text-gray-200"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               )}

//               {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   {testimonial.attachedImages.map((image, index) => (
//                     <img
//                       key={index}
//                       src={image}
//                       alt={`Attached image ${index + 1}`}
//                       className="w-full h-auto rounded-lg shadow-md"
//                     />
//                   ))}
//                 </div>
//               )}

//               <div className="text-gray-400 text-sm">
//                 {format(new Date(testimonial.createdAt), 'MMM dd, yyyy')}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
    
//   );
// }

//app/share/[spaceName]/[testimonialId]/page.tsx -- workings
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Testimonial, TestimonialType } from "@/types/testimonial";
import { getTestimonial } from "@/lib/dashboardApi";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import confetti from 'canvas-confetti';

export default function SharedTestimonial() {
  const params = useParams();
  const testimonialId = params?.testimonialId as string;
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!testimonialId) {
        setError("Missing testimonial ID");
        setIsLoading(false);
        return;
      }
      try {
        const data = await getTestimonial(testimonialId);
        setTestimonial(data);
        // Trigger confetti effect when testimonial is loaded
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
      } catch (err) {
        console.error("Error fetching testimonial data:", err);
        setError("Failed to load testimonial data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [testimonialId]);

  const extraInformation = useMemo(() => {
    return Array.isArray(testimonial?.extraInformation) 
      ? testimonial.extraInformation
      : [];
  }, [testimonial?.extraInformation]);

  const name = useMemo(() => {
    return extraInformation.find(info => info.label === "Name")?.value || "";
  }, [extraInformation]);

  const titleAndCompany = useMemo(() => {
    return extraInformation.find(info => info.label === "Title,Company")?.value || "";
  }, [extraInformation]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-red-500">Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-indigo-200 p-4">
      <Card className="w-full max-w-4xl rounded-3xl shadow-md">
        <CardContent className="p-8">
          {isLoading ? (
            <TestimonialSkeleton />
          ) : testimonial ? (
            <>
              <div className="flex items-start space-x-4 mb-6">
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
                  {titleAndCompany && (
                    <p className="text-gray-600 mt-1">{titleAndCompany}</p>
                  )}
                </div>
              </div>
              <hr className="my-6" />
              {testimonial.type === TestimonialType.VIDEO && testimonial.videoUrl && (
                <div className="mb-6">
                  <video 
                    src={testimonial.videoUrl} 
                    controls 
                    className="w-full rounded-lg shadow-md" 
                  />
                </div>
              )}
              <p className="text-gray-800 text-lg mb-6">{testimonial.content}</p>
              {testimonial.rating && (
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < testimonial.rating!
                          ? "text-yellow-400 fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}
              {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {testimonial.attachedImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Attached image ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
              <div className="text-gray-400 text-sm">
                {format(new Date(testimonial.createdAt), 'MMM dd, yyyy')}
              </div>
            </>
          ) : (
            <p className="text-lg text-center">No testimonial data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <>
      <div className="flex items-start space-x-4 mb-6">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-px w-full my-6" />
      <Skeleton className="h-48 w-full mb-6 rounded-lg" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-5/6 mb-2" />
      <Skeleton className="h-6 w-4/6 mb-6" />
      <Skeleton className="h-4 w-1/4" />
    </>
  );
}

