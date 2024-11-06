// down thank you page update
//app/submit-testimonial/[spaceName]/[spaceId]/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Space, CollectionType, Theme } from "@/types/space";
import { getSpace } from "@/lib/api";
import TextTestimonialForm from "@/components/TextTestimonialForm";
import VideoUploader from "@/components/VideoUploader";
import Modal from "@/components/Modal";
import Image from "next/image";
import ThankYouPopup from "@/components/ThankYouPopup";

export default function SubmitTestimonial() {
  const params = useParams();
  const spaceName = params?.spaceName as string;
  const spaceId = params?.spaceId as string;
  const [spaceData, setSpaceData] = useState<Space | null>(null);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpaceData() {
      if (!spaceId) {
        setError("Missing space ID");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getSpace(spaceId);
        setSpaceData(data);
      } catch (err) {
        console.error("Error fetching space data:", err);
        setError("Failed to load space data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSpaceData();
  }, [spaceId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!spaceData || !spaceData.questions) {
    return <div>No space data available or questions are missing.</div>;
  }

  const closeTextForm = () => setShowTextForm(false);
  const closeVideoUploader = () => setShowVideoUploader(false);
  const closeThankYouPopup = () => setShowThankYouPopup(false);

  const handleTestimonialSuccess = () => {
    closeTextForm();
    closeVideoUploader();
    setShowThankYouPopup(true);
  };

  const customButtonColorRV = spaceData.customButtonColorRV;
  const customButtonColorST = spaceData.customButtonColorST;

  return (
    <div className={`min-h-screen flex items-center justify-center pt-20 pb-12 md:pt-24 md:pb-20`}>
      <Card className="w-full space-y-5 max-w-3xl mx-auto text-center">
        <CardHeader>
          {spaceData.logo && (
            <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-md">
              <Image
                src={spaceData.logo}
                alt="Logo"
                width={96}
                height={96}
                className={`object-cover ${spaceData.logoShape ? "rounded-lg" : "rounded-full"}`}
              />
            </div>
          )}
          <CardTitle className="text-2xl sm:text-4xl md:text-4xl font-extrabold mb-4 text-gray-700">
            {spaceData.headerTitle}
          </CardTitle>
          <CardDescription className="text-base md:text-xl text-gray-500">
            {spaceData.customMessage}
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full md:w-3/4 px-4 py-4 text-left mx-auto">
          <h3 className="text-lg font-semibold uppercase mb-2 text-gray-700">{spaceData.questionLabel}</h3>
          <div className="w-10 mb-2 border-b-4" style={{ borderColor: "#5d5dff" }}></div>
          <ul className="mt-2 max-w-xl text-base list-disc pl-4 text-gray-500">
            {spaceData.questions.map((question) => (
              <li key={question.id}>{question.content}</li>
            ))}
          </ul>
        </CardContent>

        <div className="mt-6 flex justify-center space-x-4">
          {spaceData.collectionType === CollectionType.TEXT_AND_VIDEO && (
            <>
              <Button className="text-white" style={{ backgroundColor: customButtonColorRV }} onClick={() => setShowVideoUploader(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                {spaceData.videoButtonText}
              </Button>
              <Button className=" text-white" style={{ backgroundColor: customButtonColorST }} onClick={() => setShowTextForm(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                {spaceData.textButtonText}
              </Button>
            </>
          )}
          {spaceData.collectionType === CollectionType.TEXT_ONLY && (
            <Button className=" text-white" style={{ backgroundColor: customButtonColorST }} onClick={() => setShowTextForm(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              {spaceData.textButtonText}
            </Button>
          )}
          {spaceData.collectionType === CollectionType.VIDEO_ONLY && (
            <Button className="text-white" style={{ backgroundColor: customButtonColorRV }} onClick={() => setShowVideoUploader(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              {spaceData.videoButtonText}
            </Button>
          )}
        </div>

        <Modal isOpen={showTextForm} onClose={closeTextForm}>
          <TextTestimonialForm
            spaceId={spaceId}
            logo={spaceData.logo}
            headerTitle={spaceData.headerTitle}
            questions={spaceData.questions}
            extraInformationFields={spaceData.extraInformationFields}
            collectStarRatings={spaceData.collectStarRatings}
            logoShape={spaceData.logoShape}
            maxTextCharacters={spaceData.maxTextCharacters}
            consentDisplay={spaceData.consentDisplay}
            consentStatement={spaceData.consentStatement}
            textSubmissionTitle={spaceData.textSubmissionTitle}
            onSuccess={handleTestimonialSuccess}
            onCancel={closeTextForm}
          />
        </Modal>

        <Modal isOpen={showVideoUploader} onClose={closeVideoUploader}>
          <VideoUploader
            spaceId={spaceId}
            logo={spaceData.logo}
            headerTitle={spaceData.headerTitle}
            questions={spaceData.questions}
            extraInformationFields={spaceData.extraInformationFields}
            collectStarRatings={spaceData.collectStarRatings}
            logoShape={spaceData.logoShape}
            maxVideoDuration={spaceData.maxVideoDuration}
            consentDisplay={spaceData.consentDisplay}
            consentStatement={spaceData.consentStatement}
            onSuccess={handleTestimonialSuccess}
          />
        </Modal>

        <ThankYouPopup
          isOpen={showThankYouPopup}
          onClose={closeThankYouPopup}
          thankYouImage={spaceData.thankYouImage}
          thankYouTitle={spaceData.thankYouTitle}
          thankYouMessage={spaceData.thankYouMessage}
          allowSocialShare={spaceData.allowSocialShare}
        />
      </Card>
    </div>
  );
}

// // app/submit-testimonial/[spaceName]/[spaceId]/page.tsx -- Language update
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Space, CollectionType, Language } from "@/types/space";
// import { getSpace } from "@/lib/api";
// import TextTestimonialForm from "@/components/TextTestimonialForm";
// import VideoUploader from "@/components/VideoUploader";
// import Modal from "@/components/Modal";
// import Image from "next/image";
// import ThankYouPopup from "@/components/ThankYouPopup";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useTranslation } from "@/hooks/useTranslation";

// export default function SubmitTestimonial() {
//   const params = useParams();
//   const spaceName = params?.spaceName as string;
//   const spaceId = params?.spaceId as string;
//   const [spaceData, setSpaceData] = useState<Space | null>(null);
//   const [showTextForm, setShowTextForm] = useState(false);
//   const [showVideoUploader, setShowVideoUploader] = useState(false);
//   const [showThankYouPopup, setShowThankYouPopup] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.ENGLISH);

//   const fetchSpaceData = useCallback(async () => {
//     if (!spaceId) {
//       setError("Missing space ID");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const data = await getSpace(spaceId);
//       setSpaceData(data);
//       setSelectedLanguage(data.language);
//     } catch (err) {
//       console.error("Error fetching space data:", err);
//       setError("Failed to load space data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [spaceId]);

//   useEffect(() => {
//     fetchSpaceData();
//   }, [fetchSpaceData]);

//   const translatedHeaderTitle = useTranslation(spaceData?.headerTitle || "", selectedLanguage);
//   const translatedCustomMessage = useTranslation(spaceData?.customMessage || "", selectedLanguage);

//   const translatedQuestions = useMemo(() => {
//     if (!spaceData?.questions) return [];
//     return spaceData.questions.map(question => ({
//       ...question,
//       translatedContent: useTranslation(question.content, selectedLanguage),
//     }));
//   }, [spaceData?.questions, selectedLanguage]);

//   const closeTextForm = useCallback(() => setShowTextForm(false), []);
//   const closeVideoUploader = useCallback(() => setShowVideoUploader(false), []);
//   const closeThankYouPopup = useCallback(() => setShowThankYouPopup(false), []);

//   const handleTestimonialSuccess = useCallback(() => {
//     closeTextForm();
//     closeVideoUploader();
//     setShowThankYouPopup(true);
//   }, [closeTextForm, closeVideoUploader]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!spaceData || !spaceData.questions) {
//     return <div>No space data available or questions are missing.</div>;
//   }

//   const customButtonColorRV = spaceData.customButtonColorRV;
//   const customButtonColorST = spaceData.customButtonColorST;

//   return (
//     <div className={`min-h-screen flex items-center justify-center pt-20 pb-12 md:pt-24 md:pb-20`}>
//       <Card className="w-full space-y-5 max-w-3xl mx-auto text-center">
//         <CardHeader>
//           {spaceData.logo && (
//             <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-md">
//               <Image
//                 src={spaceData.logo}
//                 alt="Logo"
//                 width={96}
//                 height={96}
//                 className={`object-cover ${spaceData.logoShape ? "rounded-lg" : "rounded-full"}`}
//               />
//             </div>
//           )}
//           <CardTitle className="text- 2xl sm:text-4xl md:text-4xl font-extrabold mb-4 text-gray-700">
//             {translatedHeaderTitle}
//           </CardTitle>
//           <CardDescription className="text-base md:text-xl text-gray-500">
//             {translatedCustomMessage}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="w-full md:w-3/4 px-4 py-4 text-left mx-auto">
//           <h3 className="text-lg font-semibold uppercase mb-2 text-gray-700">{spaceData.questionLabel}</h3>
//           <div className="w-10 mb-2 border-b-4" style={{ borderColor: "#5d5dff" }}></div>
//           <ul className="mt-2 max-w-xl text-base list-disc pl-4 text-gray-500">
//             {translatedQuestions.map((question) => (
//               <li key={question.id}>{question.translatedContent}</li>
//             ))}
//           </ul>
//         </CardContent>

//         <div className="mt-6 flex justify-center space-x-4">
//           <Select
//             value={selectedLanguage}
//             onValueChange={(value) => setSelectedLanguage(value as Language)}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select language" />
//             </SelectTrigger>
//             <SelectContent>
//               {Object.values(Language).map((lang) => (
//                 <SelectItem key={lang} value={lang}>
//                   {lang}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="mt-6 flex justify-center space-x-4">
//           {spaceData.collectionType === CollectionType.TEXT_AND_VIDEO && (
//             <>
//               <Button className="text-white" style={{ backgroundColor: customButtonColorRV }} onClick={() => setShowVideoUploader(true)}>
//                 {spaceData.videoButtonText}
//               </Button>
//               <Button className="text-white" style={{ backgroundColor: customButtonColorST }} onClick={() => setShowTextForm(true)}>
//                 {spaceData.textButtonText}
//               </Button>
//             </>
//           )}
//           {spaceData.collectionType === CollectionType.TEXT_ONLY && (
//             <Button className="text-white" style={{ backgroundColor: customButtonColorST }} onClick={() => setShowTextForm(true)}>
//               {spaceData.textButtonText}
//             </Button>
//           )}
//           {spaceData.collectionType === CollectionType.VIDEO_ONLY && (
//             <Button className="text-white" style={{ backgroundColor: customButtonColorRV }} onClick={() => setShowVideoUploader(true)}>
//               {spaceData.videoButtonText}
//             </Button>
//           )}
//         </div>

//         <Modal isOpen={showTextForm} onClose={closeTextForm}>
//           <TextTestimonialForm
//             spaceId={spaceId}
//             logo={spaceData.logo}
//             headerTitle={spaceData.headerTitle}
//             questions={spaceData.questions}
//             extraInformationFields={spaceData.extraInformationFields}
//             collectStarRatings={spaceData.collectStarRatings}
//             logoShape={spaceData.logoShape}
//             maxTextCharacters={spaceData.maxTextCharacters}
//             consentDisplay={spaceData.consentDisplay}
//             consentStatement={spaceData.consentStatement}
//             textSubmissionTitle={spaceData.textSubmissionTitle}
//             onSuccess={handleTestimonialSuccess}
//             onCancel={closeTextForm}
//             selectedLanguage={selectedLanguage}
//           />
//         </Modal>

//         <Modal isOpen={showVideoUploader} onClose={closeVideoUploader}>
//           <VideoUploader
//             spaceId={spaceId}
//             logo={spaceData.logo}
//             headerTitle={spaceData.headerTitle}
//             questions={spaceData.questions}
//             extraInformationFields={spaceData.extraInformationFields}
//             collectStarRatings={spaceData.collectStarRatings}
//             logoShape={spaceData.logoShape}
//             maxVideoDuration={spaceData.maxVideoDuration}
//             consentDisplay={spaceData.consentDisplay}
//             consentStatement={spaceData.consentStatement}
//             onSuccess={handleTestimonialSuccess}
//             selectedLanguage={selectedLanguage}
//           />
//         </Modal>

//         <ThankYouPopup
//           isOpen={showThankYouPopup}
//           onClose={closeThankYouPopup}
//           thankYouImage={spaceData.thankYouImage}
//           thankYouTitle={spaceData.thankYouTitle}
//           thankYouMessage={spaceData.thankYouMessage}
//           allowSocialShare={spaceData.allowSocialShare}
//           selectedLanguage={selectedLanguage}
//         />
//       </Card>
//     </div>
//   );
// }