// //components/request-testimonials.tsx
// "use client"

// import { useState } from "react"
// import { Copy, Edit, Eye } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { toast, Toaster } from "sonner"

// interface RequestTestimonialsProps {
//   spaceId: string
//   spaceLink: string | null
// }

// export default function RequestTestimonials({ spaceId, spaceLink }: RequestTestimonialsProps) {
//   const [copied, setCopied] = useState(false)

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(spaceLink as string)
//       setCopied(true)
//       toast.success("Link copied to clipboard!")
//       setTimeout(() => setCopied(false), 2000)
//     } catch (err) {
//       toast.error("Failed to copy. Please try again.")
//     }
//   }

//   const handleEdit = () => {
//     // Implement edit functionality
//     console.log("Edit link")
//   }

//   const handlePreview = () => {
//     window.open(spaceLink as string, '_blank')
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 max-w-3xl">
//       <h1 className="text-2xl font-bold mb-2">Request Testimonials</h1>
//       <p className="text-muted-foreground mb-8">
//         Share this link with your clients or customers to request testimonials
//       </p>

//       <Card>
//         <CardContent className="p-6">
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-sm font-medium mb-2">On our hosted page</h2>
//               <div className="flex items-center gap-2">
//                 <div className="flex-1 p-2 bg-muted rounded-md">
//                   <p className="text-sm text-muted-foreground break-all">
//                     {spaceLink}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={handleCopy}
//                     className="h-9 w-9"
//                   >
//                     <Copy className="h-4 w-4" />
//                     <span className="sr-only">Copy link</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={handleEdit}
//                     className="h-9 w-9"
//                   >
//                     <Edit className="h-4 w-4" />
//                     <span className="sr-only">Edit link</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={handlePreview}
//                     className="h-9 w-9"
//                   >
//                     <Eye className="h-4 w-4" />
//                     <span className="sr-only">Preview page</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//       <Toaster position="top-center" richColors/>
//     </div>
//   )
// }

// components/request-testimonials.tsx
"use client";

import { useState } from "react";
import { Copy, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "sonner";

interface RequestTestimonialsProps {
  spaceId: string;
  spaceLink: string | null;
}

export default function RequestTestimonials({
  spaceId,
  spaceLink,
}: RequestTestimonialsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(spaceLink as string);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy. Please try again.");
    }
  };

  const handleEdit = () => {
    console.log("Edit link");
  };

  const handlePreview = () => {
    window.open(spaceLink as string, "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Request Testimonials</h1>
      <p className="text-gray-600 mb-8">
        Share this link with your clients or customers to collect their testimonials quickly and easily.
      </p>

      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-8 bg-white rounded-lg">
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-gray-700 mb-4">
                Your Hosted Page Link
              </h2>
              <div className="flex items-center gap-4">
                <div
                  className="flex-1 p-3 bg-gray-100 rounded-lg overflow-x-auto"
                  style={{ maxWidth: "100%" }}
                >
                  <p className="text-sm text-gray-700 break-words">
                    {spaceLink || "No link available"}
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
                    <Edit className="h-5 w-5" />
                    <span className="sr-only">Edit link</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePreview}
                    className="h-10 w-10 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg"
                  >
                    <Eye className="h-5 w-5" />
                    <span className="sr-only">Preview page</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Toaster position="top-center" richColors />
    </div>
  );
}
