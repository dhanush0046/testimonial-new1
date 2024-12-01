// "use client"
// import { useState, useEffect } from 'react'
// import { createContainer } from 'unstated-next'
// import { fetchTags, createTag, deleteTag, updateTag, reorderTags } from '@/lib/dashboardApi'

// export interface Tag {
//   id: string
//   name: string
//   displayOnWall: boolean
//   isActive: boolean
//   position: number
// }

// function useTagsContainer(initialState: Tag[] = []) {
//   const [tags, setTags] = useState<Tag[]>(initialState)
//   const [spaceId, setSpaceId] = useState<string | null>(null)

//   const fetchTagsForSpace = async (spaceId: string) => {
//     setSpaceId(spaceId)
//     const fetchedTags = await fetchTags(spaceId)
//     setTags(fetchedTags)
//   }

//   const createNewTag = async (name: string) => {
//     if (!spaceId) return

//     const newTag = await createTag(spaceId, name, tags.length)
//     setTags(prevTags => [...prevTags, newTag])
//     return newTag
//   }

//   const updateExistingTag = async (id: string, updates: Partial<Tag>) => {
//     if (!spaceId) return

//     const updatedTag = await updateTag(spaceId, id, updates)
//     setTags(prevTags => prevTags.map(tag => tag.id === id ? updatedTag : tag))
//     return updatedTag
//   }

//   const deleteExistingTag = async (id: string) => {
//     if (!spaceId) return

//     await deleteTag(spaceId, id)
//     setTags(prevTags => prevTags.filter(tag => tag.id !== id))
//   }

//   const reorderExistingTags = async (newOrder: Tag[]) => {
//     if (!spaceId) return

//     await reorderTags(spaceId, newOrder)
//     setTags(newOrder)
//   }

//   return {
//     tags,
//     fetchTagsForSpace,
//     createNewTag,
//     updateExistingTag,
//     deleteExistingTag,
//     reorderExistingTags,
//   }
// }

// export const TagsContainer = createContainer(useTagsContainer)

//lib/useTagsContainer.ts
"use client"
import { useState, useCallback } from 'react'
import { createContainer } from 'unstated-next'
import {fetchTags, createTag, updateTag, deleteTag, reorderTags } from '@/lib/dashboardApi'

export interface Tag {
  id: string
  name: string
  displayOnWall: boolean
  isActive: boolean
  position: number
}

function useTagsContainer(initialState?: string) {
  const [tags, setTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [spaceId, setSpaceId] = useState<string | undefined>(initialState)

  const fetchTagsForSpace = useCallback(async (newSpaceId?: string) => {
    if (!newSpaceId && !spaceId) {
      setError('No space ID provided')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const fetchedTags = await fetchTags(newSpaceId || spaceId as string)
      setTags(fetchedTags)
      if (newSpaceId) {
        setSpaceId(newSpaceId)
      }
    } catch (err) {
      setError('Failed to fetch tags')
      console.error('Error fetching tags:', err)
    } finally {
      setIsLoading(false)
    }
  }, [spaceId])

  const createNewTag = useCallback(async (name: string) => {
    if (!spaceId) {
      throw new Error('No space ID set')
    }
    try {
      const position = tags.length // Assuming new tag should be added at the end
      const newTag = await createTag(spaceId, name, position)
      setTags(prevTags => [...prevTags, newTag])
    } catch (err) {
      console.error('Error creating tag:', err)
      throw err
    }
  }, [spaceId, tags.length])

  const updateExistingTag = useCallback(async (tagId: string, updates: Partial<Tag>) => {
    if (!spaceId) {
      throw new Error('No space ID set')
    }
    try {
      const updatedTag = await updateTag(spaceId, tagId, updates)
      setTags(prevTags => prevTags.map(tag => tag.id === tagId ? { ...tag, ...updatedTag } : tag))
    } catch (err) {
      console.error('Error updating tag:', err)
      throw err
    }
  }, [spaceId])

  const deleteExistingTag = useCallback(async (tagId: string) => {
    if (!spaceId) {
      throw new Error('No space ID set')
    }
    try {
      await deleteTag(spaceId, tagId)
      setTags(prevTags => prevTags.filter(tag => tag.id !== tagId))
    } catch (err) {
      console.error('Error deleting tag:', err)
      throw err
    }
  }, [spaceId])

  const reorderExistingTags = useCallback(async (reorderedTags: Tag[]) => {
    if (!spaceId) {
      throw new Error('No space ID set')
    }
    try {
      await reorderTags(spaceId, reorderedTags)
      setTags(reorderedTags)
    } catch (err) {
      console.error('Error reordering tags:', err)
      throw err
    }
  }, [spaceId])

  return {
    tags,
    isLoading,
    error,
    spaceId,
    setSpaceId,
    fetchTagsForSpace,
    createNewTag,
    updateExistingTag,
    deleteExistingTag,
    reorderExistingTags,
  }
}

export const TagsContainer = createContainer(useTagsContainer)