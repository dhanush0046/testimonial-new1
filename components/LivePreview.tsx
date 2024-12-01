// //components/LivePreview.tsx
// import React from 'react';
// import { CreateSpaceInput, Theme, CollectionType } from '@/types/space';
// import { Button } from "@/components/ui/button"

// interface LivePreviewProps {
//   previewData: CreateSpaceInput;
// }

// export default function LivePreview({ previewData }: LivePreviewProps) {
//   const { headerTitle, customMessage, questions, logo, theme, spaceName, logoShape } = previewData;

//   // Set background and text color based on the theme
//   const bgColor = theme === Theme.DARK ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-purple-100 to-indigo-100';
//   const textColor = theme === Theme.DARK ? 'text-white' : 'text-gray-900';
//   const questionTextColor = theme === Theme.DARK ? 'text-gray-300' : 'text-gray-700'; // Improved contrast for dark theme
//   const defaultButtonColor = theme === Theme.DARK ? 'bg-blue-600' : 'bg-blue-500';

//   // Handling logo URL for string or File types
//   const logoUrl = typeof logo === 'string' ? logo : (logo instanceof File ? URL.createObjectURL(logo) : null);

//   return (
//     <div className={`relative ${bgColor} shadow-2xl rounded-lg p-8 pt-14 max-w-2xl mx-auto animate-fadeIn transition duration-300 ease-in-out`}>
//       {/* Pill-shaped "Live Preview" heading (half-outside the container) */}
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//         <span className="bg-green-200 text-green-700 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
//           Live preview - Testimonial page
//         </span>
//       </div>

//       <h2 className={`text-3xl font-bold text-center mb-4 break-words ${textColor}`}>{spaceName || "Your Space"}</h2>
      
//       {logoUrl && (
//         <div className="flex justify-center mb-6">
//           <img 
//             src={logoUrl} 
//             alt="Logo" 
//             className={`w-24 h-24 object-cover border-4 border-white shadow-lg ${logoShape ? 'rounded-lg' : 'rounded-full'}`} 
//           />
//         </div>
//       )}

//       <h3 className={`text-2xl font-semibold text-center mb-4 ${theme === Theme.DARK ? 'text-purple-400' : 'text-purple-700'} break-words`}>
//         {headerTitle || "Header goes here..."}
//       </h3>

//       <p className={`${textColor} text-lg text-center mb-4 break-words`}>
//         {customMessage || "Please give your testimonial here..."}
//       </p>

//       {/* Questions section */}
//       <div>
//         <h4 className={`${textColor} text-xl font-bold mb-2 text-center`}>QUESTIONS</h4>
//         <ul className="list-disc pl-6 space-y-2 mb-6">
//             {questions.map((question) => (
//             <li key={question.id} className={`${questionTextColor} text-md break-words`}>
//               {question.content}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Buttons section */}
//       <div className={`flex ${previewData.collectionType === CollectionType.TEXT_ONLY || previewData.collectionType === CollectionType.VIDEO_ONLY ? 'justify-center' : 'flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'}`}>
//         {previewData.collectionType !== CollectionType.TEXT_ONLY && (
//           <Button className={`w-full ${previewData.collectionType === CollectionType.VIDEO_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}>
//             Record a Video
//           </Button>
//         )}
//         {previewData.collectionType !== CollectionType.VIDEO_ONLY && (
//           <Button className={`w-full ${previewData.collectionType === CollectionType.TEXT_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full bg-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}>
//             Send in Text
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }

// //components/LivePreview.tsx API lan
// import React from 'react';
// import { CreateSpaceInput, Theme, CollectionType, Language } from '@/types/space';
// import { Button } from "@/components/ui/button"
// import { useTranslation } from "@/hooks/useTranslation";

// interface LivePreviewProps {
//   previewData: CreateSpaceInput;
//   translations: Record<string, Record<Language, string>>;
// }

// export default function LivePreview({ previewData, translations }: LivePreviewProps) {
//   const { headerTitle, customMessage, questions, logo, theme, spaceName, logoShape, language, autoTranslate, collectionType, videoButtonText, textButtonText } = previewData;

//   const { translatedText: translatedHeaderTitle } = useTranslation(headerTitle || "Header goes here...", language);
//   const { translatedText: translatedCustomMessage } = useTranslation(customMessage || "Please give your testimonial here...", language);
//   const { translatedText: translatedQuestionsLabel } = useTranslation("QUESTIONS", language);
//   const { translatedText: translatedVideoButtonText } = useTranslation(videoButtonText || "Record a Video", language);
//   const { translatedText: translatedTextButtonText } = useTranslation(textButtonText || "Send in Text", language);

//   // Set background and text color based on the theme
//   const bgColor = theme === Theme.DARK ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-purple-100 to-indigo-100';
//   const textColor = theme === Theme.DARK ? 'text-white' : 'text-gray-900';
//   const questionTextColor = theme === Theme.DARK ? 'text-gray-300' : 'text-gray-700';

//   // Handling logo URL for string or File types
//   const logoUrl = typeof logo === 'string' ? logo : (logo instanceof File ? URL.createObjectURL(logo) : null);

//   return (
//     <div className={`relative ${bgColor} shadow-2xl rounded-lg p-8 pt-14 max-w-2xl mx-auto animate-fadeIn transition duration-300 ease-in-out`}>
//       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//         <span className="bg-green-200 text-green-700 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
//           Live preview - Testimonial page
//         </span>
//       </div>

//       <h2 className={`text-3xl font-bold text-center mb-4 break-words ${textColor}`}>{spaceName || "Your Space"}</h2>
      
//       {logoUrl && (
//         <div className="flex justify-center mb-6">
//           <img 
//             src={logoUrl} 
//             alt="Logo" 
//             className={`w-24 h-24 object-cover border-4 border-white shadow-lg ${logoShape ? 'rounded-lg' : 'rounded-full'}`} 
//           />
//         </div>
//       )}

//       <h3 className={`text-2xl font-semibold text-center mb-4 ${theme === Theme.DARK ? 'text-purple-400' : 'text-purple-700'} break-words`}>
//         {translatedHeaderTitle}
//       </h3>

//       <p className={`${textColor} text-lg text-center mb-4 break-words`}>
//         {translatedCustomMessage}
//       </p>

//       <div>
//         <h4 className={`${textColor} text-xl font-bold mb-2 text-center`}>
//           {translatedQuestionsLabel}
//         </h4>
//         <ul className="list-disc pl-6 space-y-2 mb-6">
//           {questions.map((question) => {
//             const { translatedText: translatedQuestion } = useTranslation(question.content, language);
//             return (
//               <li key={question.id} className={`${questionTextColor} text-md break-words`}>
//                 {translatedQuestion}
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <div className={`flex ${collectionType === CollectionType.TEXT_ONLY || collectionType === CollectionType.VIDEO_ONLY ? 'justify-center' : 'flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'}`}>
//         {collectionType !== CollectionType.TEXT_ONLY && (
//           <Button className={`w-full ${collectionType === CollectionType.VIDEO_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}>
//             {translatedVideoButtonText}
//           </Button>
//         )}
//         {collectionType !== CollectionType.VIDEO_ONLY && (
//           <Button className={`w-full ${collectionType === CollectionType.TEXT_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full bg-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}>
//             {translatedTextButtonText}
//           </Button>
//         )}
//       </div>

//       <div className="mt-4 text-center text-sm text-gray-500">
//         Language: {language}
//       </div>
//     </div>
//   );
// }


// components/LivePreview.tsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateSpaceInput, Theme, CollectionType, Language, ExtraSettings } from '@/types/space';
import { Button } from "@/components/ui/button";

interface LivePreviewProps {
  previewData: CreateSpaceInput & ExtraSettings;
}

export default function LivePreview({ previewData }: LivePreviewProps) {
  const { t, i18n } = useTranslation('common');
  const { headerTitle, customMessage, questions, logo, 
    theme, spaceName, logoShape, collectionType, 
    language , customButtonColorRV, customButtonColorST, 
    videoButtonText, textButtonText, questionLabel } = previewData;

  const bgColor = theme === Theme.DARK ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-purple-100 to-indigo-100';
  const textColor = theme === Theme.DARK ? 'text-white' : 'text-gray-900';
  const questionTextColor = theme === Theme.DARK ? 'text-gray-300' : 'text-gray-700';
  const defaultButtonColor = theme === Theme.DARK ? 'bg-blue-600' : 'bg-blue-500';

  const logoUrl = typeof logo === 'string' ? logo : (logo instanceof File ? URL.createObjectURL(logo) : null);

  console.log("Language Ed: ", language);

  React.useEffect(() => {
    i18n.changeLanguage(language.toLowerCase());
  }, [language, i18n]);

  return (
    <div className={`relative ${bgColor} shadow-2xl rounded-lg p-8 pt-14 max-w-2xl mx-auto animate-fadeIn transition duration-300 ease-in-out`}>
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-green-200 text-green-700 rounded-full px-4 py-1 text-sm font-semibold shadow-md">
          Live preview - Testimonial page
        </span>
      </div>

      {/* <h2 className={`text-3xl font-bold text-center mb-4 break-words ${textColor}`}>
        { spaceName || t('preview.yourSpace')}
      </h2> */}

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
        {headerTitle || t('preview.headerHere')}
      </h3>

      <p className={`${textColor} text-lg text-center mb-4 break-words`}>
        {customMessage || t('preview.giveTestimonial')}
      </p>

      <div>
        <h4 className={`${textColor} text-xl font-bold mb-2 text-center`}>{questionLabel || t('preview.questions')}</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          {questions.map((question) => (
            <li key={question.id} className={`${questionTextColor} text-md break-words`}>
              {question.content}
            </li>
          ))}
        </ul>
      </div>

      <div className={`flex ${collectionType === CollectionType.TEXT_ONLY || collectionType === CollectionType.VIDEO_ONLY ? 'justify-center' : 'flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'}`}>
        {collectionType !== CollectionType.TEXT_ONLY && (
          <Button
            style={{ backgroundColor: customButtonColorRV }}
            className={`w-full ${collectionType === CollectionType.VIDEO_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}
          >
            {videoButtonText || t('preview.recordVideo')}
          </Button>
        )}
        {collectionType !== CollectionType.VIDEO_ONLY && (
          <Button
            style={{ backgroundColor: customButtonColorST }}
            className={`w-full ${collectionType === CollectionType.TEXT_ONLY ? 'sm:w-full' : 'sm:w-1/2'} py-3 px-6 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out`}
          >
            {textButtonText || t('preview.sendText')}
          </Button>
        )}
      </div>
    </div>
  );
}