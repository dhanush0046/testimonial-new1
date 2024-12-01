//components/TestimonialActions/ShareActions.tsx
"use client"

import React, { useState } from 'react'
import { Share2, Link, Code, Image } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GetLinkDialog } from "@/components/TestimonialActions/GetLinkDialog"

interface ShareActionsProps {
  spaceId: string
  spaceName: string
  testimonialId: string
  onEmbed: () => void
  onCreateImage: () => void
}

export function ShareActions({ spaceId, spaceName, testimonialId, onEmbed, onCreateImage }: ShareActionsProps) {
  const [isGetLinkOpen, setIsGetLinkOpen] = useState(false)  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm" 
            className="bg-white flex items-center px-2 text-black hover:bg-gray-100"
          >
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white">
          <DropdownMenuItem onClick={() => setIsGetLinkOpen(true)} className="cursor-pointer">
            <Link className="mr-2 h-4 w-4" />
            <span>Get the link</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEmbed} className="cursor-pointer">
            <Code className="mr-2 h-4 w-4" />
            <span>Embed the testimonial</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCreateImage} className="cursor-pointer">
            <Image className="mr-2 h-4 w-4" />
            <span>Create an image</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GetLinkDialog
        isOpen={isGetLinkOpen}
        onClose={() => setIsGetLinkOpen(false)}
        spaceId={spaceId}
        spaceName={spaceName}
        testimonialId={testimonialId}
      />
    </>
  )
}