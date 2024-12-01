// //components/SideBarHandles/WallOfLoveLink.tsx
// "use client"

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Pencil, Copy, Eye } from 'lucide-react'
// import { toast } from "sonner"

// interface WallOfLovePageProps {
//   spaceId: string
//   spaceName: string
// }

// export default function WallOfLovePage({ spaceId, spaceName }: WallOfLovePageProps) {

//   const origin = typeof window !== 'undefined' ? window.location.origin : '';
//   const [wallUrl] = useState(`${origin}/${spaceName}/${spaceId}/all`)

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(wallUrl)
//       toast.success("URL copied to clipboard")
//     } catch (err) {
//       toast.error("Failed to copy URL")
//     }
//   }

//   const handlePreview = () => {
//     window.open(wallUrl, '_blank')
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-6">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold mb-2">Wall of Love</h1>
//         <p className="text-muted-foreground">View and share your Wall of Love</p>
//       </div>

//       <Card className="mb-8">
//         <CardContent className="pt-6">
//           <h2 className="text-lg font-semibold mb-4">On our hosted page</h2>
//           <div className="flex items-center gap-2">
//             <Input 
//               value={wallUrl}
//               readOnly
//               className="font-mono text-sm"
//             />
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => handleCopy()}
//             >
//               <Copy className="h-4 w-4" />
//               <span className="sr-only">Copy URL</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => handlePreview()}
//             >
//               <Eye className="h-4 w-4" />
//               <span className="sr-only">Preview</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//             >
//               <Pencil className="h-4 w-4" />
//               <span className="sr-only">Edit</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Add more sections for customization options */}
//       <Card>
//         <CardContent className="pt-6">
//           <h2 className="text-lg font-semibold mb-4">Customization</h2>
//           <p className="text-muted-foreground">
//             Customize your Wall of Love appearance and settings here.
//           </p>
//           {/* Add customization options as needed */}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

//Components/SideBarHandles/WallOfLoveLink.tsx -- workings
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Copy, Eye } from 'lucide-react'
import { toast, Toaster } from "sonner"

interface WallOfLovePageProps {
  spaceId: string
  spaceName: string
}

export default function WallOfLovePage({ spaceId, spaceName }: WallOfLovePageProps) {
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const wallUrl = `${origin}/${spaceName}/${spaceId}/all`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wallUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy. Please try again.");
    }
  };

  const handleEdit = () => {
    console.log("Edit Wall of Love");
    // Implement edit functionality
  };

  const handlePreview = () => {
    window.open(wallUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Wall of Love</h1>
      <p className="text-gray-600 mb-8">
        View and share your Wall of Love to showcase your testimonials.
      </p>

      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-8 bg-white rounded-lg">
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-gray-700 mb-4">
                Your Wall of Love Link
              </h2>
              <div className="flex items-center gap-4">
                <div
                  className="flex-1 p-3 bg-gray-100 rounded-lg overflow-x-auto"
                  style={{ maxWidth: "100%" }}
                >
                  <p className="text-sm text-gray-700 break-words">
                    {wallUrl}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="h-10 w-10 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg"
                  >
                    <Copy className="h-5 w-5" />
                    <span className="sr-only">Copy link</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEdit}
                    className="h-10 w-10 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg"
                  >
                    <Pencil className="h-5 w-5" />
                    <span className="sr-only">Edit Wall of Love</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePreview}
                    className="h-10 w-10 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg"
                  >
                    <Eye className="h-5 w-5" />
                    <span className="sr-only">Preview Wall of Love</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border border-gray-200 mt-8">
        <CardContent className="p-8 bg-white rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Customization</h2>
          <p className="text-gray-600 mb-4">
            Customize your Wall of Love appearance and settings here.
          </p>
          {/* Add customization options as needed */}
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            Customize Wall of Love
          </Button>
        </CardContent>
      </Card>

      <Toaster position="top-center" richColors />
    </div>
  );
}

