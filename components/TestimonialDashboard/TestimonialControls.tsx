import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, ChevronDown, Video, MessageSquare, ImportIcon, Download, TagIcon, EditIcon } from 'lucide-react';

interface TestimonialControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function TestimonialControls({ searchTerm, setSearchTerm }: TestimonialControlsProps) {
  return (
    <div className="flex-1 flex justify-between mb-5 pt-4 2xl:w-3/4 2xl:mx-auto">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ReviewToneButton />
      <OptionsDropdown />
    </div>
  );
}

function SearchInput({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void }) {
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