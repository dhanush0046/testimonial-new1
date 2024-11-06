//components/LivePreview.tsx
import React from 'react';
import { CreateSpaceInput, Theme, CollectionType } from '@/types/space';
import { Button } from "@/components/ui/button"

interface LivePreviewProps {
  previewData: CreateSpaceInput;
}

export default function LivePreview({ previewData }: LivePreviewProps) {
  const { headerTitle, customMessage, questions, logo, theme, spaceName, logoShape } = previewData;

  // Set background and text color based on the theme
  const bgColor = theme === Theme.DARK ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-purple-100 to-indigo-100';
  const textColor = theme === Theme.DARK ? 'text-white' : 'text-gray-900';
  const questionTextColor = theme === Theme.DARK ? 'text-gray-300' : 'text-gray-700'; // Improved contrast for dark theme
  const defaultButtonColor = theme === Theme.DARK ? 'bg-blue-600' : 'bg-blue-500';

  // Handling logo URL for string or File types
  const logoUrl = typeof logo === 'string' ? logo : (logo instanceof File ? URL.createObjectURL(logo) : null);

  return (
    <div className={`relative ${bgColor} shadow-2xl rounded-lg p-8 pt-14 max-w-2xl mx-auto animate-fadeIn transition duration-300 ease-in-out`}>
      {/* Pill-shaped "Live Preview" heading (half-outside the container) */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-green-200 text-green-700 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
          Live preview - Testimonial page
        </span>
      </div>

      <h2 className={`text-3xl font-bold text-center mb-4 break-words ${textColor}`}>{spaceName || "Your Space"}</h2>
      
      {logoUrl && (
        <div className="flex justify-center mb-6">
          <img 
            src={logoUrl} 
            alt="Logo" 
            className={`w-24 h-24 object-cover border-4 border-white shadow-lg ${logoShape ? 'rounded-lg' : 'rounded-full'}`} 
          />
        </div>
      )}

      <h3 className={`text-2xl font-semibold text-center mb-4 ${theme === Theme.DARK ? 'text-purple-400' : 'text-purple-700'} break-words`}>
        {headerTitle || "Header goes here..."}
      </h3>

      <p className={`${textColor} text-lg text-center mb-4 break-words`}>
        {customMessage || "Please give your testimonial here..."}
      </p>

      {/* Questions section */}
      <div>
        <h4 className={`${textColor} text-xl font-bold mb-2 text-center`}>QUESTIONS</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6">
            {questions.map((question) => (
            <li key={question.id} className={`${questionTextColor} text-md break-words`}>
              {question.content}
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons section */}
      <div className={`flex ${previewData.collectionType === CollectionType.TEXT_ONLY || previewData.collectionType === CollectionType.VIDEO_ONLY ? 'justify-center' : 'flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'}`}>
        {previewData.collectionType !== CollectionType.TEXT_ONLY && (
          <Button className={`w-full ${previewData.collectionType === CollectionType.VIDEO_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}>
            Record a Video
          </Button>
        )}
        {previewData.collectionType !== CollectionType.VIDEO_ONLY && (
          <Button className={`w-full ${previewData.collectionType === CollectionType.TEXT_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full bg-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}>
            Send in Text
          </Button>
        )}
      </div>
    </div>
  );
}



// import React from 'react';
// import { CreateSpaceInput } from '@/types/space';
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface LivePreviewProps {
//   previewData: CreateSpaceInput;
// }

// export default function LivePreview({ previewData }: LivePreviewProps) {
//   const { headerTitle, customMessage, questions, logo, theme, customButtonColor, spaceName } = previewData;

//   const bgColor = theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-purple-100 to-indigo-100';
//   const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
//   const defaultButtonColor = theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500';

//   return (
//     <div className={`${bgColor} shadow-2xl rounded-lg p-8 max-w-2xl mx-auto animate-fadeIn transition duration-300 ease-in-out`}>
//       <ScrollArea className="h-[450px] w-full rounded-md border border-gray-300 p-4">
//         <h2 className="text-2xl font-bold mb-6 text-center">Live preview - Testimonial page</h2>
//         <h2 className="text-3xl font-bold text-center mb-4">{spaceName || "Your Space"}</h2>
//         {logo && (
//           <div className="flex justify-center mb-6">
//             <img src={logo} alt="Logo" className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg" />
//           </div>
//         )}
//         <h3 className="text-2xl font-semibold text-center text-purple-700 mb-4">{headerTitle || "Header goes here..."}</h3>
//         <p className={`${textColor} text-lg text-center mb-4 break-words`}>{customMessage || "Please give your testimonial here..."}</p>
//         <ul className="list-disc pl-6 space-y-2 mb-6">
//           {questions.map((question, index) => (
//             <li key={index} className="text-gray-700 text-md break-words">{question}</li>
//           ))}
//         </ul>
//         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//           <button
//             style={{ backgroundColor: customButtonColor || defaultButtonColor }}
//             className="w-full sm:w-1/2 py-3 px-6 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
//           >
//             Record a Video
//           </button>
//           <button className="w-full sm:w-1/2 py-3 px-6 rounded-full bg-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
//             Send in Text
//           </button>
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }

// import React from 'react';
// import { CreateSpaceInput, Theme, CollectionType } from '@/types/space';
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface LivePreviewProps {
//   previewData: CreateSpaceInput;
// }

// export default function LivePreview({ previewData }: LivePreviewProps) {
//   const { headerTitle, customMessage, questions, logo, theme, customButtonColor, spaceName, logoShape } = previewData;

//   const bgColor = theme === Theme.DARK ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-purple-100 to-indigo-100';
//   const textColor = theme === Theme.DARK ? 'text-white' : 'text-gray-900';
//   const defaultButtonColor = theme === Theme.DARK ? 'bg-blue-600' : 'bg-blue-500';

//   const logoUrl = typeof logo === 'string' ? logo : (logo instanceof File ? URL.createObjectURL(logo) : null);

//   return (
//     <div className={`${bgColor} shadow-2xl rounded-lg p-8 max-w-2xl mx-auto animate-fadeIn transition duration-300 ease-in-out`}>
//       <ScrollArea className="h-[600px] w-full rounded-md border border-gray-300 p-4">
//         <h2 className="text-2xl font-bold mb-6 text-center">Live preview - Testimonial page</h2>
//         <h2 className="text-3xl font-bold text-center mb-4">{spaceName || "Your Space"}</h2>
//         {logoUrl && (
//           <div className="flex justify-center mb-6">
//             <img 
//               src={logoUrl} 
//               alt="Logo" 
//               className={`w-24 h-24 object-cover border-4 border-white shadow-lg ${logoShape ? 'rounded-lg' : 'rounded-full'}`} 
//             />
//           </div>
//         )}
//         <h3 className="text-2xl font-semibold text-center text-purple-700 mb-4">{headerTitle || "Header goes here..."}</h3>
//         <p className={`${textColor} text-lg text-center mb-4 break-words`}>{customMessage || "Please give your testimonial here..."}</p>
//         <ul className="list-disc pl-6 space-y-2 mb-6">
//           {questions.map((question) => (
//             <li key={question.id} className="text-gray-700 text-md break-words">{question.content}</li>
//           ))}
//         </ul>
//         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//           {previewData.collectionType !== CollectionType.TEXT_ONLY && (
//             <button
//               style={{ backgroundColor: customButtonColor || defaultButtonColor }}
//               className="w-full sm:w-1/2 py-3 px-6 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
//             >
//               Record a Video
//             </button>
//           )}
//           {previewData.collectionType !== CollectionType.VIDEO_ONLY && (
//             <button className="w-full sm:w-1/2 py-3 px-6 rounded-full bg-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
//               Send in Text
//             </button>
//           )}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }