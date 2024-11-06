// //components/SpaceSidebar.tsx
import React from 'react';
import { Inbox, Heart, Archive, AlertTriangle, Share2, Video, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
      <div className="w-72 p-8">
        <h2 className="text-xl font-semibold">Inbox</h2>
        <nav className="mt-4">
          <Button variant={activeTab === 'all' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('all')}>
            <Inbox className="mr-2 h-4 w-4" />
            All
          </Button>
          <Button variant={activeTab === 'video' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('video')}>
            <Video className="mr-2 h-4 w-4" />
            Video
          </Button>
          <Button variant={activeTab === 'text' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab('text')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Text
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Heart className="mr-2 h-4 w-4" />
            Liked
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Archive className="mr-2 h-4 w-4" />
            Archived
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Spam
          </Button>
        </nav>
        <h2 className="text-xl font-semibold">Integrations</h2>
        <nav className="mt-4">
          <Button variant="ghost" className="w-full justify-start">
            <Share2 className="mr-2 h-4 w-4" />
            Social media
          </Button>
        </nav>

    </div>
  );
}