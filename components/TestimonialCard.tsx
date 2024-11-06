// //components/TestimonialCard.tsx
// import React from 'react';
// import { Star, Video } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { TestimonialType, Testimonial as TestimonialInterface, ExtraInformationItem } from '@/types/testimonial';

// interface TestimonialCardProps {
//   testimonial: TestimonialInterface;
// }

// export function TestimonialCard({ testimonial }: TestimonialCardProps) {
//   let extraInformation: ExtraInformationItem[] = [];
  
//  if (Array.isArray(testimonial.extraInformation)) {
//     extraInformation = testimonial.extraInformation;
//   }

//   const name = extraInformation.find(item => item.label === 'Name')?.value || 'Anonymous';

//   return (
//     <Card key={testimonial.id} className="mb-4">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between">
//           <span>{name}</span>
//           {testimonial.type === TestimonialType.VIDEO && <Video className="h-5 w-5" />}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {testimonial.rating && (
//           <div className="flex mb-2">
//             {[...Array(testimonial.rating)].map((_, i) => (
//               <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//             ))}
//           </div>
//         )}
//         {testimonial.type === TestimonialType.TEXT && (
//           <p className="mb-4">{testimonial.content}</p>
//         )}
//         {testimonial.type === TestimonialType.VIDEO && testimonial.videoUrl && (
//           <div className="mb-4">
//             <video src={testimonial.videoUrl} controls className="w-full" />
//           </div>
//         )}
//         {testimonial.photo && (
//           <div className="mb-4">
//             <img src={testimonial.photo} alt="Testimonial photo" className="w-full h-auto" />
//           </div>
//         )}
//         {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
//           <div className="grid grid-cols-2 gap-2 mb-4">
//             {testimonial.attachedImages.map((image, index) => (
//               <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-full h-auto" />
//             ))}
//           </div>
//         )}
//         {extraInformation.length > 0 && (
//           <div className="mt-4">
//             <h4 className="font-semibold mb-2">Additional Information:</h4>
//             {extraInformation.map((item) => (
//               <p key={item.id}>
//                 <span className="font-medium">{item.label}:</span> {item.value.toString()}
//               </p>
//             ))}
//           </div>
//         )}
//         <div className="mt-4 text-sm text-gray-500">
//           Created: {new Date(testimonial.createdAt).toLocaleString()}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export function TestimonialList({ testimonials }: { testimonials: TestimonialInterface[] }) {
//   return (
//     <div className="grid  gap-6">
//       {testimonials.map((testimonial) => (
//         <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//       ))}
//     </div>
//   );
// }

// //components/TestimonialCard.tsx
// import React from 'react';
// import { Star, Video, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { TestimonialType, Testimonial as TestimonialInterface, ExtraInformationItem } from '@/types/testimonial';

// interface TestimonialCardProps {
//   testimonial: TestimonialInterface;
// }

// export function TestimonialCard({ testimonial }: TestimonialCardProps) {
//   let extraInformation: ExtraInformationItem[] = [];
  
//   if (Array.isArray(testimonial.extraInformation)) {
//     extraInformation = testimonial.extraInformation;
//   }

//   const name = extraInformation.find(item => item.label === 'Name')?.value || 'Anonymous';
//   const email = extraInformation.find(item => item.label === 'Email')?.value || '';
//   const company = extraInformation.find(item => item.label === 'Company')?.value || '';

//   return (
//     <Card className="w-full">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//       <CardTitle className="flex items-center justify-between">
//           <span>{name}</span>
//           {testimonial.type === TestimonialType.VIDEO && <Video className="h-5 w-5" />}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-start space-x-4">
//           {testimonial.photo && (
//           <div className="mb-4">
//             <img src={testimonial.photo} alt="Testimonial photo" className="w-12 h-12 rounded-full" />
//           </div>
//           )}
//           <div>
//             <h3 className="font-semibold">{name}</h3>
//           </div>
//         </div>
//         {testimonial.rating && (
//           <div className="flex items-center mt-2">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className={`h-5 w-5 ${i < testimonial.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//             ))}
//           </div>
//         )}
//         <div className="mt-4">
//           {testimonial.type === TestimonialType.TEXT ? (
//             <p className="text-gray-700">{testimonial.content}</p>
//           ) : testimonial.videoUrl && (
//             <video src={testimonial.videoUrl} controls className="w-full rounded-lg" />
//           )}
//         </div>
//         {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
//           <div className="grid grid-cols-2 gap-2 mt-4">
//             {testimonial.attachedImages.map((image, index) => (
//               <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-full h-auto rounded-lg" />
//             ))}
//           </div>
//         )}
//         {extraInformation.length > 0 && (
//           <div className="mt-4">
//             <h4 className="font-semibold mb-2">Additional Information:</h4>
//             {extraInformation.map((item) => (
//               <p key={item.id}>
//                 <span className="font-medium">{item.label}:</span> {item.value.toString()}
//               </p>
//             ))}
//           </div>
//         )}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <div className="flex space-x-2 text-sm text-gray-500">
//           <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="ghost" size="sm">
//             <ThumbsUp className="h-4 w-4 mr-2" />
//             Like
//           </Button>
//           <Button variant="ghost" size="sm">
//             <MessageSquare className="h-4 w-4 mr-2" />
//             Comment
//           </Button>
//           <Button variant="ghost" size="sm">
//             <Share2 className="h-4 w-4 mr-2" />
//             Share
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }


// //components/TestimonialCard.tsx
// import React from 'react';
// import { Heart, MessageSquare, Share2, CheckCircle, Star } from 'lucide-react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { TestimonialType, Testimonial as TestimonialInterface, ExtraInformationItem } from '@/types/testimonial';

// interface TestimonialCardProps {
//   testimonial: TestimonialInterface;
// }

// export function TestimonialCard({ testimonial }: TestimonialCardProps) {
//   const extraInformation = Array.isArray(testimonial.extraInformation) 
//     ? testimonial.extraInformation 
//     : [];

//   const getExtraInfoValue = (label: string) => 
//     extraInformation.find(item => item.label === label)?.value || '';

//   return (
//     <Card className="w-72 p-8">
//       <CardContent className="p-6">
//         <div className="flex w-full items-center">
//           <div className="relative">
//             <span className="px-5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600 text-left">
//               {testimonial.type === TestimonialType.VIDEO ? 'Video' : 'Text'}
//             </span>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <span className="absolute -top-1 -left-2 bg-white rounded-full">
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   </span>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p className="text-xs font-medium">User gave the permission</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//           <Button variant="ghost" className="ml-auto" aria-label="Like">
//             <Heart className="w-6 h-6 text-red-600 hover:text-red-400" />
//           </Button>
//         </div>

        
//         {testimonial.rating && (
//           <div className="flex items-center mt-2">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className={`h-5 w-5 ${i < testimonial.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//             ))}
//           </div>
//         )}
//         {/* <div className="mt-4 text-gray-800 dark:text-gray-200 font-semibold w-full">
//           <div className="text-sm font-normal text-left cursor-pointer break-words">
//             <p>{testimonial.content}</p>
//           </div>
//         </div> */}

//         <div className="mt-4">
//           {testimonial.type === TestimonialType.TEXT ? (
//             <p className="text-gray-700">{testimonial.content}</p>
//           ) : testimonial.videoUrl && (
//             <video src={testimonial.videoUrl} width={400} controls className="w-60 h-50 rounded-lg" />
//           )}
//         </div>
//         {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
//           <div className="grid grid-cols-2 gap-2 mt-4">
//             {testimonial.attachedImages.map((image, index) => (
//               <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-40 h-20 rounded-lg" />
//             ))}
//           </div>
//         )}

//         <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 mt-4">

//           {extraInformation.map((item) => (

//             <ExtraInfoItem key={item.id} label={item.label} value={item.value.toString()} />
//           ))}
//           <ExtraInfoItem label="Submitted at" value={new Date(testimonial.createdAt).toLocaleString()} />
//         </div>

//         <div className="mt-6 flex justify-end">
//           <Button variant="ghost" size="sm" className="mr-2">
//             <MessageSquare className="h-4 w-4 mr-2" />
//             Comment
//           </Button>
//           <Button variant="ghost" size="sm">
//             <Share2 className="h-4 w-4 mr-2" />
//             Share
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function ExtraInfoItem({ label, value, isLink = false }: { label: string; value: string; isLink?: boolean }) {
//   return (
//     <div className="ml-0 text-sm text-left">
//       <p className="text-gray-400 font-semibold dark:text-gray-300 capitalize">{label}</p>
//       <p className="break-words font-medium text-gray-600 dark:text-gray-200">
//         {isLink ? (
//           <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
//         ) : (
//           value
//         )}
//       </p>
//     </div>
//   );
// }

//components/TestimonialCard.tsx
import React from 'react';
import { Heart, MessageSquare, Share2, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TestimonialType, Testimonial as TestimonialInterface, ExtraInformationItem } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: TestimonialInterface;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const extraInformation = Array.isArray(testimonial.extraInformation) 
    ? testimonial.extraInformation 
    : [];

  const getExtraInfoValue = (label: string) => 
    extraInformation.find(item => item.label === label)?.value || '';

  return (

    <div className="collapsible mb-4 bg-purple-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-150 rounded-lg 2xl:w-3/4 2xl:mx-auto shadow-lg">
      <div className="block focus:outline-none transition duration-150 ease-in-out hover:cursor-pointer w-full">
        <Card>
          <CardContent className="px-4 py-4 sm:px-6">
            <div className="items-center">
              <div className="flex w-full">
                <div className="relative">
                  <span className="px-5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600 text-left">
                    {testimonial.type === TestimonialType.VIDEO ? 'Video' : 'Text'}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="absolute -top-1 -left-2 bg-white rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs font-medium">User gave the permission</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Button variant="ghost" className="ml-auto" aria-label="Like">
                  <Heart className="w-6 h-6 text-red-600 hover:text-red-400" />
                </Button>
              </div>

              <div className="text-base font-medium text-gray-900 text-left">
                <div className="mt-4 text-gray-800 dark:text-gray-200 font-semibold dark:hover:text-gray-300 focus:outline-none w-full items-cente">
                  <div className="mb-2">
                    {testimonial.rating && (
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < testimonial.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      )}
                  </div>
                  <div className="text-sm font-normal text-left cursor-pointer break-words undefined">
                      <div className="mt-4">
                        {testimonial.type === TestimonialType.TEXT ? (
                          <p className="text-gray-700">{testimonial.content}</p>
                        ) : testimonial.videoUrl && (
                          <video src={testimonial.videoUrl} width={400} controls className="rounded-lg" />
                        )}
                      </div>
                  </div>
                  
                    
                  {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-4 gap-4">
                          {testimonial.attachedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-40 h-20 rounded-lg" />
                          ))}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 mt-4">
                      {extraInformation.map((item) => (
                        <ExtraInfoItem key={item.id} label={item.label} value={item.value.toString()} />
                      ))}
                      <ExtraInfoItem label="Submitted at" value={new Date(testimonial.createdAt).toLocaleString()} />
                    </div>  
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="ghost" size="sm" className="mr-2">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ExtraInfoItem({ label, value, isLink = false }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="ml-0 text-sm text-left">
      <p className="text-gray-400 font-semibold dark:text-gray-300 capitalize">{label}</p>
      <p className="break-words font-medium text-gray-600 dark:text-gray-200">
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
        ) : (
          value
        )}
      </p>
    </div>
  );
}



{/* <div>
  card---
  <div class="collapsible mb-4 bg-purple-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-150 rounded-lg 2xl:w-3/4 2xl:mx-auto shadow-lg">
    <div class="block focus:outline-none transition duration-150 ease-in-out hover:cursor-pointer w-full">
      <div class="px-4 py-4 sm:px-6">
        <div class="items-center">
          <div class="flex w-full">
            <div class="relative">
              <span class="px-5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600 text-left">Text</span>
              <span class="absolute -top-1 -left-2 bg-white rounded-full" data-tip="true" data-for="permitted-tooltip" currentitem="false">
            </div>
          </div>

          //----content
          <div className="text-base font-medium text-gray-900 text-left">
            <div>
              <div className="mt-4 text-gray-800 dark:text-gray-200 font-semibold dark:hover:text-gray-300 focus:outline-none w-full items-cente">
                <div className="mb-2">
                 star
                </div>
                <div class="text-sm font-normal text-left cursor-pointer break-words undefined">
                 content
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="col-span-1 cursor-pointer">
                    <div>
                     attachedcontent
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 mt-4">
                  <div className="ml-0 text-sm text-left>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>  
  </div>
</div> */}