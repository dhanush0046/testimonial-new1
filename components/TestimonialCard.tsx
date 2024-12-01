// //components/TestimonialCard.tsx -- new update testing
// "use client"

// import React, { useState, useMemo } from 'react';
// import { Heart, Tag, CheckCircle2, Star, ChevronUp } from 'lucide-react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { TestimonialType, Testimonial as TestimonialInterface, ExtraInformationItem } from '@/types/testimonial';
// import { TestimonialActions } from '@/components/TestimonialActions';

// interface TestimonialCardProps {
//   testimonial: TestimonialInterface;
//   spaceId: string;
//   spaceTags: string[];
//   onLike: (id: string) => void;
//   onArchive: (id: string) => void;
//   onHighlight: (id: string) => void;
//   onDelete: (id: string) => void;
//   onTag: (id: string, tagNames: string[]) => void;
//   activeTab: string;
// }

// export function TestimonialCard({ 
//   testimonial, 
//   spaceId, 
//   spaceTags, 
//   onLike, 
//   onArchive, 
//   onHighlight, 
//   onDelete, 
//   onTag, 
//   activeTab 
// }: TestimonialCardProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [localTestimonial, setLocalTestimonial] = useState(testimonial);

//   const extraInformation = useMemo(() => {
//     return Array.isArray(localTestimonial.extraInformation) 
//       ? localTestimonial.extraInformation 
//       : [];
//   }, [localTestimonial.extraInformation]);

//   const displayedTags = useMemo(() => {
//     return (localTestimonial.tags || []).filter(tag => spaceTags.includes(tag));
//   }, [localTestimonial.tags, spaceTags]);

//   const handleLike = () => {
//     setLocalTestimonial(prev => ({ ...prev, isLiked: !prev.isLiked }));
//     onLike(localTestimonial.id);
//   };

//   const handleHighlight = () => {
//     if (localTestimonial.isLiked) {
//       setLocalTestimonial(prev => ({ ...prev, isHighlighted: !prev.isHighlighted }));
//       onHighlight(localTestimonial.id);
//     }
//   };

//   const handleArchive = () => {
//     onArchive(localTestimonial.id);
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   const handleTagSelect = (tagNames: string[]) => {
//     setLocalTestimonial(prev => ({ ...prev, tags: tagNames }));
//     onTag(localTestimonial.id, tagNames);
//   }

//   const handleDelete = () => onDelete(localTestimonial.id);

//   const handleEdit = () => console.log('Edit action');
//   const handleShare = () => console.log('Share action');
//   const handleIncentivize = () => console.log('Incentivize action');
//   const handleDownload = () => console.log('Download action');
//   const handleAI = () => console.log('AI action');
//   const handleSendMessage = () => console.log('Send a Message');
//   const handleCopyToClipboard = () => console.log('Copy To Clipboard');
//   const handleSubtitles = () => console.log('Subtitles');
//   const handleDownloadLog = () => console.log('Download Log');
//   const handleDuplicate = () => console.log('Duplicate');

//   const testimonialEmail = useMemo(() => {
//     return extraInformation.find((item: ExtraInformationItem) => item.id === 'email')?.value as string | undefined;
//   }, [extraInformation]);

//   return (
//     <div className="collapsible mb-4 bg-purple-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-150 rounded-lg 2xl:w-3/4 2xl:mx-auto shadow-lg">
//       <div className="block focus:outline-none transition duration-150 ease-in-out hover:cursor-pointer w-full">
//         <Card>
//           <CardContent className="px-4 py-4 sm:px-6">
//             <div className="items-center">
//               <div className="flex w-full items-center justify-between">
//                 <div className="relative">
//                   {localTestimonial.permissionGranted && (
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <span className="absolute -top-2 -left-2 bg-white rounded-full">
//                             <CheckCircle2 className="h-5 w-5 text-green-500" />
//                           </span>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p className="text-xs font-medium">User gave permission</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   )}
//                   {localTestimonial.isLiked && !localTestimonial.isHighlighted && (
//                     <span className="absolute -top-2 -right-2 rounded-full">
//                       <Heart className="h-5 w-5 text-red-500 fill-current" />
//                     </span>
//                   )}

//                   {localTestimonial.isHighlighted && (
//                     <span className="absolute -top-2 -right-2 rounded-full">
//                       <Star className="h-5 w-5 text-indigo-600 fill-current" />
//                     </span>
//                   )}

//                   <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600">
//                     {localTestimonial.type === TestimonialType.VIDEO ? 'Video' : 'Text'}
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   {localTestimonial.isLiked && (
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className={`mr-2 ${localTestimonial.isHighlighted ? 'text-indigo-600' : 'text-gray-400'}`}
//                       onClick={handleHighlight}
//                       aria-label="Highlight"
//                     >
//                       <Star className={`h-6 w-6 ${localTestimonial.isHighlighted ? 'fill-current' : ''}`} />
//                     </Button>
//                   )}
//                   <Button 
//                     variant="ghost" 
//                     size="sm"
//                     className={`${localTestimonial.isLiked ? 'text-red-600' : 'text-gray-400'}`} 
//                     onClick={handleLike}
//                     aria-label="Like"
//                   >
//                     <Heart className={`h-6 w-6 ${localTestimonial.isLiked ? 'fill-current' : ''}`} />
//                   </Button>
//                 </div>
//               </div>

//               <div className="text-base font-medium text-gray-900 text-left mt-4">
//                 <div className="text-gray-800 dark:text-gray-200 font-semibold dark:hover:text-gray-300 focus:outline-none w-full items-center">
//                   <div className="text-sm font-normal text-left cursor-pointer break-words">
//                     <p className="text-gray-700">{localTestimonial.content}</p>
//                   </div>
                  
//                   {localTestimonial.type === TestimonialType.VIDEO && localTestimonial.videoUrl && (
//                     <div className="mt-4">
//                       <video src={localTestimonial.videoUrl} width={200} controls className="rounded-lg" />
//                     </div>
//                   )}
                  
//                   {localTestimonial.attachedImages && localTestimonial.attachedImages.length > 0 && (
//                     <div className="mt-4 grid grid-cols-4 gap-4">
//                       {localTestimonial.attachedImages.map((image, index) => (
//                         <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-40 h-20 rounded-lg" />
//                       ))}
//                     </div>
//                   )}

//                   <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 mt-4">
//                     {extraInformation.map((item) => (
//                       <ExtraInfoItem key={item.id} label={item.label} value={item.value.toString()} />
//                     ))}
//                     <ExtraInfoItem label="Submitted at" value={new Date(localTestimonial.createdAt).toLocaleString()} />
//                   </div>  
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-between items-center">
//                 <div className="flex items-center">
//                   {localTestimonial.rating && (
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className={`h-5 w-5 ${i < localTestimonial.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Display tags only if space has tags and there are matching testimonial tags */}
//               {spaceTags.length > 0 && displayedTags.length > 0 && !localTestimonial.isArchived && (
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {displayedTags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
//                     >
//                       <Tag className="w-3 h-3 mr-1" />
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               <div className="ml-auto flex justify-end px-5">
//                   <Button variant="ghost" size="sm" onClick={toggleExpand}>
//                     <ChevronUp className={`h-4 w-4 ${isExpanded ? 'transform rotate-180' : ''}`} />
//                   </Button> 
//               </div>
//               <div className={`flex space-x-2 transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//                 <TestimonialActions 
//                   testimonialType={localTestimonial.type} 
//                   testimonialEmail={testimonialEmail}
//                   isArchived={localTestimonial.isArchived}
//                   activeTab={activeTab}
//                   spaceId={spaceId}
//                   testimonialId={localTestimonial.id}
//                   onTag={handleTagSelect}
//                   onDelete={handleDelete} 
//                   onEdit={handleEdit}
//                   onShare={handleShare}
//                   onIncentivize={handleIncentivize}
//                   onDownload={handleDownload}
//                   onAI={handleAI}
//                   onSendMessage={handleSendMessage}
//                   onSubtitles={handleSubtitles}
//                   onCopyToClipboard={handleCopyToClipboard}
//                   onArchive={handleArchive}
//                   onDownloadLog={handleDownloadLog}
//                   onDuplicate={handleDuplicate}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
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

//components/TestimonialCard.tsx -- new update testing
"use client"

import React, { useState, useMemo } from 'react';
import { Heart, Tag, CheckCircle2, Star, ChevronUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TestimonialType, Testimonial as TestimonialInterface, ExtraInformationItem } from '@/types/testimonial';
import { TestimonialActions } from '@/components/TestimonialActions/Index';

interface TestimonialCardProps {
  testimonial: TestimonialInterface;
  spaceId: string;
  spaceName: string;
  spaceTags: string[];
  onLike: (id: string) => void;
  onArchive: (id: string) => void;
  onHighlight: (id: string) => void;
  onDelete: (id: string) => void;
  onTag: (id: string, tagNames: string[]) => void;
  activeTab: string;
}

export function TestimonialCard({ 
  testimonial, 
  spaceId, 
  spaceName,
  spaceTags, 
  onLike, 
  onArchive, 
  onHighlight, 
  onDelete, 
  onTag, 
  activeTab 
}: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localTestimonial, setLocalTestimonial] = useState(testimonial);

  const extraInformation = useMemo(() => {
    return Array.isArray(localTestimonial.extraInformation) 
      ? localTestimonial.extraInformation 
      : [];
  }, [localTestimonial.extraInformation]);

  const displayedTags = useMemo(() => {
    return (localTestimonial.tags || []).filter(tag => spaceTags.includes(tag));
  }, [localTestimonial.tags, spaceTags]);

  const handleLike = () => {
    setLocalTestimonial(prev => ({ ...prev, isLiked: !prev.isLiked }));
    onLike(localTestimonial.id);
  };

  const handleHighlight = () => {
    if (localTestimonial.isLiked) {
      setLocalTestimonial(prev => ({ ...prev, isHighlighted: !prev.isHighlighted }));
      onHighlight(localTestimonial.id);
    }
  };

  const handleArchive = () => {
    onArchive(localTestimonial.id);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleTagSelect = (tagNames: string[]) => {
    setLocalTestimonial(prev => ({ ...prev, tags: tagNames }));
    onTag(localTestimonial.id, tagNames);
  }

  const handleDelete = () => onDelete(localTestimonial.id);

  const handleEdit = () => console.log('Edit action');
  const handleIncentivize = () => console.log('Incentivize action');
  const handleDownload = () => console.log('Download action');
  const handleAI = () => console.log('AI action');
  const handleSendMessage = () => console.log('Send a Message');
  const handleCopyToClipboard = () => console.log('Copy To Clipboard');
  const handleSubtitles = () => console.log('Subtitles');
  const handleDownloadLog = () => console.log('Download Log');
  const handleDuplicate = () => console.log('Duplicate');

  const handleGetLink = () => console.log('Get the link');
  const handleEmbed = () => console.log('Embed the testimonial');
  const handleCreateImage = () => console.log('Create an image');

  const testimonialEmail = useMemo(() => {
    return extraInformation.find((item: ExtraInformationItem) => item.id === 'email')?.value as string | undefined;
  }, [extraInformation]);

  return (
    <div className="collapsible mb-4 bg-purple-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-150 rounded-lg 2xl:w-3/4 2xl:mx-auto shadow-lg">
      <div className="block focus:outline-none transition duration-150 ease-in-out hover:cursor-pointer w-full">
        <Card>
          <CardContent className="px-4 py-4 sm:px-6">
            <div className="items-center">
              <div className="flex w-full items-center justify-between">
                <div className="relative">
                  {localTestimonial.permissionGranted && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="absolute -top-2 -left-2 bg-white rounded-full">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs font-medium">User gave permission</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {localTestimonial.isLiked && !localTestimonial.isHighlighted && (
                    <span className="absolute -top-2 -right-2 rounded-full">
                      <Heart className="h-5 w-5 text-red-500 fill-current" />
                    </span>
                  )}

                  {localTestimonial.isHighlighted && (
                    <span className="absolute -top-2 -right-2 rounded-full">
                      <Star className="h-5 w-5 text-indigo-600 fill-current" />
                    </span>
                  )}

                  <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600">
                    {localTestimonial.type === TestimonialType.VIDEO ? 'Video' : 'Text'}
                  </span>
                </div>
                <div className="flex items-center">
                  {localTestimonial.isLiked && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`mr-2 ${localTestimonial.isHighlighted ? 'text-indigo-600' : 'text-gray-400'}`}
                      onClick={handleHighlight}
                      aria-label="Highlight"
                    >
                      <Star className={`h-6 w-6 ${localTestimonial.isHighlighted ? 'fill-current' : ''}`} />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`${localTestimonial.isLiked ? 'text-red-600' : 'text-gray-400'}`} 
                    onClick={handleLike}
                    aria-label="Like"
                  >
                    <Heart className={`h-6 w-6 ${localTestimonial.isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              <div className="text-base font-medium text-gray-900 text-left mt-4">
                <div className="text-gray-800 dark:text-gray-200 font-semibold dark:hover:text-gray-300 focus:outline-none w-full items-center">
                  <div className="text-sm font-normal text-left cursor-pointer break-words">
                    <p className="text-gray-700">{localTestimonial.content}</p>
                  </div>
                  
                  {localTestimonial.type === TestimonialType.VIDEO && localTestimonial.videoUrl && (
                    <div className="mt-4">
                      <video src={localTestimonial.videoUrl} width={200} controls className="rounded-lg" />
                    </div>
                  )}
                  
                  {localTestimonial.attachedImages && localTestimonial.attachedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      {localTestimonial.attachedImages.map((image, index) => (
                        <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-40 h-20 rounded-lg" />
                      ))}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 mt-4">
                    {extraInformation.map((item) => (
                      <ExtraInfoItem key={item.id} label={item.label} value={item.value.toString()} />
                    ))}
                    <ExtraInfoItem label="Submitted at" value={new Date(localTestimonial.createdAt).toLocaleString()} />
                  </div>  
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center">
                  {localTestimonial.rating && (
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < localTestimonial.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Display tags only if space has tags and there are matching testimonial tags */}
              {spaceTags.length > 0 && displayedTags.length > 0 && !localTestimonial.isArchived && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {displayedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="ml-auto flex justify-end px-5">
                  <Button variant="ghost" size="sm" onClick={toggleExpand}>
                    <ChevronUp className={`h-4 w-4 ${isExpanded ? 'transform rotate-180' : ''}`} />
                  </Button> 
              </div>
              <div className={`flex space-x-2 transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <TestimonialActions 
                  testimonialType={localTestimonial.type} 
                  testimonialEmail={testimonialEmail}
                  isArchived={localTestimonial.isArchived}
                  activeTab={activeTab}
                  spaceId={spaceId}
                  spaceName={spaceName}
                  testimonialId={localTestimonial.id}
                  testimonial={localTestimonial}
                  onTag={handleTagSelect}
                  onDelete={handleDelete} 
                  onEdit={handleEdit}
                  onIncentivize={handleIncentivize}
                  onDownload={handleDownload}
                  onAI={handleAI}
                  onSendMessage={handleSendMessage}
                  onSubtitles={handleSubtitles}
                  onCopyToClipboard={handleCopyToClipboard}
                  onArchive={handleArchive}
                  onDownloadLog={handleDownloadLog}
                  onDuplicate={handleDuplicate}

                  onGetLink={handleGetLink}
                  onEmbed={handleEmbed}
                  onCreateImage={handleCreateImage}
                />
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