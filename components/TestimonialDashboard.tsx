// // //components/TestimonialDashboard.tsx

// import React, { useState, useEffect } from 'react';
// import Header from "@/components/Header"
// import { Settings, Video, MessageSquare, Search, ChevronDown, Heart, Archive, AlertTriangle, ImportIcon,TagIcon,EditIcon,Download } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Testimonial, TestimonialType, ExtraInformationItem } from '@/types/testimonial';
// import { TestimonialCard } from "@/components/TestimonialCard";
// import { Sidebar } from "@/components/SpaceSidebar";

// interface TestimonialDashboardProps {
//   spaceName: string;
//   spaceId: string;
//   spaceLogo: string | null;
// }

// export default function TestimonialDashboard({ spaceName, spaceId, spaceLogo }: TestimonialDashboardProps) {
//   const [activeTab, setActiveTab] = useState('all');
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen((prev) => !prev);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`/api/get-testimonials?spaceId=${spaceId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch testimonials');
//         }
//         const data = await response.json();
//         setTestimonials(data);
//       } catch (err) {
//         setError('Error fetching testimonials. Please try again later.');
//         console.error('Error fetching testimonials:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, [spaceId]);

//   const filteredTestimonials = testimonials.filter(testimonial => 
//     (activeTab === 'all' || 
//      (activeTab === 'video' && testimonial.type === TestimonialType.VIDEO) ||
//      (activeTab === 'text' && testimonial.type === TestimonialType.TEXT) ||
//      (activeTab === 'liked' && testimonial.isLiked) ||
//      (activeTab === 'archived' && testimonial.isArchived) ||
//      (activeTab === 'spam' && testimonial.isSpam)) &&
//     (testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//      (Array.isArray(testimonial.extraInformation) && testimonial.extraInformation.some(item => 
//        (item as ExtraInformationItem).value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//      )))
//   );

//   const videoCount = testimonials.filter(t => t.type === TestimonialType.VIDEO).length;
//   const textCount = testimonials.filter(t => t.type === TestimonialType.TEXT).length;

//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
//       <header className="absolute w-full z-30 bg-white border-b border-gray-200">
//         <Header />
//       </header>
//         <header className='bg-gray-100 dark:bg-gray-900 py-8 mt-20 border-b border-gray-50 dark:border-gray-800'>
//           <div className="mx-4 md:mx-auto container lg:flex lg:items-center lg:justify-between ">
//             <div className="min-w-0 flex-1">
//               <div className="flex justify-center sm:justify-start items-center">
//                 {spaceLogo && (
//                   <img src={spaceLogo} alt="Space logo" className="rounded-lg w-auto h-16 mr-5 border border-gray-200 dark:border-gray-800" />
//                 )}
//                 <div className="flex flex-col justify-center">
//                   <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:tracking-tight flex items-center">
//                     <span>{spaceName}</span>
//                   </h1>
//                 </div>
//               </div>
//             </div>
//             <div className="hidden sm:flex justify-center sm:justify-start mt-4 lg:my-auto xl:ml-4">
//               <span className="block">
//                 <div className="flex flex-col">
//                   <dt className="flex">
//                     <Video className="h-5 w-5 mr-2" />
//                     <p className="ml-2 text-sm font-medium">Video credits</p>
//                   </dt>
//                   <dd className="pl-7">
//                     <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{videoCount}</p>
//                   </dd>
//                 </div>
//               </span>
//               <span className="pl-10 block">
//                 <div className="flex flex-col">
//                   <dt className="flex">
//                     <MessageSquare className="h-5 w-5 mr-2" />
//                     <p className="ml-2 text-sm font-medium">Text credits</p>
//                   </dt>
//                   <dd className="pl-7">
//                     <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{textCount}</p>
//                   </dd>
//                 </div>
//               </span>
//               <span className="pl-10 block">
//                 <Button variant="outline" className="inline-flex items-center">
//                   <Settings className="mr-2 h-5 w-5" />
//                   Edit space
//                 </Button>
//               </span>
//             </div>
//           </div>
//         </header>

//       <div className="grid md:grid-cols-12 sm:grid-cols-1">
//         <div className="mx-4 col-span-12 md:col-span-4 2xl:col-span-3">
//           <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//         </div>
       
//           <div className="pb-20 my-10 mx-4 col-span-12 md:col-span-8 2xl:col-span-9 overflow-auto">
//             <div className="flex-1 flex justify-between mb-5 py-4 2xl:w-3/4 2xl:mx-auto">
//                 <div className="flex-1 flex">
//                   <div className="w-full flex md:ml-0">
//                     <label htmlFor="search-field" className="sr-only">Search</label>
//                     <div className="relative w-full text-gray-600 dark:text-gray-200">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
//                         <Search className="h-5 w-5" />
//                       </div>
//                       <Input
//                         id="search-field"
//                         className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//                         placeholder="Search by name, email, or testimonial keywords"
//                         type="search"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="ml-2  border-gray-200 dark:border-gray-700">
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div className="relative opacity-50">
//                           <Button disabled className="inline-flex items-center justify-between w-[160px] border-2 border-gray-300 dark:border-gray-700">
//                             <span>Review tone</span>
//                             <ChevronDown className="h-4 w-4 opacity-50" />
//                           </Button>
//                         </div>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <div className="w-64">
//                           <p>Upgrade to the <a className="underline font-semibold text-white" href="/pricing" target="_blank">Ultimate</a> plan to enable sentiment analysis for your testimonials, allowing you to filter by sentiment ratings:</p>
//                           <ul className="mt-2 list-none">
//                             <li>😠 Very negative</li>
//                             <li>🙁 Negative</li>
//                             <li>😐 Neutral</li>
//                             <li>😀 Positive</li>
//                             <li>🤩 Very positive</li>
//                           </ul>
//                         </div>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </div>
//                 <div className="ml-2 flex flex-row-reverse">
//                   <div className="relative inline-block text-left z-10">
//                     <Button
//                       onClick={toggleDropdown}
//                       className="inline-flex items-center justify-between w-[120px] rounded-md dark:text-white border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 leading-5 px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//                       >
//                       <span>Options</span>
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="h-4 w-4 opacity-50"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg>
//                       <ChevronDown className="h-4 w-4 opacity-50" />
//                     </Button>
//                     {isOpen && (
//                       <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 z-10">
//                         <button className="group flex items-center px-4 py-2 text-sm w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
//                           <Video className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
//                           Add a video
//                         </button>
//                         <button className="group flex items-center px-4 py-2 text-sm w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
//                           <MessageSquare className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
//                           Add a text
//                         </button>       
//                         <a
//                           href="/pricing?ref=from-bulk-import"
//                           target="_blank"
//                           className="group flex items-center px-4 py-2 text-sm w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
//                         >
//                           <ImportIcon className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
//                           Bulk import
//                         </a>
//                         <button className="group flex items-center px-4 py-2 text-sm w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
//                           <Download className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
//                           Export to CSV
//                         </button>

//                         <button className="group flex items-center px-4 py-2 text-sm w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
//                           <TagIcon className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
//                           Manage tags
//                         </button>
//                         <button className="group flex items-center px-4 py-2 text-sm w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
//                           <EditIcon className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
//                           Bulk editor
//                         </button>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//             </div>

//               {isLoading && <p>Loading testimonials...</p>}
//               {error && <p className="text-red-500">{error}</p>}
//               {!isLoading && !error && (
//                 filteredTestimonials.length > 0 ? (
//                   <div className="space-y-6">
//                     {filteredTestimonials.map((testimonial) => (
//                       <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//                     ))}
//                   </div>
//                 ) : (
//                   <p>No testimonials found.</p>
//                 )
//               )}
//         </div>
//       </div>
//     </div>
//   );
// }


// //components/TestimonialDashboard.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Header from "@/components/Header";
import { Settings, Video, MessageSquare, Search, ChevronDown, Heart, Archive, AlertTriangle, ImportIcon, TagIcon, EditIcon, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Testimonial, TestimonialType, ExtraInformationItem } from '@/types/testimonial';
import { TestimonialCard } from "@/components/TestimonialCard";
import { Sidebar } from "@/components/SpaceSidebar";
import { useRouter } from 'next/navigation';

interface TestimonialDashboardProps {
  spaceName: string;
  spaceId: string;
  spaceLogo: string | null;
}

interface SpaceHeaderProps {
  spaceName: string;
  spaceLogo: string | null;
  videoCount: number;
  textCount: number;
}

interface SpaceStatsProps {
  videoCount: number;
  textCount: number;
}

interface TestimonialControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface TestimonialListProps {
  isLoading: boolean;
  error: string | null;
  filteredTestimonials: Testimonial[];
}

export default function TestimonialDashboard({ spaceName, spaceId, spaceLogo }: TestimonialDashboardProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/get-testimonials?spaceId=${spaceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (err) {
      setError('Error fetching testimonials. Please try again later.');
      console.error('Error fetching testimonials:', err);
    } finally {
      setIsLoading(false);
    }
  }, [spaceId]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const filteredTestimonials = testimonials.filter(testimonial => 
    (activeTab === 'all' || 
     (activeTab === 'video' && testimonial.type === TestimonialType.VIDEO) ||
     (activeTab === 'text' && testimonial.type === TestimonialType.TEXT) ||
     (activeTab === 'liked' && testimonial.isLiked) ||
     (activeTab === 'archived' && testimonial.isArchived) ||
     (activeTab === 'spam' && testimonial.isSpam)) &&
    (testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (Array.isArray(testimonial.extraInformation) && testimonial.extraInformation.some(item => 
       (item as ExtraInformationItem).value.toString().toLowerCase().includes(searchTerm.toLowerCase())
     )))
  );

  const videoCount = testimonials.filter(t => t.type === TestimonialType.VIDEO).length;
  const textCount = testimonials.filter(t => t.type === TestimonialType.TEXT).length;

  const handleEditSpace = () => {
    router.push(`/space/${spaceId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <header className="absolute w-full z-30 bg-white border-b border-gray-200">
        <Header />
      </header>
      <header className='bg-gray-100 dark:bg-gray-900 py-8 mt-20 border-b border-gray-50 dark:border-gray-800'>
        <div className="mx-4 md:mx-auto container lg:flex lg:items-center lg:justify-between">
          <SpaceHeader
            spaceName={spaceName}
            spaceLogo={spaceLogo}
            videoCount={videoCount}
            textCount={textCount}
            onEditSpace={handleEditSpace}

          />
        </div>
      </header>

      <div className="grid md:grid-cols-12 sm:grid-cols-1">
        <div className="mx-4 col-span-12 md:col-span-4 2xl:col-span-3">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
       
        <div className="pb-20 my-10 mx-4 col-span-12 md:col-span-8 2xl:col-span-9 overflow-auto">
          <TestimonialControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <TestimonialList
            isLoading={isLoading}
            error={error}
            filteredTestimonials={filteredTestimonials}
          />
        </div>
      </div>
    </div>
  );
}

function SpaceHeader({ spaceName, spaceLogo, videoCount, textCount, onEditSpace }: SpaceHeaderProps & { onEditSpace: () => void }) {
  return (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex justify-center sm:justify-start items-center">
          {spaceLogo && (
            <img src={spaceLogo} alt="Space logo" className="rounded-lg w-auto h-16 mr-5 border border-gray-200 dark:border-gray-800" />
          )}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:tracking-tight flex items-center">
              <span>{spaceName}</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex justify-center sm:justify-start mt-4 lg:my-auto xl:ml-4">
        <SpaceStats videoCount={videoCount} textCount={textCount} />
        <span className="pl-10 block">
          <Button variant="outline" className="inline-flex items-center" onClick={onEditSpace}>
            <Settings className="mr-2 h-5 w-5" />
            Edit space
          </Button>
        </span>
      </div>
    </>
  );
}

function SpaceStats({ videoCount, textCount }: SpaceStatsProps) {
  return (
    <>
      <span className="block">
        <div className="flex flex-col">
          <dt className="flex">
            <Video className="h-5 w-5 mr-2" />
            <p className="ml-2 text-sm font-medium">Video credits</p>
          </dt>
          <dd className="pl-7">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{videoCount}</p>
          </dd>
        </div>
      </span>
      <span className="pl-10 block">
        <div className="flex flex-col">
          <dt className="flex">
            <MessageSquare className="h-5 w-5 mr-2" />
            <p className="ml-2 text-sm font-medium">Text credits</p>
          </dt>
          <dd className="pl-7">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{textCount}</p>
          </dd>
        </div>
      </span>
    </>
  );
}

function TestimonialControls({ searchTerm, setSearchTerm }: TestimonialControlsProps) {
  return (
    <div className="flex-1 flex justify-between mb-5 py-4 2xl:w-3/4 2xl:mx-auto">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ReviewToneButton />
      <OptionsDropdown />
    </div>
  );
}

function SearchInput({ searchTerm, setSearchTerm }: SearchInputProps) {
  return (
    <div className="flex-1 flex">
      <div className="w-full flex md:ml-0">
        <label htmlFor="search-field" className="sr-only">Search</label>
        <div className="relative w-full text-gray-600 dark:text-gray-200">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
            <Search className="h-5 w-5" />
          </div>
          <Input
            id="search-field"
            className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Search by name, email, or testimonial keywords"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewToneButton() {
  return (
    <div className="ml-2 border-gray-200 dark:border-gray-700">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative opacity-50">
              <Button disabled className="inline-flex items-center justify-between w-[160px] border-2 border-gray-300 dark:border-gray-700">
                <span>Review tone</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="w-64">
              <p>Upgrade to the <a className="underline font-semibold text-white" href="/pricing" target="_blank">Ultimate</a> plan to enable sentiment analysis for your testimonials, allowing you to filter by sentiment ratings:</p>
              <ul className="mt-2 list-none">
                <li>😠 Very negative</li>
                <li>🙁 Negative</li>
                <li>😐 Neutral</li>
                <li>😀 Positive</li>
                <li>🤩 Very positive</li>
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function OptionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-[120px]"
      >
        <span>Options</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <DropdownItem icon={<Video />}>Add a video</DropdownItem>
            <DropdownItem icon={<MessageSquare />}>Add a text</DropdownItem>
            <DropdownItem icon={<ImportIcon />} href="/pricing?ref=from-bulk-import">Bulk import</DropdownItem>
            <DropdownItem icon={<Download />}>Export to CSV</DropdownItem>
            <DropdownItem icon={<TagIcon />}>Manage tags</DropdownItem>
            <DropdownItem icon={<EditIcon />}>Bulk editor</DropdownItem>
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, children, href }: { icon: React.ReactNode; children: React.ReactNode; href?: string }) {
  const content = (
    <>
      {icon}
      <span className="ml-3">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        role="menuitem"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      role="menuitem"
    >
      {content}
    </button>
  );
}

function TestimonialList({ isLoading, error, filteredTestimonials }: TestimonialListProps) {
  if (isLoading) return <p>Loading testimonials...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {filteredTestimonials.length > 0 ? (
        filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))
      ) : (
        <p>No testimonials found.</p>
      )}
    </div>
  );
}