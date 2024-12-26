//components/TestimonialActions/Index.tsx
"use client";

import React, { useState } from "react";
import { Tag, Trash2, Bookmark, Gift, Edit, Share2, Download, Sparkles, Scissors } from 'lucide-react';
import { Testimonial, TestimonialType } from "@/types/testimonial";
import TagSelectionDialog from "@/components/TagSelectionDialog";
import ManageTagsDialog from "@/components/SideBarHandles/ManageTagsDialog";
import { EditTestimonialDialog } from "@/components/TestimonialActions/EditTestimonialDialog";
import { ActionButton } from "@/components/TestimonialActions/ActionButton";
import { MoreActions } from "@/components/TestimonialActions/MoreActions";
import { ShareActions } from "@/components/TestimonialActions/ShareActions";
import { VideoTrimmer } from "@/components/TestimonialActions/VideoTrimmer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {putTestimonial} from "@/lib/dashboardApi";

interface TestimonialActionsProps {
  testimonialType: TestimonialType;
  testimonialEmail?: string;
  isArchived: boolean;
  activeTab: string;
  spaceId: string;
  spaceName: string;
  testimonialId: string;
  testimonial: Testimonial;
  onTag: (tagNames: string[]) => void;
  onDelete: () => void;
  onEdit: (id: string , data: Testimonial) => void;
  onIncentivize: () => void;
  onDownload: () => void;
  onAI: () => void;
  onSendMessage: () => void;
  onCopyToClipboard: () => void;
  onSubtitles: () => void;
  onArchive: () => void;
  onDownloadLog: () => void;
  onDuplicate: () => void;
  onGetLink: () => void;
  onEmbed: () => void;
  onCreateImage: () => void;
  onTrimVideo?: () => void; // New prop for handling video trimming
}

export function TestimonialActions({
  testimonialType,
  testimonialEmail,
  isArchived,
  activeTab,
  spaceId,
  spaceName,
  testimonialId,
  testimonial,
  onTag,
  onDelete,
  onEdit,
  onIncentivize,
  onDownload,
  onAI,
  onSendMessage,
  onCopyToClipboard,
  onSubtitles,
  onArchive,
  onDownloadLog,
  onDuplicate,
  onEmbed,
  onCreateImage,
  onTrimVideo,
}: TestimonialActionsProps) {
  const [tagSelectionOpen, setTagSelectionOpen] = useState(false);
  const [manageTagsOpen, setManageTagsOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [trimmerOpen, setTrimmerOpen] = useState(false)
  const [isProcessingTrim, setIsProcessingTrim] = useState(false)

  const isLikedTab = activeTab === "liked";
  const isArchivedTab = activeTab === "archived";

  const handleCreateTags = () => {
    setTagSelectionOpen(false);
    setManageTagsOpen(true);
  };

  const handleManageTagsClose = () => {
    setManageTagsOpen(false);
    setTagSelectionOpen(true);
  };

  const handleTagSelect = (selectedTags: string[]) => {
    onTag(selectedTags);
  };

  const handleEditClick = () => {
    if (testimonialType === TestimonialType.TEXT) {
      setEditDialogOpen(true);
    }
  };

  const handleUpdateTestimonial = (id: string, data: Testimonial) => {
    console.log("handleUpdateTestimonial", data);
    onEdit && onEdit(id, data);
    setEditDialogOpen(false);
  };

  const handleTrimVideo = async (startTime: number, endTime: number) => {
    setIsProcessingTrim(true);
    
    try {
      const updatedTestimonial = await putTestimonial(testimonialId, {
       trimmedStartTime: startTime,
       trimmedEndTime: endTime,
     });
      onEdit(testimonialId, updatedTestimonial);
     toast.success('Video trim points saved successfully');
     setTrimmerOpen(false);
   } catch (error) {
     console.error('Error saving trim points:', error);
     toast.error('Failed to save trim points');
   } finally {
     setIsProcessingTrim(false);
   }
 }

  const EditButton = () => {
    if (testimonialType === TestimonialType.VIDEO) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <ActionButton icon={Edit} label="Edit" onClick={() => {}} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit the testimonial
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTrimmerOpen(true)}>
              <Scissors className="mr-2 h-4 w-4" />
              Trim the video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <ActionButton icon={Edit} label="Edit" onClick={handleEditClick} />
    );
  };

  return (
    <>
      <div className="flex flex-wrap">
        {!isArchived && !isArchivedTab && (
          <>
            <ActionButton 
              icon={Tag} 
              label="Tag" 
              onClick={() => setTagSelectionOpen(true)} 
            />
            <ActionButton 
              icon={Gift} 
              label="Incentivize" 
              onClick={onIncentivize} 
            />
            
            <EditButton />

            <ShareActions
              spaceId={spaceId}
              spaceName={spaceName}
              testimonialId={testimonialId}
              onEmbed={onEmbed}
              onCreateImage={onCreateImage}
            />
            <ActionButton 
              icon={Download} 
              label="Download" 
              onClick={onDownload} 
            />
            <ActionButton 
              icon={Sparkles} 
              label="AI" 
              onClick={onAI} 
            />
          </>
        )}

        <ActionButton 
          icon={Trash2} 
          label="Delete" 
          onClick={onDelete} 
        />

        {isArchived && isArchivedTab && (
          <ActionButton 
            icon={Bookmark} 
            label="Unarchive" 
            onClick={onArchive} 
          />
        )}

        {!isArchived && !isArchivedTab && (
          <MoreActions
            testimonialType={testimonialType}
            testimonialEmail={testimonialEmail}
            isArchived={isArchived}
            isArchivedTab={isArchivedTab}
            isLikedTab={isLikedTab}
            onSendMessage={onSendMessage}
            onCopyToClipboard={onCopyToClipboard}
            onSubtitles={onSubtitles}
            onArchive={onArchive}
            onDownloadLog={onDownloadLog}
            onDuplicate={onDuplicate}
          />
        )}
      </div>

      <TagSelectionDialog
        isOpen={tagSelectionOpen}
        onClose={() => setTagSelectionOpen(false)}
        spaceId={spaceId}
        testimonialId={testimonialId}
        onCreateTags={handleCreateTags}
        onSelectTags={handleTagSelect}
      />

      <ManageTagsDialog
        isOpen={manageTagsOpen}
        onClose={handleManageTagsClose}
        spaceId={spaceId}
      />

      <EditTestimonialDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        testimonial={testimonial}
        onUpdate={handleUpdateTestimonial}
      />

      <VideoTrimmer
        isOpen={trimmerOpen}
        onClose={() => setTrimmerOpen(false)}
        videoUrl={testimonial?.videoUrl || null}
        videoDuration={testimonial?.videoDuration || null}
        onSave={handleTrimVideo}
      />
    </>
  );
}
