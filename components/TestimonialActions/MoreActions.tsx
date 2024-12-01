import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Send, Copy, Subtitles, Bookmark, Download, FileText } from 'lucide-react'
import { TestimonialType } from '@/types/testimonial'

interface MoreActionsProps {
  testimonialType: TestimonialType
  testimonialEmail?: string
  isArchived: boolean
  isArchivedTab: boolean
  isLikedTab: boolean
  onSendMessage: () => void
  onCopyToClipboard: () => void
  onSubtitles: () => void
  onArchive: () => void
  onDownloadLog: () => void
  onDuplicate: () => void
}

export function MoreActions({
  testimonialType,
  testimonialEmail,
  isArchived,
  isArchivedTab,
  isLikedTab,
  onSendMessage,
  onCopyToClipboard,
  onSubtitles,
  onArchive,
  onDownloadLog,
  onDuplicate,
}: MoreActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="bg-white flex items-center px-2 text-black hover:bg-gray-100">
          <MoreHorizontal className="mr-1 h-4 w-4" />
          More
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-white">
        {testimonialEmail && (
          <DropdownMenuItem onClick={onSendMessage}>
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
  )
}