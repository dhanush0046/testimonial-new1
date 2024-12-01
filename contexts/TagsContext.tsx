import React, { createContext, useState, useContext, useCallback } from 'react'
import { fetchTags } from '@/lib/dashboardApi'

export interface Tag {
  id: string
  name: string
  displayOnWall: boolean
  isActive: boolean
  position: number
}

interface TagsContextType {
  tags: Tag[]
  fetchTags: (spaceId: string) => Promise<void>
  updateTags: (newTags: Tag[]) => void
}

const TagsContext = createContext<TagsContextType | undefined>(undefined)

export const useTags = () => {
  const context = useContext(TagsContext)
  if (!context) {
    throw new Error('useTags must be used within a TagsProvider')
  }
  return context
}

export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([])

  const fetchTagsData = useCallback(async (spaceId: string) => {
    try {
      const fetchedTags = await fetchTags(spaceId)
      setTags(fetchedTags)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }, [])

  const updateTags = useCallback((newTags: Tag[]) => {
    setTags(newTags)
  }, [])

  return (
    <TagsContext.Provider value={{ tags, fetchTags: fetchTagsData, updateTags }}>
      {children}
    </TagsContext.Provider>
  )
}