//components/ManageTagsDialog.tsx -- unstated-next
"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogPrimitive } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, MoreVertical, Trash2, X } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { fetchSpace, updateTagsDisplayOnWall } from "@/lib/dashboardApi"
import { toast } from "sonner"
import { TagsContainer, Tag } from '@/containers/tagsContainer'
import { Skeleton } from "@/components/ui/skeleton"

interface Space {
  id: string
  tagsDisplayOnWall: boolean
}

interface ManageTagsDialogProps {
  isOpen: boolean
  onClose: () => void
  spaceId: string
}

interface SortableTableRowProps {
  tag: Tag
  toggleTagDisplay: (id: string) => void
  toggleTagActive: (id: string) => void
  handleDeleteTag: (id: string) => void
}

function SortableTableRow({ tag, toggleTagDisplay, toggleTagActive, handleDeleteTag }: SortableTableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tag.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow 
      ref={setNodeRef} 
      style={style} 
      className={cn(
        "group hover:bg-muted/50 transition-colors",
        isDragging && "opacity-50"
      )}
    >
      <TableCell className="w-[40px] p-2">
        <div
          {...attributes}
          {...listeners}
          className="flex h-full items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell>{tag.name}</TableCell>
      <TableCell className="text-center">
        <Switch
          checked={tag.displayOnWall}
          onCheckedChange={() => toggleTagDisplay(tag.id)}
        />
      </TableCell>
      <TableCell className="text-center">
        <Switch
          checked={tag.isActive}
          onCheckedChange={() => toggleTagActive(tag.id)}
        />
      </TableCell>
      <TableCell className="w-[40px] p-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleDeleteTag(tag.id)}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
export default function ManageTagsDialog({ isOpen, onClose, spaceId }: ManageTagsDialogProps) {
  const [newTag, setNewTag] = React.useState("")
  const [space, setSpace] = React.useState<Space | null>(null)
  const [error, setError] = React.useState("")
  const { tags, createNewTag, updateExistingTag, deleteExistingTag, reorderExistingTags } = TagsContainer.useContainer()
  const [localTags, setLocalTags] = React.useState<Tag[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  React.useEffect(() => {
    if (isOpen) {
      fetchSpaceData()
    }
  }, [isOpen])

  React.useEffect(() => {
    setLocalTags(tags)
  }, [tags])

  const fetchSpaceData = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const fetchedSpace = await fetchSpace(spaceId)
      setSpace(fetchedSpace)
    } catch (error) {
      console.error('Error fetching space:', error)
      toast.error("Failed to fetch space data")
    } finally {
      setIsLoading(false)
    }
  }, [spaceId])

  const toggleTagsDisplayOnWall = React.useCallback(async (checked: boolean) => {
    setSpace(prevSpace => prevSpace ? { ...prevSpace, tagsDisplayOnWall: checked } : null)

    try {
      await updateTagsDisplayOnWall(spaceId, checked)
      toast.success("Wall of Love display setting updated")
    } catch (error) {
      console.error('Error updating tags display on wall:', error)
      toast.error("Failed to update Wall of Love display setting")
      setSpace(prevSpace => prevSpace ? { ...prevSpace, tagsDisplayOnWall: !checked } : null)
    }
  }, [spaceId])

  const handleCreateTag = React.useCallback(async () => {
    if (localTags.length >= 5) {
      setError("You can only create up to 5 tags")
      return
    }
  
    if (newTag.trim()) {
      const capitalizedTag = newTag.trim().charAt(0).toUpperCase() + newTag.trim().slice(1)
      if (localTags.some(tag => tag.name.toLowerCase() === capitalizedTag.toLowerCase())) {
        toast.error("Tag already exists")
        return
      }
  
      const tempId = `temp-${Date.now()}`
      const newLocalTag: Tag = { id: tempId, name: capitalizedTag, displayOnWall: false, isActive: true, position: localTags.length }
      setLocalTags(prev => [...prev, newLocalTag])
      setNewTag("")
  
      try {
        const createdTag = await createNewTag(capitalizedTag)
        setLocalTags(prev => prev.map(tag => tag.id === tempId ? createdTag : tag) as Tag[]) // Optimistic update
        toast.success("Tag created successfully")
      } catch (error) {
        console.error('Error creating tag:', error)
        toast.error("Failed to create tag")
        setLocalTags(prev => prev.filter(tag => tag.id !== tempId))
      }
    }
  }, [localTags, newTag, createNewTag])
  
  const handleDeleteTag = React.useCallback(async (id: string) => {
    const deletedTag = localTags.find(tag => tag.id === id)
    setLocalTags(prev => prev.filter(tag => tag.id !== id))

    try {
      await deleteExistingTag(id)
      toast.success("Tag deleted successfully")
    } catch (error) {
      console.error('Error deleting tag:', error)
      toast.error("Failed to delete tag")
      if (deletedTag) {
        setLocalTags(prev => [...prev, deletedTag])
      }
    }
  }, [localTags, deleteExistingTag])

  const toggleTagDisplay = React.useCallback(async (id: string) => {
    setLocalTags(prev => prev.map(tag => 
      tag.id === id ? { ...tag, displayOnWall: !tag.displayOnWall } : tag
    ))

    try {
      const updatedTag = await updateExistingTag(id, { displayOnWall: !localTags.find(t => t.id === id)?.displayOnWall })
      setLocalTags(prev => prev.map(tag => tag.id === id ? updatedTag : tag) as Tag[])
      toast.success("Tag display setting updated")
    } catch (error) {
      console.error('Error updating tag:', error)
      toast.error("Failed to update tag display")
      setLocalTags(prev => prev.map(tag => 
        tag.id === id ? { ...tag, displayOnWall: !tag.displayOnWall } : tag
      ))
    }
  }, [localTags, updateExistingTag])

  const toggleTagActive = React.useCallback(async (id: string) => {
    setLocalTags(prev => prev.map(tag => 
      tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
    ))

    try {
      const updatedTag = await updateExistingTag(id, { isActive: !localTags.find(t => t.id === id)?.isActive })
      setLocalTags(prev => prev.map(tag => tag.id === id ? updatedTag : tag) as Tag[])
      toast.success("Tag status updated")
    } catch (error) {
      console.error('Error updating tag:', error)
      toast.error("Failed to update tag status")
      setLocalTags(prev => prev.map(tag => 
        tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
      ))
    }
  }, [localTags, updateExistingTag])

  const handleDragEnd = React.useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localTags.findIndex((tag) => tag.id === active.id);
      const newIndex = localTags.findIndex((tag) => tag.id === over?.id);

      const updatedTags = Array.from(localTags);
      const [reorderedItem] = updatedTags.splice(oldIndex, 1);
      updatedTags.splice(newIndex, 0, reorderedItem);

      const finalUpdatedTags = updatedTags.map((tag, index) => ({
        ...tag,
        position: index
      }));

      setLocalTags(finalUpdatedTags);

      try {
        await reorderExistingTags(finalUpdatedTags);
        toast.success("Tags reordered successfully");
      } catch (error) {
        console.error('Error reordering tags:', error);
        toast.error("Failed to reorder tags");
        setLocalTags(tags);
      }
    }
  }, [localTags, reorderExistingTags, tags]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
          <DialogDescription>
            Create and manage tags for your testimonials.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <>
            <div className="py-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Enter new tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  disabled={localTags.length >= 5}
                />
                <Button onClick={handleCreateTag}>Create</Button>
              </div>
              {localTags.length >= 5 && (
                <p className="text-sm text-red-500 text-muted-foreground">
                  You used up all 5 tags!
                </p>
              )} 
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="display-tags"
                checked={space?.tagsDisplayOnWall || false}
                onCheckedChange={toggleTagsDisplayOnWall}
              />
              <Label htmlFor="display-tags">Display tags on Wall of Love</Label>
            </div>
            
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={localTags}
                strategy={verticalListSortingStrategy}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                      </TableHead>
                      <TableHead className="text-center">Display on Wall</TableHead>
                      <TableHead className="text-center">Active</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {localTags && localTags.map((tag: Tag) => (
                      tag ? (
                        <SortableTableRow
                          key={tag.id}
                          tag={tag}
                          toggleTagDisplay={toggleTagDisplay}
                          toggleTagActive={toggleTagActive}
                          handleDeleteTag={handleDeleteTag}
                        />
                      ) : null
                    ))}
                  </TableBody>
                </Table>
              </SortableContext>
            </DndContext>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}


