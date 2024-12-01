//components/SpaceSidebar.tsx
// import React from 'react'
// import { Inbox, Heart, Archive, AlertTriangle, Share2, Video, MessageSquare } from 'lucide-react'
// import { Button } from "@/components/ui/button"

// interface SidebarProps {
//   activeTab: string
//   setActiveTab: (tab: string) => void
// }

// export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
//       <div className="p-6">
//       <h2 className="text-xl font-semibold">Inbox</h2>
//       <nav className="mt-4 space-y-2">
//         <Button 
//           variant={activeTab === 'all' ? "secondary" : "ghost"} 
//           className="w-full justify-start" 
//           onClick={() => setActiveTab('all')}
//         >
//           <Inbox className="mr-2 h-4 w-4" />
//           All
//         </Button>
//         <Button 
//           variant={activeTab === 'video' ? "secondary" : "ghost"} 
//           className="w-full justify-start" 
//           onClick={() => setActiveTab('video')}
//         >
//           <Video className="mr-2 h-4 w-4" />
//           Video
//         </Button>
//         <Button 
//           variant={activeTab === 'text' ? "secondary" : "ghost"} 
//           className="w-full justify-start" 
//           onClick={() => setActiveTab('text')}
//         >
//           <MessageSquare className="mr-2 h-4 w-4" />
//           Text
//         </Button>
//         <Button 
//           variant={activeTab === 'liked' ? "secondary" : "ghost"} 
//           className="w-full justify-start" 
//           onClick={() => setActiveTab('liked')}
//         >
//           <Heart className="mr-2 h-4 w-4" />
//           Liked
//         </Button>
//         <Button 
//           variant={activeTab === 'archived' ? "secondary" : "ghost"} 
//           className="w-full justify-start" 
//           onClick={() => setActiveTab('archived')}
//         >
//           <Archive className="mr-2 h-4 w-4" />
//           Archived
//         </Button>
//         <Button variant="ghost" className="w-full justify-start">
//           <AlertTriangle className="mr-2 h-4 w-4" />
//           Spam
//         </Button>
//       </nav>
//       <h2 className="text-xl font-semibold mt-8">Integrations</h2>
//       <nav className="mt-4">
//         <Button variant="ghost" className="w-full justify-start">
//           <Share2 className="mr-2 h-4 w-4" />
//           Social media
//         </Button>
//       </nav>
//     </div>
//     </div>
//   )
// }

// //components/SpaceSidebar.tsx
"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Inbox, Heart, Archive, AlertTriangle, Share2, Video, MessageSquare, ChevronRight, Code, Star, Settings, RefreshCcw, Mail, 
  PenTool, Tags, Move, Users, Globe, XIcon as BrandX, Linkedin, Instagram, Youtube, Twitter, VideoIcon as Vimeo, PlayCircle, ChromeIcon as Google, Award, FileText, LayoutGrid, Send, Folder, Download } from 'lucide-react'
import { cn } from "@/lib/utils"
import ManageTagsDialog  from '@/components/SideBarHandles/ManageTagsDialog'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  spaceId: string
  onRequestTestimonials?: () => void
}

interface SidebarSection {
  title: string
  items: {
    id: string
    label: string
    icon: React.ReactNode
  }[]
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, spaceId, onRequestTestimonials }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [isManageTagsOpen, setIsManageTagsOpen] = useState(false)
  const router = useRouter()

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }
  const handleItemClick = (itemId: string) => {
    if (itemId === 'request-testimonials' && onRequestTestimonials) {
      onRequestTestimonials()
    } else if (itemId === 'edit-space') {
      router.push(`/space/${spaceId}`)
    } else {
      setActiveTab(itemId)
    }
  }

  const inboxItems = [
    { id: 'all', label: 'All', icon: <Inbox className="h-4 w-4" /> },
    { id: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
    { id: 'text', label: 'Text', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'liked', label: 'Liked', icon: <Heart className="h-4 w-4" /> },
    { id: 'archived', label: 'Archived', icon: <Archive className="h-4 w-4" /> },
    { id: 'spam', label: 'Spam', icon: <AlertTriangle className="h-4 w-4" /> },
  ]

  const sections: SidebarSection[] = [
    {
      title: 'Integrations',
      items: [
        { id: 'import-testimonials', label: 'Import Testimonials', icon: <Download className="h-4 w-4" /> },
      ]
    },
    {
      title: 'Embed widgets',
      items: [
        { id: 'wall-of-love', label: 'Wall of Love', icon: <LayoutGrid className="h-4 w-4" /> },
        { id: 'single-testimonial', label: 'Single testimonial', icon: <FileText className="h-4 w-4" /> },
        { id: 'badge', label: 'Badge', icon: <Award className="h-4 w-4" /> },
        { id: 'collecting-widget', label: 'Collecting widget', icon: <Code className="h-4 w-4" /> }
      ]
    },
    {
      title: 'Pages',
      items: [
        { id: 'request-testimonials', label: 'Request testimonials', icon: <Send className="h-4 w-4" /> },
        { id: 'wall-of-love-page', label: 'Wall of Love', icon: <LayoutGrid className="h-4 w-4" /> },
        { id: 'portfolio', label: 'Portfolio', icon: <Folder className="h-4 w-4" /> }
      ]
    },
    {
      title: 'Space settings',
      items: [
        { id: 'edit-space', label: 'Edit the space', icon: <PenTool className="h-4 w-4" /> },
        { id: 'manage-forms', label: 'Manage forms', icon: <FileText className="h-4 w-4" /> },
        { id: 'manage-tags', label: 'Manage tags', icon: <Tags className="h-4 w-4" /> },
        { id: 'reorder-wall', label: 'Reorder in Wall of Love', icon: <Move className="h-4 w-4" /> },
        { id: 'invite-people', label: 'Invite people to this space', icon: <Users className="h-4 w-4" /> },
        { id: 'custom-domain', label: 'Set up custom domain', icon: <Globe className="h-4 w-4" /> }
      ]
    }
  ]

  const handleManageTags = () => {
    setIsManageTagsOpen(true)
  }
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg w-[347px]">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Inbox</h2>
        <nav className="mt-4 space-y-2">
          {inboxItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 px-3 h-10"
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        {sections.map((section) => (
          <div key={section.title} className="mt-4">
            <Button
              variant="ghost"
              className="w-full justify-between p-2 text-lg font-semibold"
              onClick={() => toggleSection(section.title)}
            >
              {section.title}
              <ChevronRight 
                className={cn(
                  "h-4 w-4 transition-transform",
                  expandedSections.includes(section.title) && "transform rotate-90"
                )}
              />
            </Button>
            {expandedSections.includes(section.title) && (
              <nav className="mt-2 space-y-2">
                {section.items.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 px-3 h-10"
                    onClick={() => 
                      item.id === 'manage-tags' 
                        ? handleManageTags() 
                        : handleItemClick(item.id)
                    }                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                ))}
              </nav>
            )}
          </div>
        ))}
      </div>

      <ManageTagsDialog 
        isOpen={isManageTagsOpen}
        onClose={() => setIsManageTagsOpen(false)}
        spaceId={spaceId}
      />
    </div>
  )
}