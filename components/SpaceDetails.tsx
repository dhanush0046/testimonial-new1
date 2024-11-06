// import React, { useState } from 'react';
// import Image from 'next/image';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Space } from '@/types/space';
// import { Testimonial } from '@/types/testimonial';
// import TestimonialCard from '@/components/TestimonialCard';

// interface SpaceDetailsProps {
//   space: Space;
//   onBack: () => void;
// }

// export default function SpaceDetails({ space, onBack }: SpaceDetailsProps) {
//   const [activeTab, setActiveTab] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   // This should be fetched from an API in a real application
//   const testimonials: Testimonial[] = [];

//   const filteredTestimonials = testimonials.filter(testimonial => {
//     if (activeTab === 'all') return true;
//     if (activeTab === 'video') return testimonial.type === 'video';
//     if (activeTab === 'text') return testimonial.type === 'text';
//     if (activeTab === 'liked') return testimonial.isLiked;
//     if (activeTab === 'archived') return testimonial.isArchived;
//     if (activeTab === 'spam') return testimonial.isSpam;
//     return true;
//   }).filter(testimonial =>
//     testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     testimonial.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Button onClick={onBack} className="mb-4">Back to Dashboard</Button>
//       <div className="flex items-center mb-6">
//         <Image
//           src={space.logo || '/placeholder.svg'}
//           alt={space.spaceName}
//           width={64}
//           height={64}
//           className="rounded-full mr-4"
//         />
//         <div>
//           <h1 className="text-3xl font-bold">{space.spaceName}</h1>
//           <div className="flex space-x-4 mt-2">
//             {/* <span>Video credits: {space.videoCredits}</span>
//             <span>Text credits: {space.textCredits}</span> */}
//           </div>
//         </div>
//         <Button variant="outline" className="ml-auto">Edit space</Button>
//       </div>
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="video">Video</TabsTrigger>
//           <TabsTrigger value="text">Text</TabsTrigger>
//           <TabsTrigger value="liked">Liked</TabsTrigger>
//           <TabsTrigger value="archived">Archived</TabsTrigger>
//           <TabsTrigger value="spam">Spam</TabsTrigger>
//         </TabsList>
//         <TabsContent value={activeTab}>
//           <Input
//             type="text"
//             placeholder="Search testimonials"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mb-4"
//           />
//           {filteredTestimonials.map((testimonial) => (
//             <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//           ))}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }