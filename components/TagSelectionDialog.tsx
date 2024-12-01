// //components/TagSelectionDialog.tsx -- working
// "use client"

// import * as React from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import { ChevronDown, ChevronUp, X } from 'lucide-react'
// import { fetchTags, Tag, fetchTestimonialTags } from "@/lib/dashboardApi"

// interface TagSelectionDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   spaceId: string
//   testimonialId: string
//   onCreateTags: () => void
//   onSelectTags: (selectedTags: string[]) => void
// }

// export function TagSelectionDialog({
//   isOpen,
//   onClose,
//   spaceId,
//   testimonialId,
//   onCreateTags,
//   onSelectTags,
// }: TagSelectionDialogProps) {
//   const [spaceTags, setSpaceTags] = React.useState<Tag[]>([])
//   const [selectedTags, setSelectedTags] = React.useState<string[]>([])
//   const [isLoading, setIsLoading] = React.useState(true)
//   const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
//   const [searchTerm, setSearchTerm] = React.useState("")
//   const dropdownRef = React.useRef<HTMLDivElement>(null)

//   React.useEffect(() => {
//     if (isOpen) {
//       setIsLoading(true)
//       Promise.all([
//         fetchTags(spaceId),
//         fetchTestimonialTags(testimonialId)
//       ])
//         .then(([fetchedSpaceTags, testimonialTags]) => {
//           setSpaceTags(fetchedSpaceTags)
//           setSelectedTags(testimonialTags.filter(tag => 
//             fetchedSpaceTags.some(spaceTag => spaceTag.name === tag)
//           ))
//           setIsLoading(false)
//         })
//         .catch(error => {
//           console.error('Error fetching tags:', error)
//           setIsLoading(false)
//         })
//     }
//   }, [isOpen, spaceId, testimonialId])

//   React.useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   const filteredTags = spaceTags.filter(tag => 
//     tag.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const handleSelectAll = (checked: boolean) => {
//     if (checked) {
//       setSelectedTags(filteredTags.map(tag => tag.name))
//     } else {
//       setSelectedTags([])
//     }
//   }

//   const handleSelect = (tagName: string) => {
//     setSelectedTags(current => {
//       const newSelected = current.includes(tagName)
//         ? current.filter(name => name !== tagName)
//         : [...current, tagName]
//       return newSelected
//     })
//   }

//   const handleApply = () => {
//     onSelectTags(selectedTags)
//     onClose()
//   }

//   const getSelectedTagNames = () => {
//     return selectedTags.join(", ")
//   }

//   const handleClearSelection = () => {
//     setSelectedTags([])
//   }

//   if (isLoading) {
//     return (
//       <Dialog open={isOpen} onOpenChange={() => {}}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle className="text-center">Apply tags to this testimonial</DialogTitle>
//           </DialogHeader>
//           <DialogDescription className="text-sm text-muted-foreground text-center">
//             Loading tags...
//           </DialogDescription>
//           <div className="flex items-center justify-center py-6">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     )
//   }

//   if (spaceTags.length === 0) {
//     return (
//       <Dialog open={isOpen} onOpenChange={() => {}}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Apply tags to this testimonial</DialogTitle>
//           </DialogHeader>
//           <div className="flex flex-col py-6 space-y-4">
//             <DialogDescription className="text-sm text-muted-foreground text-center">
//               You don&apos;t have any tags. Click the button below to create some 👇
//             </DialogDescription>
//             <div className="flex justify-between">
//               <Button variant="outline" onClick={onClose}>Close</Button>
//               <Button variant="outline" onClick={onCreateTags}>Create tags</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     )
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={() => {}}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Apply tags to this testimonial</DialogTitle>
//         </DialogHeader>
//         <DialogDescription className="text-sm text-muted-foreground text-center">
//           You can add multiple tags if you want. Manage all your tags{" "}
//             <button 
//               className="text-primary underline" 
//               onClick={onCreateTags}
//             >
//               here
//             </button>
//             .
//         </DialogDescription>
//         <div className="relative" ref={dropdownRef}>
//           <div className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-background">
//             <button
//               className="flex-1 text-left text-sm truncate hover:bg-accent"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               {selectedTags.length > 0 ? getSelectedTagNames() : "Select..."}
//             </button>
//             {selectedTags.length > 0 && (
//               <button
//                 onClick={handleClearSelection}
//                 className="ml-2 p-1 hover:bg-accent rounded-md"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="ml-2 p-1 hover:bg-accent rounded-md"
//             >
//               {isDropdownOpen ? (
//                 <ChevronUp className="h-4 w-4 opacity-50" />
//               ) : (
//                 <ChevronDown className="h-4 w-4 opacity-50" />
//               )}
//             </button>
//           </div>
          
//           {isDropdownOpen && (
//             <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-md">
//               <div className="p-2">
//                 <Input
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="mb-2"
//                 />
//                 <div className="space-y-2">
//                   <label className="flex items-center space-x-2">
//                     <Checkbox 
//                       checked={selectedTags.length === filteredTags.length && filteredTags.length > 0}
//                       onCheckedChange={handleSelectAll}
//                     />
//                     <span className="text-sm font-medium">Select All</span>
//                   </label>
//                   {filteredTags.map(tag => (
//                     <label key={tag.id} className="flex items-center space-x-2">
//                       <Checkbox
//                         checked={selectedTags.includes(tag.name)}
//                         onCheckedChange={() => handleSelect(tag.name)}
//                       />
//                       <span className="text-sm">{tag.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="flex justify-between space-x-2 mt-4">
//           <Button variant="outline" onClick={onClose}>
//             Close
//           </Button>
//           <Button variant="outline" onClick={handleApply}>Apply</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }


//components/TagSelectionDialog.tsx -- new update testing
"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { fetchTestimonialTags } from "@/lib/dashboardApi"
import { TagsContainer } from '@/lib/useTagsContainer'
import { Skeleton } from "@/components/ui/skeleton"

interface TagSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  spaceId: string
  testimonialId: string
  onCreateTags: () => void
  onSelectTags: (selectedTags: string[]) => void
}

export default function TagSelectionDialog({
  isOpen,
  onClose,
  spaceId,
  testimonialId,
  onCreateTags,
  onSelectTags,
}: TagSelectionDialogProps) {
  const { tags } = TagsContainer.useContainer()
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const activeTags = React.useMemo(() => tags.filter(tag => tag.isActive), [tags])

  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      fetchTestimonialTags(testimonialId)
        .then((testimonialTags) => {
          setSelectedTags(testimonialTags.filter(tag => 
            activeTags.some(spaceTag => spaceTag.name === tag)
          ))
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error fetching testimonial tags:', error)
          setIsLoading(false)
        })
    }
  }, [isOpen, testimonialId, activeTags])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredTags = React.useMemo(() => 
    activeTags.filter(tag => 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [activeTags, searchTerm]
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTags(filteredTags.map(tag => tag.name))
    } else {
      setSelectedTags([])
    }
  }

  const handleSelect = (tagName: string) => {
    setSelectedTags(current => {
      const newSelected = current.includes(tagName)
        ? current.filter(name => name !== tagName)
        : [...current, tagName]
      return newSelected
    })
  }

  const handleApply = () => {
    onSelectTags(selectedTags)
    onClose()
  }

  const getSelectedTagNames = () => {
    return selectedTags.join(", ")
  }

  const handleClearSelection = () => {
    setSelectedTags([])
  }

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Apply tags to this testimonial</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Loading tags...
          </DialogDescription>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <div className="flex justify-between space-x-2 mt-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (activeTags.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply tags to this testimonial</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col py-6 space-y-4">
            <DialogDescription className="text-sm text-muted-foreground text-center">
              You don&apos;t have any active tags. Click the button below to create or activate some 👇
            </DialogDescription>
            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button variant="outline" onClick={onCreateTags}>Manage tags</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply tags to this testimonial</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-muted-foreground text-center">
          You can add multiple tags if you want. Manage all your tags{" "}
          <button 
            className="text-primary underline" 
            onClick={onCreateTags}
          >
            here
          </button>
          .
        </DialogDescription>
        <div className="relative" ref={dropdownRef}>
          <div className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-background">
            <button
              className="flex-1 text-left text-sm truncate hover:bg-accent"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedTags.length > 0 ? getSelectedTagNames() : "Select..."}
            </button>
            {selectedTags.length > 0 && (
              <button
                onClick={handleClearSelection}
                className="ml-2 p-1 hover:bg-accent rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="ml-2 p-1 hover:bg-accent rounded-md"
            >
              {isDropdownOpen ? (
                <ChevronUp className="h-4 w-4 opacity-50" />
              ) : (
                <ChevronDown className="h-4 w-4 opacity-50" />
              )}
            </button>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-md">
              <div className="p-2">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Checkbox 
                      checked={selectedTags.length === filteredTags.length && filteredTags.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium">Select All</span>
                  </label>
                  {filteredTags.map(tag => (
                    <label key={tag.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedTags.includes(tag.name)}
                        onCheckedChange={() => handleSelect(tag.name)}
                      />
                      <span className="text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" onClick={handleApply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}