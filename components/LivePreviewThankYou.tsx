// // //components/LivePreviewThankYou.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, MessageSquare } from 'lucide-react';
import { CreateSpaceInput, Theme } from '@/types/space';

interface LivePreviewThankYouProps {
  previewData: CreateSpaceInput;
}

export default function LivePreviewThankYou({ previewData }: LivePreviewThankYouProps) {
  const {
    thankYouImage,
    thankYouTitle,
    thankYouMessage,
    allowSocialShare,
    theme,
    spaceName,
    hideImage,
    logo
  } = previewData;

  const bgColor = theme === Theme.DARK ? 
    'bg-gradient-to-r from-gray-800 to-gray-900' :
    'bg-gradient-to-r from-purple-100 to-indigo-100';
  const textColor = theme === Theme.DARK ? 'text-white' : 'text-gray-900';
  const messageColor = theme === Theme.DARK ? 'text-gray-300' : 'text-gray-500';

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${bgColor} relative shadow-xl rounded-lg`}>
      <div className="py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-green-200 text-green-700 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
              Live preview - Thank you page
            </span>
          </div>

          {!hideImage && thankYouImage && (
            <div className="relative inline-flex flex-col justify-center mb-4">
              <Image
                src={thankYouImage instanceof File ? URL.createObjectURL(thankYouImage) : thankYouImage}
                alt="Thank You image"
                width={100}
                height={100}
                className="w-full mx-auto rounded object-cover"
              />
            </div>
          )}

          <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>{thankYouTitle || "Thank you!"}</h3>
          <div className={`custom-message text-base ${messageColor}`}>
            <p>{thankYouMessage || "Thank you so much for your shoutout! It means a ton for us! 🙏"}</p>
          </div>

          {allowSocialShare && (
            <div className="flex justify-center space-x-4 mt-6">
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// // //components/LivePreviewThankYou.tsx
// import React from 'react';
// import Image from 'next/image';
// import { Button } from "@/components/ui/button";
// import { Twitter, Linkedin, Facebook, MessageSquare } from 'lucide-react';
// import { CreateSpaceInput, Theme } from '@/types/space';

// interface LivePreviewThankYouProps {
//   previewData: CreateSpaceInput;
// }

// export default function LivePreviewThankYou({ previewData }: LivePreviewThankYouProps) {
//   const {
//     thankYouImage,
//     thankYouTitle,
//     thankYouMessage,
//     allowSocialShare,
//     theme,
//     customButtonColor,
//     spaceName,
//     hideImage
//   } = previewData;

//   const bgColor = theme === Theme.DARK ? 
//     'bg-gradient-to-r from-gray-800 to-gray-900' :
//     'bg-gradient-to-r from-purple-100 to-indigo-100';
//   const textColor = theme === Theme.DARK ? 'text-white' : 'text-gray-900';
//   const messageColor = theme === Theme.DARK ? 'text-gray-300' : 'text-gray-700';
//   const defaultButtonColor = theme === Theme.DARK ? 'bg-blue-600' : 'bg-blue-500';

//   return (
//     <div className={`relative ${bgColor} shadow-xl rounded-lg p-8 pt-14 max-w-2xl mx-auto animate-fadeIn transition duration-300 ease-in-out`}>
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//         <span className="bg-green-200 text-green-700 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
//           Live preview - Thank you page
//         </span>
//       </div>

//       <h2 className={`text-3xl font-bold text-center mb-4 break-words ${textColor}`}>{spaceName || "Your Space"}</h2>

//       {!hideImage && thankYouImage && (
//         <div className="w-full max-w-md mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-lg">
//           <Image
//             src={thankYouImage instanceof File ? URL.createObjectURL(thankYouImage) : thankYouImage}
//             alt="Thank You image"
//             width={400}
//             height={200}
//             className="object-cover w-70 h-auto"
//           />
//         </div>
//       )}

//       <h3 className={`text-2xl font-bold text-center mb-4 ${textColor}`}>{thankYouTitle || "Thank you!"}</h3>
//       <p className={`text-center mb-6 ${messageColor}`}>{thankYouMessage || "Thank you so much for your feedback!"}</p>

//       {allowSocialShare && (
//         <div className="flex justify-center space-x-4 mb-6">
//           <Button variant="outline" size="icon">
//             <Twitter className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon">
//             <Facebook className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon">
//             <Linkedin className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon">
//             <MessageSquare className="h-4 w-4" />
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }