// //components/TestimonialActions/GetLinkDialog.tsx
// "use client"

// import { useState } from 'react'
// import { Check, Copy } from 'lucide-react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// interface GetLinkDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   testimonialId: string
//   spaceId: string
//   spaceName: string
// }

// export function GetLinkDialog({ isOpen, onClose, testimonialId, spaceId, spaceName }: GetLinkDialogProps) {
//   const [copied, setCopied] = useState(false)
  
//   // Generate the testimonial URL
//   const origin = typeof window !== 'undefined' ? window.location.origin : '';

//   const testimonialUrl = `${origin}/share/${spaceName}/${testimonialId}`

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(testimonialUrl)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     } catch (err) {
//       console.error('Failed to copy:', err)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Share Link</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-4 py-4">
//           <p className="text-sm text-muted-foreground">
//             Share it in your emails, in DMs or link to it from your website.
//           </p>
//           <div className="flex items-center gap-2">
//             <Input
//               value={testimonialUrl}
//               readOnly
//               className="flex-1"
//             />
//             <Button 
//               size="icon" 
//               onClick={handleCopy}
//               className="shrink-0"
//             >
//               {copied ? (
//                 <Check className="h-4 w-4" />
//               ) : (
//                 <Copy className="h-4 w-4" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }


"use client"

import { useState } from 'react'
import { Check, Copy, Link2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface GetLinkDialogProps {
  isOpen: boolean
  onClose: () => void
  testimonialId: string
  spaceId: string
  spaceName: string
}

export function GetLinkDialog({ isOpen, onClose, testimonialId, spaceId, spaceName }: GetLinkDialogProps) {
  const [copied, setCopied] = useState(false)
  
  // Generate the testimonial URL
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const testimonialUrl = `${origin}/share/${spaceName}/${testimonialId}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(testimonialUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleOpen = () => {
    window.open(testimonialUrl, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col justify-center items-center gap-4 w-full max-w-lg"> 
        <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-xl">
          <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex justify-center items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
            Testimonial Link Created Successfully!
          </DialogTitle>
            <p className="text-white/80 font-normal">
              Your shareable link is ready
            </p>
          </DialogHeader>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-lg break-all">
            <p className="text-sm text-gray-600">
              {testimonialUrl}
            </p>
          </div>

          <div className="flex justify-between items-center gap-4">
            <Button
            className="flex items-center justify-center px-5 py-3 bg-blue-500 text-white font-semibold text-lg rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button
            className="flex items-center justify-center px-5 py-3 bg-green-500 text-white font-semibold text-lg rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleOpen}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Open Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

