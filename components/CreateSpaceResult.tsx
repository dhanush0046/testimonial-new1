import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FiCopy, FiLink } from "react-icons/fi";
import confetti from 'canvas-confetti';
import { toast, Toaster } from 'sonner';

interface CreateSpaceResultProps {
  spaceName: string;
  spaceId: string;
  shareableLink: string;
  onOpenLink?: (link: string) => void;
}

export default function CreateSpaceResult({ spaceName, spaceId, shareableLink, onOpenLink }: CreateSpaceResultProps) {

  const finalSharableLink = `${window.location.origin}/submit-testimonial/${spaceName}/${spaceId}`;
  const handleCopyLink = () => {

    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink);
      toast.success('Link copied to clipboard!', {
        duration: 2000,
      });
    } else {
      navigator.clipboard.writeText(finalSharableLink);
      toast.success('Link copied to clipboard!', {
        duration: 2000,
      });
    }
    // navigator.clipboard.writeText(shareableLink);
    // toast.success('Link copied to clipboard!', {
    //   duration: 2000,
    // });
  };

  const handleOpenLink = () => {
    if (onOpenLink) {
      onOpenLink(shareableLink);
    } else {
      window.open(shareableLink, '_blank');
    }
  };

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#bb0000', '#ffffff'],
    });
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-xl overflow-hidden animate-fadeIn bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <CardHeader className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-extrabold">🎉 Space Created Successfully!</CardTitle>
          <CardDescription className="text-md font-light mt-3">Your shareable link is ready</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-lg text-gray-700 font-medium break-words bg-gray-100 p-4 rounded-lg shadow-inner">
            {shareableLink}
          </p>
        </CardContent>
        <CardFooter className="p-8 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50">
          <Button
            onClick={handleCopyLink}
            className="flex items-center justify-center px-5 py-3 bg-blue-500 text-white font-semibold text-lg rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FiCopy className="mr-2" /> Copy Link
          </Button>
          <Button
            onClick={handleOpenLink}
            className="flex items-center justify-center px-5 py-3 bg-green-500 text-white font-semibold text-lg rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FiLink className="mr-2" /> Open Link
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

// import React, { useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { FiCopy, FiLink } from "react-icons/fi";
// import confetti from 'canvas-confetti';  // Confetti library
// import { toast, Toaster } from 'sonner';  // Sonner toast notification

// interface CreateSpaceResultProps {
//   spaceName: string;
//   spaceId: string;
//   onOpenLink?: (link: string) => void;
// }

// export default function CreateSpaceResult({ spaceName, spaceId, onOpenLink }: CreateSpaceResultProps) {
//   const shareableLink = `/submit-testimonial/${spaceName}/${spaceId}`;

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.origin + shareableLink);
//     toast.success('Link copied to clipboard!', {
//       duration: 2000,
//     });
//   };

//   const handleOpenLink = () => {
//     if (onOpenLink) {
//       onOpenLink(shareableLink);
//     } else {
//       window.open(shareableLink, '_blank');
//     }
//   };

//   useEffect(() => {
//     // Trigger confetti when the space is created
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//       colors: ['#bb0000', '#ffffff'],
//     });
//   }, []);

//   return (
//     <>
//       {/* Sonner Toaster */}
//       <Toaster richColors position="top-center" />
      
//       <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-xl overflow-hidden animate-fadeIn bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
//         <CardHeader className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-xl">
//           <CardTitle className="text-3xl font-extrabold">🎉 Space Created Successfully!</CardTitle>
//           <CardDescription className="text-md font-light mt-3">Your shareable link is ready</CardDescription>
//         </CardHeader>
//         <CardContent className="p-8">
//           <p className="text-lg text-gray-700 font-medium break-words bg-gray-100 p-4 rounded-lg shadow-inner">
//             {window.location.origin + shareableLink}
//           </p>
//         </CardContent>
//         <CardFooter className="p-8 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50">
//           <Button
//             onClick={handleCopyLink}
//             className="flex items-center justify-center px-5 py-3 bg-blue-500 text-white font-semibold text-lg rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             <FiCopy className="mr-2" /> Copy Link
//           </Button>
//           <Button
//             onClick={handleOpenLink}
//             className="flex items-center justify-center px-5 py-3 bg-green-500 text-white font-semibold text-lg rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             <FiLink className="mr-2" /> Open Link
//           </Button>
//         </CardFooter>
//       </Card>
//     </>
//   );
// }
