// //components/ManageTagsDialog.tsx -- workings
// "use client"

// import * as React from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPrimitive } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { ArrowUpDown, GripVertical, Trash2, EyeOff, LayoutGrid, X, CircleOff } from 'lucide-react'
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { fetchTags, fetchSpace, updateTagsDisplayOnWall, createTag, deleteTag, updateTag, reorderTags} from "@/lib/dashboardApi"
// import { DialogDescription } from "@radix-ui/react-dialog"
// import { toast, Toaster } from "sonner"

// interface Tag {
//   id: string
//   name: string
//   displayOnWall: boolean
//   isActive: boolean
//   position: number
// }

// interface Space {
//   id: string
//   tagsDisplayOnWall: boolean
// }

// interface ManageTagsDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   spaceId: string
// }

// export default function ManageTagsDialog({ isOpen, onClose, spaceId }: ManageTagsDialogProps) {
//   const [newTag, setNewTag] = React.useState("")
//   const [tags, setTags] = React.useState<Tag[]>([])
//   const [space, setSpace] = React.useState<Space | null>(null)
//   const [error, setError] = React.useState("")

//   React.useEffect(() => {
//     if (isOpen) {
//       fetchTagsData()
//       fetchSpaceData()
//     }
//   }, [isOpen, spaceId])

//   const fetchTagsData = async () => {
//     try {
//       const fetchedTags = await fetchTags(spaceId)
//       setTags(fetchedTags)
//     } catch (error) {
//       console.error('Error fetching tags:', error)
//       toast.error("Failed to fetch tags")
//     }
//   }

//   const fetchSpaceData = async () => {
//     try {
//       const fetchedSpace = await fetchSpace(spaceId)
//       setSpace(fetchedSpace)
//     } catch (error) {
//       console.error('Error fetching space:', error)
//       toast.error("Failed to fetch space data")
//     }
//   }

//   const toggleTagsDisplayOnWall = async (checked: boolean) => {
//     // Optimistic update
//     setSpace(prevSpace => prevSpace ? { ...prevSpace, tagsDisplayOnWall: checked } : null)

//     try {
//       await updateTagsDisplayOnWall(spaceId, checked)
//       toast.success("Wall of Love display setting updated")
//     } catch (error) {
//       console.error('Error updating tags display on wall:', error)
//       toast.error("Failed to update Wall of Love display setting")
//       // Revert the optimistic update
//       setSpace(prevSpace => prevSpace ? { ...prevSpace, tagsDisplayOnWall: !checked } : null)
//     }
//   }

//   const handleCreateTag = async () => {
//     if (tags.length >= 5) {
//       setError("You can only create up to 5 tags")
//       return
//     }

//     if (newTag.trim()) {
//       if (tags.some(tag => tag.name.toLowerCase() === newTag.trim().toLowerCase())) {
//         toast.error("Tag already exists")
//         return
//       }

//       // Optimistic update
//       const optimisticTag: Tag = {
//         id: Date.now().toString(), // Temporary ID
//         name: newTag.trim(),
//         displayOnWall: false,
//         isActive: false,
//         position: tags.length
//       }
//       setTags([...tags, optimisticTag])
//       setNewTag("")

//       try {
//         const newTagData = await createTag(spaceId, newTag.trim(), tags.length)
//         setTags(prevTags => prevTags.map(tag => 
//           tag.id === optimisticTag.id ? newTagData : tag
//         ))
//         toast.success("Tag created successfully")
//       } catch (error) {
//         console.error('Error creating tag:', error)
//         toast.error("Failed to create tag")
//         // Remove the optimistic tag
//         setTags(prevTags => prevTags.filter(tag => tag.id !== optimisticTag.id))
//       }

//       if (tags.length >= 4) {
//         setError("You can only create up to 5 tags")
//       }
//     }
//   }

//   const handleDeleteTag = async (id: string) => {
//     // Optimistic update
//     const deletedTag = tags.find(tag => tag.id === id)
//     setTags(prevTags => prevTags.filter(tag => tag.id !== id))

//     try {
//       await deleteTag(spaceId, id)
//       toast.success("Tag deleted successfully")
//     } catch (error) {
//       console.error('Error deleting tag:', error)
//       toast.error("Failed to delete tag")
//       // Revert the optimistic update
//       if (deletedTag) {
//         setTags(prevTags => [...prevTags, deletedTag])
//       }
//     }
//   }

//   const toggleTagDisplay = async (id: string) => {
//     // Optimistic update
//     setTags(prevTags => prevTags.map(tag => 
//       tag.id === id ? { ...tag, displayOnWall: !tag.displayOnWall } : tag
//     ))

//     try {
//       const updatedTag = await updateTag(spaceId, id, { displayOnWall: !tags.find(t => t.id === id)?.displayOnWall })
//       setTags(prevTags => prevTags.map(tag => tag.id === id ? updatedTag : tag))
//       toast.success("Tag display setting updated")
//     } catch (error) {
//       console.error('Error updating tag:', error)
//       toast.error("Failed to update tag display")
//       // Revert the optimistic update
//       setTags(prevTags => prevTags.map(tag => 
//         tag.id === id ? { ...tag, displayOnWall: !tag.displayOnWall } : tag
//       ))
//     }
//   }

//   const toggleTagActive = async (id: string) => {
//     // Optimistic update
//     setTags(prevTags => prevTags.map(tag => 
//       tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
//     ))

//     try {
//       const updatedTag = await updateTag(spaceId, id, { isActive: !tags.find(t => t.id === id)?.isActive })
//       setTags(prevTags => prevTags.map(tag => tag.id === id ? updatedTag : tag))
//       toast.success("Tag status updated")
//     } catch (error) {
//       console.error('Error updating tag:', error)
//       toast.error("Failed to update tag status")
//       // Revert the optimistic update
//       setTags(prevTags => prevTags.map(tag => 
//         tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
//       ))
//     }
//   }

//   const handleDragEnd = async (result: any) => {
//     if (!result.destination) return
  
//     const items = Array.from(tags)
//     const [reorderedItem] = items.splice(result.source.index, 1)
//     items.splice(result.destination.index, 0, reorderedItem)
  
//     const updatedTags = items.map((tag, index) => ({
//       ...tag,
//       position: index
//     }))
  
//     // Optimistic update
//     setTags(updatedTags)
  
//     try {
//       await reorderTags(spaceId, updatedTags)
//       toast.success("Tags reordered successfully")
//     } catch (error) {
//       console.error('Error reordering tags:', error)
//       toast.error("Failed to reorder tags")
//       // Revert the optimistic update
//       setTags(items)
//     }
//   }

//   return (
//     <div>
//       <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogContent className="sm:max-w-[600px]">
//           <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//             <X className="h-4 w-4" />
//             <span className="sr-only">Close</span>
//           </DialogPrimitive.Close>
//           <DialogHeader>
//             <DialogTitle>Manage tags</DialogTitle>
//           </DialogHeader>
//           <DialogDescription className="text-sm text-muted-foreground">
//             You can create up to 5 tags
//           </DialogDescription>
          
//           <div className="space-y-6">
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Enter tag name"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 className="flex-1"
//                 disabled={tags.length >= 5}
//               />
//               <Button variant="outline" onClick={handleCreateTag}>Create</Button>
//             </div>

//             {tags.length >= 5 && (
//               <p className="text-sm text-red-500 text-muted-foreground">
//                 You used up all 5 tags!
//               </p>
//             )} 
//             <div className="flex items-center space-x-2">
//               <Switch
//                 id="display-tags"
//                 checked={space?.tagsDisplayOnWall || false}
//                 onCheckedChange={toggleTagsDisplayOnWall}
//               />
//               <Label htmlFor="display-tags">Display tags on Wall of Love</Label>
//             </div>

//             <DragDropContext onDragEnd={handleDragEnd}>
//               <Droppable droppableId="tags">
//                 {(provided) => (
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="w-[40px]"></TableHead>
//                         <TableHead>
//                           Name
//                           <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
//                         </TableHead>
//                         <TableHead className="w-[100px] px-8 text-center">
//                           <EyeOff className="h-4 w-4 text-gray-400" />
//                         </TableHead>
//                         <TableHead className="w-[100px] px-8">
//                           <CircleOff className="h-4 w-4 text-gray-400" />
//                         </TableHead>
//                         <TableHead className="w-[100px]"></TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody {...provided.droppableProps} ref={provided.innerRef}>
//                       {tags.map((tag, index) => (
//                         <Draggable key={tag.id} draggableId={tag.id} index={index}>
//                           {(provided) => (
//                             <TableRow
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                             >
//                               <TableCell>
//                                 <div {...provided.dragHandleProps}>
//                                   <GripVertical className="h-4 w-4 text-gray-400" />
//                                 </div>
//                               </TableCell>
//                               <TableCell>{tag.name}</TableCell>
//                               <TableCell>
//                                 <Switch
//                                   checked={tag.displayOnWall}
//                                   onCheckedChange={() => toggleTagDisplay(tag.id)}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Switch
//                                   checked={tag.isActive}
//                                   onCheckedChange={() => toggleTagActive(tag.id)}
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => handleDeleteTag(tag.id)}
//                                 >
//                                   <Trash2 className="h-4 w-4 text-gray-400" />
//                                 </Button>
//                               </TableCell>
//                             </TableRow>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </TableBody>
//                   </Table>
//                 )}
//               </Droppable>
//             </DragDropContext>

//             <p className="text-sm text-muted-foreground">
//               Tips: You can drag and drop to reorder the tag&apos;s position on the Wall of Love
//             </p>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <Toaster position="top-center" richColors />
//     </div>
//   )
// }

// //components/ManageTagsDialog.tsx -- context
// "use client"

// import * as React from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPrimitive, DialogDescription } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { ArrowUpDown, GripVertical, Trash2, EyeOff, CircleOff, X } from 'lucide-react'
// import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
// import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { fetchSpace, updateTagsDisplayOnWall, createTag, deleteTag, updateTag, reorderTags } from "@/lib/dashboardApi"
// import { toast, Toaster } from "sonner"
// import { useTags, Tag } from '@/contexts/TagsContext'

// interface Space {
//   id: string
//   tagsDisplayOnWall: boolean
// }

// interface ManageTagsDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   spaceId: string
// }

// interface SortableTableRowProps {
//   tag: Tag
//   toggleTagDisplay: (id: string) => void
//   toggleTagActive: (id: string) => void
//   handleDeleteTag: (id: string) => void
// }

// function SortableTableRow({ tag, toggleTagDisplay, toggleTagActive, handleDeleteTag }: SortableTableRowProps) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: tag.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <TableRow ref={setNodeRef} style={style} {...attributes}>
//       <TableCell>
//         <div {...listeners}>
//           <GripVertical className="h-4 w-4 text-gray-400" />
//         </div>
//       </TableCell>
//       <TableCell className="flex items-center pt-2">
//         {tag.name}
//         <button className="ml-2 text-blue-500 hover:underline">
//           <span className="sr-only">Edit</span>
//         </button>
//       </TableCell>
//       <TableCell>
//         <Switch
//           checked={tag.displayOnWall}
//           onCheckedChange={() => toggleTagDisplay(tag.id)}
//         />
//       </TableCell>
//       <TableCell>
//         <Switch
//           checked={tag.isActive}
//           onCheckedChange={() => toggleTagActive(tag.id)}
//         />
//       </TableCell>
//       <TableCell>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => handleDeleteTag(tag.id)}
//         >
//           <Trash2 className="h-4 w-4 text-gray-400" />
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// }

// export default function ManageTagsDialog({ isOpen, onClose, spaceId }: ManageTagsDialogProps) {
//   const [newTag, setNewTag] = React.useState("")
//   const [space, setSpace] = React.useState<Space | null>(null)
//   const [error, setError] = React.useState("")
//   const { tags, fetchTags, updateTags } = useTags()
//   const [localTags, setLocalTags] = React.useState<Tag[]>([])

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor)
//   );

//   React.useEffect(() => {
//     if (isOpen) {
//       fetchTags(spaceId)
//       fetchSpaceData()
//     }
//   }, [isOpen, spaceId, fetchTags])

//   React.useEffect(() => {
//     setLocalTags(tags)
//   }, [tags])

//   const fetchSpaceData = async () => {
//     try {
//       const fetchedSpace = await fetchSpace(spaceId)
//       setSpace(fetchedSpace)
//     } catch (error) {
//       console.error('Error fetching space:', error)
//       toast.error("Failed to fetch space data")
//     }
//   }

//   const toggleTagsDisplayOnWall = async (checked: boolean) => {
//     setSpace(prevSpace => prevSpace ? { ...prevSpace, tagsDisplayOnWall: checked } : null)

//     try {
//       await updateTagsDisplayOnWall(spaceId, checked)
//       toast.success("Wall of Love display setting updated")
//     } catch (error) {
//       console.error('Error updating tags display on wall:', error)
//       toast.error("Failed to update Wall of Love display setting")
//       setSpace(prevSpace => prevSpace ? { ...prevSpace, tagsDisplayOnWall: !checked } : null)
//     }
//   }

//   const handleCreateTag = async () => {
//     if (localTags.length >= 5) {
//       setError("You can only create up to 5 tags")
//       return
//     }

//     if (newTag.trim()) {
//       if (localTags.some(tag => tag.name.toLowerCase() === newTag.trim().toLowerCase())) {
//         toast.error("Tag already exists")
//         return
//       }

//       const optimisticTag: Tag = {
//         id: Date.now().toString(),
//         name: newTag.trim(),
//         displayOnWall: false,
//         isActive: false,
//         position: localTags.length
//       }
//       setLocalTags(prevTags => [...prevTags, optimisticTag])
//       setNewTag("")

//       try {
//         const newTagData = await createTag(spaceId, newTag.trim(), localTags.length)
//         setLocalTags(prevTags => prevTags.map(tag => tag.id === optimisticTag.id ? newTagData : tag))
//         updateTags([...tags, newTagData])
//         toast.success("Tag created successfully")
//       } catch (error) {
//         console.error('Error creating tag:', error)
//         toast.error("Failed to create tag")
//         setLocalTags(prevTags => prevTags.filter(tag => tag.id !== optimisticTag.id))
//       }
//     }
//   }

//   const handleDeleteTag = async (id: string) => {
//     const deletedTag = localTags.find(tag => tag.id === id)
//     setLocalTags(prevTags => prevTags.filter(tag => tag.id !== id))

//     try {
//       await deleteTag(spaceId, id)
//       updateTags(tags.filter(tag => tag.id !== id))
//       toast.success("Tag deleted successfully")
//     } catch (error) {
//       console.error('Error deleting tag:', error)
//       toast.error("Failed to delete tag")
//       if (deletedTag) {
//         setLocalTags(prevTags => [...prevTags, deletedTag])
//       }
//     }
//   }

//   const toggleTagDisplay = async (id: string) => {
//     setLocalTags(prevTags => prevTags.map(tag => 
//       tag.id === id ? { ...tag, displayOnWall: !tag.displayOnWall } : tag
//     ))

//     try {
//       const updatedTag = await updateTag(spaceId, id, { displayOnWall: !localTags.find(t => t.id === id)?.displayOnWall })
//       setLocalTags(prevTags => prevTags.map(tag => tag.id === id ? updatedTag : tag))
//       updateTags(tags.map(tag => tag.id === id ? updatedTag : tag))
//       toast.success("Tag display setting updated")
//     } catch (error) {
//       console.error('Error updating tag:', error)
//       toast.error("Failed to update tag display")
//       setLocalTags(prevTags => prevTags.map(tag => 
//         tag.id === id ? { ...tag, displayOnWall: !tag.displayOnWall } : tag
//       ))
//     }
//   }

//   const toggleTagActive = async (id: string) => {
//     setLocalTags(prevTags => prevTags.map(tag => 
//       tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
//     ))

//     try {
//       const updatedTag = await updateTag(spaceId, id, { isActive: !localTags.find(t => t.id === id)?.isActive })
//       setLocalTags(prevTags => prevTags.map(tag => tag.id === id ? updatedTag : tag))
//       updateTags(tags.map(tag => tag.id === id ? updatedTag : tag))
//       toast.success("Tag status updated")
//     } catch (error) {
//       console.error('Error updating tag:', error)
//       toast.error("Failed to update tag status")
//       setLocalTags(prevTags => prevTags.map(tag => 
//         tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
//       ))
//     }
//   }

//   const handleDragEnd = async (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const oldIndex = localTags.findIndex((tag) => tag.id === active.id);
//       const newIndex = localTags.findIndex((tag) => tag.id === over?.id);

//       const updatedTags = Array.from(localTags);
//       const [reorderedItem] = updatedTags.splice(oldIndex, 1);
//       updatedTags.splice(newIndex, 0, reorderedItem);

//       const finalUpdatedTags = updatedTags.map((tag, index) => ({
//         ...tag,
//         position: index
//       }));

//       setLocalTags(finalUpdatedTags);

//       try {
//         await reorderTags(spaceId, finalUpdatedTags);
//         updateTags(finalUpdatedTags);
//         toast.success("Tags reordered successfully");
//       } catch (error) {
//         console.error('Error reordering tags:', error);
//         toast.error("Failed to reorder tags");
//         setLocalTags(localTags);
//       }
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//           <X className="h-4 w-4" />
//           <span className="sr-only">Close</span>
//         </DialogPrimitive.Close>
//         <DialogHeader>
//           <DialogTitle>Manage tags</DialogTitle>
//         </DialogHeader>
//         <DialogDescription className="text-sm text-muted-foreground">
//           You can create up to 5 tags
//         </DialogDescription>
//           <div className="space-y-6">
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Enter tag name"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 className="flex-1"
//                 disabled={localTags.length >= 5}
//               />
//               <Button variant="default" onClick={handleCreateTag}>Create</Button>
//             </div>
//             {tags.length >= 5 && (
//                 <p className="text-sm text-red-500 text-muted-foreground">
//                   You used up all 5 tags!
//                 </p>
//               )} 
//         </div>
//         <div className="flex items-center space-x-2">
//           <Switch
//             id="display-tags"
//             checked={space?.tagsDisplayOnWall || false}
//             onCheckedChange={toggleTagsDisplayOnWall}
//           />
//           <Label htmlFor="display-tags">Display tags on Wall of Love</Label>
//         </div>
//         <div>
//           <DndContext 
//             sensors={sensors}
//             collisionDetection={closestCenter}
//             onDragEnd={handleDragEnd}
//           >
//             <SortableContext 
//               items={localTags.map(t => t.id)}
//               strategy={verticalListSortingStrategy}
//             >
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[40px]"></TableHead>
//                     <TableHead>
//                       Name
//                       <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
//                     </TableHead>
//                     <TableHead className="w-[100px] px-8 text-center">
//                       <EyeOff className="h-4 w-4 text-gray-400" />
//                     </TableHead>
//                     <TableHead className="w-[100px] px-8">
//                       <CircleOff className="h-4 w-4 text-gray-400" />
//                     </TableHead>
//                     <TableHead className="w-[100px]"></TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody className="pt-8">
//                   {localTags.map((tag) => (
//                     <SortableTableRow
//                       key={tag.id}
//                       tag={tag}
//                       toggleTagDisplay={toggleTagDisplay}
//                       toggleTagActive={toggleTagActive}
//                       handleDeleteTag={handleDeleteTag}
//                     />
//                   ))}
//                 </TableBody>
//               </Table>
//             </SortableContext>
//           </DndContext>
//         </div>

//         <p className="mt-4 text-sm text-muted-foreground">
//           Tips: You can drag and drop to reorder the tag's position on the Wall of Love
//         </p>
//       </DialogContent>
//       <Toaster position="top-center" richColors />
//     </Dialog>
//   )
// }

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
import { TagsContainer, Tag } from '@/lib/useTagsContainer'
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


