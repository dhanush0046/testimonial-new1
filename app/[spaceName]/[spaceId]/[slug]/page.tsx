// //app/[spaceName]/[spaceId]/[slug]/page.tsx -- workings
// "use client"

// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Star} from 'lucide-react'
// import { format } from 'date-fns'
// import { getTestimonials, fetchTags } from '@/lib/dashboardApi'
// import { Testimonial, TestimonialType } from '@/types/testimonial'
// import { Space } from '@/types/space'
// import { getSpace } from '@/lib/api'

// interface Tag {
//   id: string
//   name: string
// }

// export default function WallOfLovePage({ 
//   params 
// }: { 
//   params: { spaceName: string; spaceId: string; slug: string } 
// }) {
//   const [space, setSpace] = useState<Space | null>(null)
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([])
//   const [tags, setTags] = useState<Tag[]>([])
//   const [activeTag, setActiveTag] = useState('all')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [ fetchedSpace, fetchedTestimonials, fetchedTags] = await Promise.all([
//           getSpace(params.spaceId),
//           getTestimonials(params.spaceId),
//           fetchTags(params.spaceId)
//         ])
//         setSpace(fetchedSpace)
//         setTestimonials(fetchedTestimonials)
//         setTags(fetchedTags)
//       } catch (error) {
//         console.error('Error loading data:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     loadData()
//   }, [params.spaceId])

//   const filteredTestimonials = activeTag === 'all'
//     ? testimonials
//     : testimonials.filter(t => t.tags.includes(activeTag))

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100">
//       {/* Hero Section */}
//       <div className="relative h-[300px] bg-gradient-to-r from-gray-800 to-gray-900 text-white">
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
//           <h1 className="text-4xl font-bold mb-6">
//             Wall of love for {params.spaceName}
//           </h1>
//           <Button 
//             variant="default" 
//             className="bg-blue-600 hover:bg-blue-700"
//           >
//             Submit your testimonial
//           </Button>
//           <a 
//             href="#" 
//             className="mt-2 text-sm text-blue-300 hover:text-blue-200"
//           >
//             Build your own wall? It's free 👉
//           </a>
//         </div>
//       </div>

//       {/* Tags Filter */}
//       {space?.tagsDisplayOnWall && (
//         <div className="flex justify-center gap-2 py-6 flex-wrap">
//           <Button
//             variant={activeTag === 'all' ? "secondary" : "ghost"}
//             onClick={() => setActiveTag('all')}
//             className="rounded-full"
//           >
//             All
//           </Button>
//           {tags.map(tag => (
//             <Button
//               key={tag.id}
//               variant={activeTag === tag.id ? "secondary" : "ghost"}
//               onClick={() => setActiveTag(tag.id)}
//               className="rounded-full"
//             >
//               {tag.name}
//             </Button>
//           ))}
//         </div>
//       )}
//       {/* Testimonials Grid */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTestimonials.map((testimonial) => (
//             <Card key={testimonial.id} className="bg-white overflow-hidden">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                   {testimonial.photo ? (
//                     <img
//                       src={testimonial.photo}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200"></div>
//                   )}
//                     <div>
//                       <h3 className="font-semibold text-gray-900">
//                         {testimonial.extraInformation.find(item => item.label === "Name")?.value.toString()}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         {testimonial.extraInformation.find(item => item.label === "Title,Company")?.value.toString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 {testimonial.rating && (
//                   <div className="flex gap-1 text-yellow-400 mb-2">
//                     {Array.from({ length: testimonial.rating }).map((_, i) => (
//                       <Star key={i} className="h-4 w-4 fill-current" />
//                     ))}
//                   </div>
//                 )}
                
//                 <p className="text-gray-700 mb-4">{testimonial.content}</p>
                
//                 {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
//                   <div className="grid grid-cols-2 gap-2 mb-4">
//                     {testimonial.attachedImages.map((image, index) => (
//                       <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-40 h-20 rounded-lg" />
//                     ))}
//                   </div>
//                 )}
                
//                 {testimonial.videoUrl && (
//                   <div className="mb-4">
//                     <video 
//                       src={testimonial.videoUrl} 
//                       width={200} controls 
//                       className="rounded-lg"
//                     >
//                       Your browser does not support the video tag.
//                     </video>
//                   </div>
//                 )}
                
//                 <div className="flex justify-between items-center text-sm text-gray-500">
//                   <span>{format(new Date(testimonial.createdAt), 'MMM dd, yyyy')}</span>
//                 </div>
                
//                   {/* {testimonial.tags.length > 0 && (
//                     <div className="mt-2 flex flex-wrap gap-1">
//                       {testimonial.tags.map((tag, index) => (
//                         <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )} */}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Reorder Button */}
//       <div className="fixed bottom-4 right-4">
//         <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
//           Reorder
//         </Button>
//       </div>
//     </div>
//   )
// }


//app/[spaceName]/[spaceId]/[slug]/page.tsx -- workings
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Camera, Settings } from 'lucide-react'
import { format } from 'date-fns'
import { getTestimonials, fetchTags } from '@/lib/dashboardApi'
import { Testimonial, TestimonialType } from '@/types/testimonial'
import { Space, WallOfLoveSettings } from '@/types/space'
import { getSpaceWithWallOfLoveSettings, updateWallOfLoveSettings } from '@/lib/api'
import { toast } from "sonner"
import CoverImageModal from '@/components/WallOfLove/CoverImageModal'
import WallOfLoveSettingsModal from '@/components/WallOfLove/WallOfLoveSettings'

interface Tag {
  id: string
  name: string
}

const defaultWallOfLoveSettings: WallOfLoveSettings = {
  coverImage: '/walloflove.jpg',
  coverImageDarkness: 100,
  topBannerTextColor: '#FFFFFF',
  topBannerButtonColor: '#4F46E5',
  topBannerText: 'Wall of Love',
  topBannerButtonText: 'Submit Testimonial',
  showBorder: false,
  borderRadius: 'small',
  borderColor: '#E5E7EB',
  borderThickness: 1
}

export default function WallOfLovePage({ 
  params 
}: { 
  params: { spaceName: string; spaceId: string; slug: string } 
}) {

  
  const [space, setSpace] = useState<Space | null>(null)
  const [wallOfLoveSettings, setWallOfLoveSettings] = useState<WallOfLoveSettings>(defaultWallOfLoveSettings)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [activeTag, setActiveTag] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [coverImageKey, setCoverImageKey] = useState(Date.now())
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedSpaceWithSettings, fetchedTestimonials, fetchedTags] = await Promise.all([
          getSpaceWithWallOfLoveSettings(params.spaceId),
          getTestimonials(params.spaceId),
          fetchTags(params.spaceId)
        ])
        setSpace(fetchedSpaceWithSettings)
        setWallOfLoveSettings(prevSettings => ({
          ...defaultWallOfLoveSettings,
          ...fetchedSpaceWithSettings.wallOfLoveSettings
        }))
        setTestimonials(fetchedTestimonials)
        setTags(fetchedTags)
      } catch (error) {
        console.error('Error loading data:', error)
        toast.error('Failed to load Wall of Love data')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [params.spaceId])

  const handleWallOfLoveSettingsUpdate = async (updatedSettings: Partial<WallOfLoveSettings>) => {
    try {
      const response = await updateWallOfLoveSettings(params.spaceId, updatedSettings)
      setWallOfLoveSettings(prevSettings => ({ ...prevSettings, ...response }))
      setCoverImageKey(Date.now()) // Force re-render of the cover image
      toast.success('Wall of Love settings updated successfully')
    } catch (error) {
      console.error('Error updating Wall of Love settings:', error)
      toast.error('Failed to update Wall of Love settings')
    }
  }

  const filteredTestimonials = activeTag === 'all'
    ? testimonials
    : testimonials.filter(t => t.tags.includes(activeTag))

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleGetTestimonial = () => {
    space?.shareableLink && window.open(space.shareableLink, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <Image
          key={coverImageKey}
          src={wallOfLoveSettings.coverImage || '/default-cover.jpg'} // Provide a default image
          alt="Cover Image"
          fill
          priority
          style={{objectFit:'cover'}}
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: `rgba(0, 0, 0, ${(100 - wallOfLoveSettings.coverImageDarkness) / 100})` 
          }} 
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold mb-6" style={{ color: wallOfLoveSettings.topBannerTextColor }}>
            {wallOfLoveSettings.topBannerText}
          </h1>
          <Button 
            variant="default" 
            className="text-white"
            style={{ backgroundColor: wallOfLoveSettings.topBannerButtonColor }}
            onClick={handleGetTestimonial}
          >
            {wallOfLoveSettings.topBannerButtonText}
          </Button>
          <a 
            href="#" 
            className="mt-2 text-sm text-blue-300 hover:text-blue-200"
          >
            Build your own wall? It's free 👉
          </a>
        </div>

        {/* Cover Image and Settings Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 cursor-pointer"
            onClick={() => setIsCoverModalOpen(true)}
          >
            <Camera className="h-4 w-4 text-white cursor-pointer" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 cursor-pointer"
            onClick={() => setIsSettingsModalOpen(true)}
          >
            <Settings className="h-4 w-4 text-white cursor-pointer" />
          </Button>
        </div>
      </div>

      {/* Tags Filter */}
      {space?.tagsDisplayOnWall && (
        <div className="flex justify-center gap-2 py-6 flex-wrap">
          <Button
            variant={activeTag === 'all' ? "secondary" : "ghost"}
            onClick={() => setActiveTag('all')}
            className="rounded-full"
          >
            All
          </Button>
          {tags.map(tag => (
            <Button
              key={tag.id}
              variant={activeTag === tag.id ? "secondary" : "ghost"}
              onClick={() => setActiveTag(tag.id)}
              className="rounded-full"
            >
              {tag.name}
            </Button>
          ))}
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-white overflow-hidden"
              style={{
                borderRadius: wallOfLoveSettings.borderRadius === 'none' ? undefined : wallOfLoveSettings.borderRadius,
                border: wallOfLoveSettings.showBorder ? `${wallOfLoveSettings.borderThickness}px solid ${wallOfLoveSettings.borderColor}` : 'none'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {testimonial.photo ? (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.extraInformation.find(item => item.id === "name")?.value.toString() || "Testimonial author"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.extraInformation.find(item => item.id === "name")?.value.toString()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.extraInformation.find(item => item.id === "title,company")?.value.toString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {testimonial.rating && (
                  <div className="flex gap-1 text-yellow-400 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                )}
                
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                
                {testimonial.attachedImages && testimonial.attachedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {testimonial.attachedImages.map((image, index) => (
                      <img key={index} src={image} alt={`Attached image ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
                
                {testimonial.videoUrl && (
                  <div className="mb-4">
                    <video 
                      src={testimonial.videoUrl} 
                      controls 
                      className="w-full rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{format(new Date(testimonial.createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CoverImageModal
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        onUpdate={handleWallOfLoveSettingsUpdate}
        currentSettings={wallOfLoveSettings}
      />
      <WallOfLoveSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onUpdate={handleWallOfLoveSettingsUpdate}
        currentSettings={wallOfLoveSettings}
        space={space}
      />

      {/* Reorder Button */}
      <div className="fixed bottom-4 right-4">
        <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
          Reorder
        </Button>
      </div>
    </div>
  )
}