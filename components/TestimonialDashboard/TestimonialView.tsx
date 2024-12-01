// //components/TestimonialDashboard/TestimonialView.tsx -- working
// "use client"

// import React, { useState, useEffect, useCallback } from 'react'
// import { getTestimonials, likeTestimonial, archiveTestimonial, highlightTestimonial, deleteTestimonial, updateTestimonialTags, fetchTags } from "@/lib/dashboardApi"
// import { Testimonial, TestimonialType } from '@/types/testimonial'
// import TestimonialControls from '@/components/TestimonialDashboard/TestimonialControls'
// import TestimonialList from '@/components/TestimonialDashboard/TestimonialList'
// import { DeleteConfirm } from "@/components/DeleteConfirm"
// import { Button } from "@/components/ui/button"
// import { Tag } from 'lucide-react'

// interface TestimonialViewProps {
//   activeTab: string
//   spaceId: string
//   updateCounts: (videoCount: number, textCount: number) => void
// }

// interface TagType {
//   id: string
//   name: string
//   displayOnWall: boolean
//   isActive: boolean
//   position: number
// }

// export default function TestimonialView({ activeTab, spaceId, updateCounts }: TestimonialViewProps) {
//   const [activeTag, setActiveTag] = useState<string | null>(null)
//   const [tags, setTags] = useState<TagType[]>([])
//   const [spaceTags, setSpaceTags] = useState<string[]>([])
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false)
//   const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null)

//   const fetchTagsData = useCallback(async () => {
//     try {
//       const fetchedTags = await fetchTags(spaceId)
//       const activeTags = fetchedTags.filter(tag => tag.isActive)
//       setTags(activeTags)
//       setSpaceTags(activeTags.map(tag => tag.name))
//     } catch (err) {
//       console.error('Error fetching tags:', err)
//     }
//   }, [spaceId])

//   const fetchTestimonials = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const data = await getTestimonials(spaceId)
//       setTestimonials(data)
//       const videoCount = data.filter(t => t.type === TestimonialType.VIDEO).length
//       const textCount = data.filter(t => t.type === TestimonialType.TEXT).length
//       updateCounts(videoCount, textCount)
//     } catch (err) {
//       setError('Error fetching testimonials. Please try again later.')
//       console.error('Error fetching testimonials:', err)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [spaceId, updateCounts])

//   useEffect(() => {
//     fetchTestimonials()
//     fetchTagsData()
//   }, [fetchTestimonials, fetchTagsData])

//   const filteredTestimonials = testimonials.filter(testimonial => {
//     const tabFilter = 
//       (activeTab === 'all' && !testimonial.isArchived) || 
//       (activeTab === 'video' && testimonial.type === TestimonialType.VIDEO && !testimonial.isArchived) ||
//       (activeTab === 'text' && testimonial.type === TestimonialType.TEXT && !testimonial.isArchived) ||
//       (activeTab === 'liked' && testimonial.isLiked && !testimonial.isArchived) ||
//       (activeTab === 'archived' && testimonial.isArchived)

//     const tagFilter = activeTag 
//       ? testimonial.tags?.includes(activeTag)
//       : true

//     const searchFilter = testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (Array.isArray(testimonial.extraInformation) && testimonial.extraInformation.some(item => 
//         item.value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       ))

//     return tabFilter && tagFilter && searchFilter
//   })

//   const handleLike = async (id: string) => {
//     try {
//       const updatedTestimonial = await likeTestimonial(id)
//       setTestimonials(prevTestimonials => 
//         prevTestimonials.map(t => 
//           t.id === id ? { ...t, isLiked: updatedTestimonial.isLiked, isHighlighted: updatedTestimonial.isHighlighted } : t
//         )
//       )
//     } catch (error) {
//       console.error('Error updating testimonial:', error)
//     }
//   }
  
//   const handleArchive = async (id: string) => {
//     try {
//       const updatedTestimonial = await archiveTestimonial(id)
//       setTestimonials(prevTestimonials => 
//         prevTestimonials.map(t => 
//           t.id === id ? { ...updatedTestimonial, isArchived: updatedTestimonial.isArchived } : t
//         )
//       )
//     } catch (error) {
//       console.error('Error archiving testimonial:', error)
//     }
//   }
  
//   const handleHighlight = async (id: string) => {
//     try {
//       const updatedTestimonial = await highlightTestimonial(id)
//       setTestimonials(prevTestimonials => 
//         prevTestimonials.map(t => 
//           t.id === id ? { ...t, isHighlighted: updatedTestimonial.isHighlighted } : t
//         )
//       )
//     } catch (error) {
//       console.error('Error highlighting testimonial:', error)
//     }
//   }

//   const handleDelete = async (id: string) => {
//     setTestimonialToDelete(id)
//     setDeleteModalOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (!testimonialToDelete) return

//     try {
//       await deleteTestimonial(testimonialToDelete)
//       setTestimonials(prevTestimonials => 
//         prevTestimonials.filter(t => t.id !== testimonialToDelete)
//       )
//       setDeleteModalOpen(false)
//       setTestimonialToDelete(null)
//     } catch (error) {
//       console.error('Error deleting testimonial:', error)
//     }
//   }

//   const handleTag = async (id: string, tags: string[]) => {
//     try {
//       const updatedTestimonial = await updateTestimonialTags(id, tags)
//       setTestimonials(prevTestimonials => 
//         prevTestimonials.map(t => 
//           t.id === id ? { ...t, tags: updatedTestimonial.tags } : t
//         )
//       )
//     } catch (error) {
//       console.error('Error updating testimonial tags:', error)
//     }
//   }

//   return (
//     <>
//       <div className="sticky top-[calc(var(--header-height)+1rem)] z-10 bg-white dark:bg-gray-900">
//         <TestimonialControls
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//         />
//       </div>

//       <div className="mb-4">
//         {tags.length > 0 && (
//           <div className='space-y-6'>
//             <div className="flex flex-wrap gap-2 items-center 2xl:w-3/4 2xl:mx-auto">
//               <Button
//                 variant={activeTag === null ? "secondary" : "outline"}
//                 size="sm"
//                 onClick={() => setActiveTag(null)}
//                 className={`rounded-full ${
//                   activeTag === null ? "bg-blue-500 text-white" : "hover:bg-gray-100"
//                 }`}
//               >
//                 All
//               </Button>
//               {tags.map((tag) => (
//                 <Button
//                   key={tag.id}
//                   variant={activeTag === tag.name ? "secondary" : "outline"}
//                   size="sm"
//                   onClick={() => setActiveTag(tag.name)}
//                   className={`rounded-full ${
//                     activeTag === tag.name
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   <Tag className="w-3 h-3 mr-1" />
//                   {tag.name}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <TestimonialList
//         isLoading={isLoading}
//         error={error}
//         filteredTestimonials={filteredTestimonials}
//         onLike={handleLike}
//         onArchive={handleArchive}
//         onHighlight={handleHighlight}
//         onDelete={handleDelete}
//         onTag={handleTag}
//         activeTab={activeTab}
//         spaceId={spaceId}
//         spaceTags={spaceTags}
//       />

//       <DeleteConfirm 
//         isOpen={deleteModalOpen}
//         onClose={() => {
//           setDeleteModalOpen(false)
//           setTestimonialToDelete(null)
//         }}
//         onConfirm={confirmDelete}
//       />
//     </>
//   )
// }

//components/TestimonialDashboard/TestimonialView.tsx new update testing for cpommonen tags
"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getTestimonials, likeTestimonial, archiveTestimonial, highlightTestimonial, deleteTestimonial, updateTestimonialTags } from "@/lib/dashboardApi"
import { Testimonial, TestimonialType } from '@/types/testimonial'
import TestimonialControls from '@/components/TestimonialDashboard/TestimonialControls'
import TestimonialList from '@/components/TestimonialDashboard/TestimonialList'
import { DeleteConfirm } from "@/components/DeleteConfirm"
import { Button } from "@/components/ui/button"
import { Tag } from 'lucide-react'
import { TagsContainer } from '@/lib/useTagsContainer'
import { Skeleton } from "@/components/ui/skeleton"

interface TestimonialViewProps {
  activeTab: string
  spaceId: string
  spaceName: string
  updateCounts: (videoCount: number, textCount: number) => void
}

export default function TestimonialView({ activeTab, spaceId, spaceName, updateCounts }: TestimonialViewProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null)

  const { tags } = TagsContainer.useContainer()

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTestimonials(spaceId)
      setTestimonials(data)
      const videoCount = data.filter(t => t.type === TestimonialType.VIDEO).length
      const textCount = data.filter(t => t.type === TestimonialType.TEXT).length
      updateCounts(videoCount, textCount)
    } catch (err) {
      setError('Error fetching testimonials. Please try again later.')
      console.error('Error fetching testimonials:', err)
    } finally {
      setIsLoading(false)
    }
  }, [spaceId, updateCounts])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(testimonial => {
      const tabFilter = 
        (activeTab === 'all' && !testimonial.isArchived) || 
        (activeTab === 'video' && testimonial.type === TestimonialType.VIDEO && !testimonial.isArchived) ||
        (activeTab === 'text' && testimonial.type === TestimonialType.TEXT && !testimonial.isArchived) ||
        (activeTab === 'liked' && testimonial.isLiked && !testimonial.isArchived) ||
        (activeTab === 'archived' && testimonial.isArchived)

      const tagFilter = activeTag 
        ? testimonial.tags?.includes(activeTag)
        : true

      const searchFilter = testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(testimonial.extraInformation) && testimonial.extraInformation.some(item => 
          item.value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ))

      return tabFilter && tagFilter && searchFilter
    })
  }, [testimonials, activeTab, activeTag, searchTerm])

  const handleOptimisticUpdate = useCallback((id: string, updateFn: (testimonial: Testimonial) => Testimonial) => {
    setTestimonials(prevTestimonials => 
      prevTestimonials.map(testimonial =>
        testimonial.id === id ? updateFn(testimonial) : testimonial
      )
    )
  }, [])

  const handleLike = useCallback(async (id: string) => {
    handleOptimisticUpdate(id, (t) => ({ ...t, isLiked: !t.isLiked }))
    try {
      const updatedTestimonial = await likeTestimonial(id)
      setTestimonials(prevTestimonials => 
        prevTestimonials.map(t => 
          t.id === id ? { ...t, isLiked: updatedTestimonial.isLiked, isHighlighted: updatedTestimonial.isHighlighted } : t
        )
      )
    } catch (error) {
      console.error('Error updating testimonial:', error)
      handleOptimisticUpdate(id, (t) => ({ ...t, isLiked: !t.isLiked }))
    }
  }, [handleOptimisticUpdate])

  const handleArchive = useCallback(async (id: string) => {
    handleOptimisticUpdate(id, (t) => ({ ...t, isArchived: !t.isArchived }))
    try {
      const updatedTestimonial = await archiveTestimonial(id)
      setTestimonials(prevTestimonials => 
        prevTestimonials.map(t => 
          t.id === id ? { ...updatedTestimonial, isArchived: updatedTestimonial.isArchived } : t
        )
      )
    } catch (error) {
      console.error('Error archiving testimonial:', error)
      handleOptimisticUpdate(id, (t) => ({ ...t, isArchived: !t.isArchived }))
    }
  }, [handleOptimisticUpdate])

  const handleHighlight = useCallback(async (id: string) => {
    handleOptimisticUpdate(id, (t) => ({ ...t, isHighlighted: !t.isHighlighted }))
    try {
      const updatedTestimonial = await highlightTestimonial(id)
      setTestimonials(prevTestimonials => 
        prevTestimonials.map(t => 
          t.id === id ? { ...t, isHighlighted: updatedTestimonial.isHighlighted } : t
        )
      )
    } catch (error) {
      console.error('Error highlighting testimonial:', error)
      handleOptimisticUpdate(id, (t) => ({ ...t, isHighlighted: !t.isHighlighted }))
    }
  }, [handleOptimisticUpdate])

  const handleDelete = useCallback((id: string) => {
    setTestimonialToDelete(id)
    setDeleteModalOpen(true)
  }, [])

  const confirmDelete = useCallback(async () => {
    if (!testimonialToDelete) return

    try {
      await deleteTestimonial(testimonialToDelete)
      setTestimonials(prevTestimonials => 
        prevTestimonials.filter(t => t.id !== testimonialToDelete)
      )
      setDeleteModalOpen(false)
      setTestimonialToDelete(null)
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }, [testimonialToDelete])

  const handleTag = useCallback(async (id: string, tags: string[]) => {
    handleOptimisticUpdate(id, (t) => ({ ...t, tags }))
    try {
      const updatedTestimonial = await updateTestimonialTags(id, tags)
      setTestimonials(prevTestimonials => 
        prevTestimonials.map(t => 
          t.id === id ? { ...t, tags: updatedTestimonial.tags } : t
        )
      )
    } catch (error) {
      console.error('Error updating testimonial tags:', error)
      handleOptimisticUpdate(id, (t) => ({ ...t, tags: t.tags }))
    }
  }, [handleOptimisticUpdate])

  return (
    <>
      <div className="sticky top-[calc(var(--header-height)+1rem)] z-10 bg-white dark:bg-gray-900">
        <TestimonialControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-8 w-20 rounded-full" />
            ))}
          </div>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-56 w-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4">
            {tags.length > 0 && (
              <div className='space-y-6'>
                <div className="flex flex-wrap gap-2 items-center 2xl:w-3/4 2xl:mx-auto">
                  <Button
                    variant={activeTag === null ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveTag(null)}
                    className={`rounded-full ${
                      activeTag === null ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    All
                  </Button>
                  {tags.filter(tag => tag.isActive).map((tag) => (
                    <Button
                      key={tag.id}
                      variant={activeTag === tag.name ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setActiveTag(tag.name)}
                      className={`rounded-full ${
                        activeTag === tag.name
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <TestimonialList
            isLoading={isLoading}
            error={error}
            filteredTestimonials={filteredTestimonials}
            spaceId={spaceId}
            spaceName={spaceName}
            onLike={handleLike}
            onArchive={handleArchive}
            onHighlight={handleHighlight}
            onDelete={handleDelete}
            onTag={handleTag}
            activeTab={activeTab}
          />
        </>
      )}

      <DeleteConfirm 
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setTestimonialToDelete(null)
        }}
        onConfirm={confirmDelete}
      />
    </>
  )
}

