// // //components/TestimonialActions.tsx
// "use client"

// import React from 'react'
// import { MoreHorizontal, Tag, Mail, Trash2, Bookmark, Send, Copy, FileText, Subtitles, Download, Edit, Share2, Gift, Sparkles } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown"
// import { TestimonialType } from '@/types/testimonial'

// interface TestimonialActionsProps {
//   testimonialType: TestimonialType
//   testimonialEmail?: string
//   isArchived: boolean
//   activeTab: string
//   onTag: () => void
//   onDelete: () => void
//   onEdit: () => void
//   onShare: () => void
//   onIncentivize: () => void
//   onDownload: () => void
//   onAI: () => void
//   onSendMessage: () => void
//   onCopyToClipboard: () => void
//   onSubtitles: () => void
//   onArchive: () => void
//   onDownloadLog: () => void
//   onDuplicate: () => void
// }

// export function TestimonialActions({
//   testimonialType,
//   testimonialEmail,
//   isArchived,
//   activeTab,
//   onTag,
//   onDelete,
//   onEdit,
//   onShare,
//   onIncentivize,
//   onDownload,
//   onAI,
//   onSendMessage,
//   onCopyToClipboard,
//   onSubtitles,
//   onArchive,
//   onDownloadLog,
//   onDuplicate,
// }: TestimonialActionsProps) {
//   const isLikedTab = activeTab === 'liked'
//   const isArchivedTab = activeTab === 'archived'

//   return (
//     <div className="flex flex-wrap">
//         {!isArchived && !isArchivedTab && (
//           <>
//             <Button size="sm" onClick={onTag} className="flex items-center px-2">
//               <Tag className="mr-1 h-4 w-4" />
//               Tag
//             </Button>
//             <Button size="sm" onClick={onIncentivize} className="flex items-center px-2">
//               <Gift className="mr-1 h-4 w-4" />
//               Incentivize
//             </Button>
//             <Button size="sm" onClick={onEdit} className="flex items-center px-2">
//               <Edit className="mr-1 h-4 w-4" />
//               Edit
//             </Button>
//             <Button size="sm" onClick={onShare} className="flex items-center px-2">
//               <Share2 className="mr-1 h-4 w-4" />
//               Share
//             </Button>
//             <Button size="sm" onClick={onDownload} className="flex items-center px-2">
//               <Download className="mr-1 h-4 w-4" />
//               Download
//             </Button>
//             <Button size="sm" onClick={onAI} className="flex items-center px-2">
//               <Sparkles className="mr-1 h-4 w-4" />
//               AI
//             </Button>
//           </>
//         )}
  
//         <Button size="sm" onClick={onDelete} className="flex items-center px-2">
//           <Trash2 className="mr-1 h-4 w-4" />
//           Delete
//         </Button>
  
//         {isArchived && isArchivedTab && (
//           <Button size="sm" onClick={onArchive} className="flex items-center px-2">
//             <Bookmark className="mr-1 h-4 w-4" />
//             Unarchive
//           </Button>
//         )}
  
//         {!isArchived && !isArchivedTab && (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button size="sm" className="flex items-center px-2">
//                 <MoreHorizontal className="mr-1 h-4 w-4" />
//                 More
//               </Button>
//             </DropdownMenuTrigger>
  
//             <DropdownMenuContent align="end" className="w-56">
//               {testimonialEmail && (
//                 <DropdownMenuItem onClick={() => window.location.href = `mailto:${testimonialEmail}`}>
//                   <Send className="mr-1 h-4 w-4" />
//                   <span>Send a message</span>
//                 </DropdownMenuItem>
//               )}
  
//               {testimonialType === TestimonialType.TEXT ? (
//                 <DropdownMenuItem onClick={onCopyToClipboard}>
//                   <Copy className="mr-1 h-4 w-4" />
//                   <span>Copy text to clipboard</span>
//                 </DropdownMenuItem>
//               ) : (
//                 <DropdownMenuItem onClick={onSubtitles}>
//                   <Subtitles className="mr-1 h-4 w-4" />
//                   <span>Subtitles</span>
//                 </DropdownMenuItem>
//               )}
  
//               {!isLikedTab && !isArchived && !isArchivedTab && (
//                 <DropdownMenuItem onClick={onArchive}>
//                   <Bookmark className="mr-1 h-4 w-4" />
//                   <span>Archive</span>
//                 </DropdownMenuItem>
//               )}
  
//               <DropdownMenuItem onClick={onDownloadLog}>
//                 <Download className="mr-1 h-4 w-4" />
//                 <span>Download testimonial log</span>
//               </DropdownMenuItem>
  
//               {!isArchived && !isArchivedTab && (
//                 <DropdownMenuItem onClick={onDuplicate}>
//                   <FileText className="mr-1 h-4 w-4" />
//                   <span>Duplicate to other spaces</span>
//                 </DropdownMenuItem>
//               )}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         )}
//     </div>
//   );
// }  

//components/TestimonialActions.tsx
"use client"

import React, { useState } from 'react'
import { MoreHorizontal, Tag, Mail, Trash2, Bookmark, Send, Copy, FileText, Subtitles, Download, Edit, Share2, Gift, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TestimonialType } from '@/types/testimonial'
import  TagSelectionDialog  from '@/components/TagSelectionDialog';
import ManageTagsDialog  from '@/components/SideBarHandles/ManageTagsDialog'

interface TestimonialActionsProps {
  testimonialType: TestimonialType
  testimonialEmail?: string
  isArchived: boolean
  activeTab: string
  spaceId: string
  testimonialId: string
  onTag: (tagNames: string[]) => void
  onDelete: () => void
  onEdit: () => void
  onShare: () => void
  onIncentivize: () => void
  onDownload: () => void
  onAI: () => void
  onSendMessage: () => void
  onCopyToClipboard: () => void
  onSubtitles: () => void
  onArchive: () => void
  onDownloadLog: () => void
  onDuplicate: () => void

}

export function TestimonialActions({
  testimonialType,
  testimonialEmail,
  isArchived,
  activeTab,
  spaceId,
  testimonialId,
  onTag,
  onDelete,
  onEdit,
  onShare,
  onIncentivize,
  onDownload,
  onAI,
  onSendMessage,
  onCopyToClipboard,
  onSubtitles,
  onArchive,
  onDownloadLog,
  onDuplicate,
}: TestimonialActionsProps) {
  const [tagSelectionOpen, setTagSelectionOpen] = useState(false)
  const [manageTagsOpen, setManageTagsOpen] = useState(false)
  const isLikedTab = activeTab === 'liked'
  const isArchivedTab = activeTab === 'archived'

  const handleCreateTags = () => {
    setTagSelectionOpen(false)
    setManageTagsOpen(true)
  }

  const handleManageTagsClose = () => {
    setManageTagsOpen(false)
    setTagSelectionOpen(true)
  }

  const handleTagSelect = (selectedTags: string[]) => {
    onTag(selectedTags)
  }

  return (
        <>
          <div className="flex flex-wrap">
            {!isArchived && !isArchivedTab && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => setTagSelectionOpen(true)} 
                  className="bg-white flex items-center px-2 text-black hover:bg-gray-100 "
                >
                  <Tag className="mr-1 h-4 w-4" />
                  Tag
                </Button>
                <Button size="sm" onClick={onIncentivize}
                  className="bg-white flex items-center px-2 text-black hover:bg-gray-100 "
                  >
                  <Gift className="mr-1 h-4 w-4" />
                  Incentivize
                </Button>
                <Button size="sm" onClick={onEdit} 
                  className="bg-white flex items-center px-2 text-black hover:bg-gray-100 "
                  >
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" onClick={onShare} className="bg-white flex items-center px-2 text-black hover:bg-gray-100">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <Button size="sm" onClick={onDownload} className="bg-white flex items-center px-2 text-black hover:bg-gray-100">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
                <Button size="sm" onClick={onAI} className="bg-white flex items-center px-2 text-black hover:bg-gray-100">
                  <Sparkles className="mr-1 h-4 w-4" />
                  AI
                </Button>
              </>
            )}
      
            <Button size="sm" onClick={onDelete} className="bg-white flex items-center px-2 text-black hover:bg-gray-100">
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
      
            {isArchived && isArchivedTab && (
              <Button size="sm" onClick={onArchive} className="bg-white flex items-center px-2 text-black hover:bg-gray-100">
                <Bookmark className="mr-1 h-4 w-4" />
                Unarchive
              </Button>
            )}
      
            {!isArchived && !isArchivedTab && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="bg-white flex items-center px-2 text-black hover:bg-gray-100">
                    <MoreHorizontal className="mr-1 h-4 w-4" />
                    More
                  </Button>
                </DropdownMenuTrigger>
      
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  {testimonialEmail && (
                    <DropdownMenuItem onClick={() => window.location.href = `mailto:${testimonialEmail}`}>
                      <Send className="mr-1 h-5 w-5" />
                      <span>Send a message</span>
                    </DropdownMenuItem>
                  )}
      
                  {testimonialType === TestimonialType.TEXT ? (
                    <DropdownMenuItem className='cursor-pointer' onClick={onCopyToClipboard}>
                      <Copy className="mr-2 h-5 w-5" />
                      <span>Copy text to clipboard</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={onSubtitles}>
                      <Subtitles className="mr-2 h-5 w-5" />
                      <span>Subtitles</span>
                    </DropdownMenuItem>
                  )}
      
                  {!isLikedTab && !isArchived && !isArchivedTab && (
                    <DropdownMenuItem onClick={onArchive}>
                      <Bookmark className="mr-2 h-5 w-5" />
                      <span>Archive</span>
                    </DropdownMenuItem>
                  )}
      
                  <DropdownMenuItem onClick={onDownloadLog}>
                    <Download className="mr-2 h-5 w-5" />
                    <span>Download testimonial log</span>
                  </DropdownMenuItem>
      
                  {!isArchived && !isArchivedTab && (
                    <DropdownMenuItem onClick={onDuplicate}>
                      <FileText className="mr-2 h-5 w-5" />
                      <span>Duplicate to other spaces</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
        </div>
        <TagSelectionDialog
          isOpen={tagSelectionOpen}
          onClose={() => setTagSelectionOpen(false)}
          spaceId={spaceId}
          testimonialId={testimonialId} // Add this prop
          onCreateTags={handleCreateTags}
          onSelectTags={handleTagSelect}
        />
        <ManageTagsDialog
          isOpen={manageTagsOpen}
          onClose={handleManageTagsClose}
          spaceId={spaceId}
        />  
    </>  
  );
}  