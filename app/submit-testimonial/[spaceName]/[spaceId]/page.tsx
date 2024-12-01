// //app/submit-testimonial/[spaceName]/[spaceId]/page.tsx -- Language update
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Space, CollectionType, Theme } from "@/types/space";
// import { getSpace } from "@/lib/api";
// import TextTestimonialForm from "@/components/TextTestimonialForm";
// import VideoUploader from "@/components/VideoUploader";
// import Modal from "@/components/Modal";
// import Image from "next/image";
// import ThankYouPopup from "@/components/ThankYouPopup";
// import { useTranslation } from "react-i18next";
// import i18n from "@/lib/i18n";
// import { Video, PenSquare } from "lucide-react";

// export default function SubmitTestimonial() {
//   const params = useParams();
//   const router = useRouter();
//   const spaceId = params?.spaceId as string;
//   const [spaceData, setSpaceData] = useState<Space | null>(null);
//   const [showTextForm, setShowTextForm] = useState(false);
//   const [showVideoUploader, setShowVideoUploader] = useState(false);
//   const [showThankYouPopup, setShowThankYouPopup] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { t } = useTranslation("common");

//   const fetchSpaceData = useCallback(async () => {
//     if (!spaceId) {
//       setError("Missing space ID");
//       setIsLoading(false);
//       return;
//     }
//     try {
//       const data = await getSpace(spaceId);
//       setSpaceData(data);
//       if (data.language) {
//           i18n.changeLanguage(data.language);
//       }
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

//   const closeTextForm = useCallback(() => setShowTextForm(false), []);
//   const closeVideoUploader = useCallback(() => setShowVideoUploader(false), []);
//   //const closeThankYouPopup = useCallback(() => setShowThankYouPopup(false), []);
//   const closeThankYouPopup = useCallback(() => {
//     setShowThankYouPopup(false);
//     if (spaceData?.redirectUrl) {
//       router.push(spaceData.redirectUrl);
//     }
//   }, [spaceData, router]);
//   const handleTestimonialSuccess = useCallback(() => {
//     closeTextForm();
//     closeVideoUploader();
//     setShowThankYouPopup(true);
//   }, [closeTextForm, closeVideoUploader]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!spaceData || !spaceData.questions) return <div>No space data available or questions are missing.</div>;

//   const bgColor = spaceData.theme === Theme.DARK ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-purple-100 to-indigo-100";
//   const textColor = spaceData.theme === Theme.DARK ? "text-gray-200" : "text-gray-900";
//   const questionTextColor = spaceData.theme === Theme.DARK ? "text-gray-400" : "text-gray-600";

//   return (
//     <div className={`min-h-screen flex flex-col ${bgColor}`}>
//       <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
//         <div className="w-full max-w-3xl mx-auto">
//           <div className="text-center">
//             {spaceData.logo && (
//               <div className="mb-10">
//                 <Image
//                   src={spaceData.logo}
//                   alt="Logo"
//                   width={100}
//                   height={100}
//                   priority
//                   className={`mx-auto ${spaceData.logoShape ? "rounded-lg" : "rounded-full"}`}
//                   style={{ height: "auto", width: "auto" }} // Maintain aspect ratio
//                 />
//               </div>
//             )}
//             <h1 className={`text-4xl font-bold ${textColor} mb-4`}>{spaceData.headerTitle}</h1>
//             <p className={`${questionTextColor} text-lg mb-8`}>{spaceData.customMessage}</p>

//             <div className="w-full max-w-2xl mx-auto mb-14 pl-20">
//               <h3 className={`text-lg font-semibold ${textColor} uppercase mb-2 text-left`}>{spaceData.questionLabel}</h3>
//               <div className="w-10 h-1 bg-blue-600 mb-4"></div>
//               <ul className={`text-left list-disc pl-5 ${questionTextColor} space-y-2`}>
//                 {spaceData.questions.map((question) => (
//                   <li key={question.id}>{question.content}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="max-w-sm mx-auto sm:flex sm:justify-center gap-4">
//               {spaceData.collectionType !== CollectionType.TEXT_ONLY && (
//                 <Button
//                   onClick={() => setShowVideoUploader(true)}
//                   style={{ backgroundColor: spaceData.customButtonColorRV }}
//                   className="text-white w-full md:w-auto  h-12 px-6 flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-opacity-200 hover:shadow-lg"
//                 >
//                   <Video className="w-5 h-5 mr-2" />
//                   {spaceData.videoButtonText || "Record video"}
//                 </Button>
//               )}
//               {spaceData.collectionType !== CollectionType.VIDEO_ONLY && (
//                 <Button
//                   onClick={() => setShowTextForm(true)}
//                   style={{ backgroundColor: spaceData.customButtonColorST }}
//                   className="text-white w-full md:w-auto h-12 px-6 flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-opacity-200 hover:shadow-lg"
//                 >
//                   <PenSquare className="w-5 h-5 mr-2" />
//                   {spaceData.textButtonText || "Send text"}
//                 </Button>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       <Modal isOpen={showTextForm} onClose={closeTextForm}>
//         <TextTestimonialForm
//           spaceId={spaceId}
//           language={spaceData.language}
//           logo={spaceData.logo}
//           headerTitle={spaceData.headerTitle}
//           questionLabel={spaceData.questionLabel}
//           questions={spaceData.questions}
//           extraInformationFields={spaceData.extraInformationFields}
//           collectStarRatings={spaceData.collectStarRatings}
//           logoShape={spaceData.logoShape}
//           maxTextCharacters={spaceData.maxTextCharacters || 0}
//           consentDisplay={spaceData.consentDisplay}
//           consentStatement={spaceData.consentStatement}
//           textSubmissionTitle={spaceData.textSubmissionTitle}
//           onSuccess={handleTestimonialSuccess}
//           onCancel={closeTextForm}
//         />
//       </Modal>

//       <Modal isOpen={showVideoUploader} onClose={closeVideoUploader}>
//         <VideoUploader
//           spaceId={spaceId}
//           language={spaceData.language}
//           logo={spaceData.logo}
//           headerTitle={spaceData.headerTitle}
//           questions={spaceData.questions}
//           extraInformationFields={spaceData.extraInformationFields}
//           collectStarRatings={spaceData.collectStarRatings}
//           logoShape={spaceData.logoShape}
//           maxVideoDuration={spaceData.maxVideoDuration}
//           consentDisplay={spaceData.consentDisplay}
//           consentStatement={spaceData.consentStatement}
//           videoSubmissionTitle={spaceData.videoSubmissionTitle}
//           onSuccess={handleTestimonialSuccess}
//         />
//       </Modal>

//       <ThankYouPopup
//         isOpen={showThankYouPopup}
//         onClose={closeThankYouPopup}
//         thankYouImage={spaceData.thankYouImage}
//         thankYouTitle={spaceData.thankYouTitle}
//         thankYouMessage={spaceData.thankYouMessage}
//         allowSocialShare={spaceData.allowSocialShare}
//         redirectUrl={spaceData.redirectUrl}
//       />
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Space, CollectionType, Theme } from "@/types/space";
import { getSpace } from "@/lib/api";
import TextTestimonialForm from "@/components/TextTestimonialForm";
import VideoUploader from "@/components/VideoUploader";
import Modal from "@/components/Modal";
import Image from "next/image";
import ThankYouPopup from "@/components/ThankYouPopup";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { Video, PenSquare } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export default function SubmitTestimonial() {
  const params = useParams();
  const router = useRouter();
  const spaceId = params?.spaceId as string;
  const [spaceData, setSpaceData] = useState<Space | null>(null);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation("common");

  const fetchSpaceData = useCallback(async () => {
    if (!spaceId) {
      setError("Missing space ID");
      setIsLoading(false);
      return;
    }
    try {
      const data = await getSpace(spaceId);
      setSpaceData(data);
      if (data.language) {
          i18n.changeLanguage(data.language);
      }
    } catch (err) {
      console.error("Error fetching space data:", err);
      setError("Failed to load space data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [spaceId]);

  useEffect(() => {
    fetchSpaceData();
  }, [fetchSpaceData]);

  const closeTextForm = useCallback(() => setShowTextForm(false), []);
  const closeVideoUploader = useCallback(() => setShowVideoUploader(false), []);
  const closeThankYouPopup = useCallback(() => {
    setShowThankYouPopup(false);
    if (spaceData?.redirectUrl) {
      router.push(spaceData.redirectUrl);
    }
  }, [spaceData, router]);
  const handleTestimonialSuccess = useCallback(() => {
    closeTextForm();
    closeVideoUploader();
    setShowThankYouPopup(true);
  }, [closeTextForm, closeVideoUploader]);

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">Error: {error}</div>;

  const bgColor = spaceData?.theme === Theme.DARK ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-purple-100 to-indigo-100";
  const textColor = spaceData?.theme === Theme.DARK ? "text-gray-200" : "text-gray-900";
  const questionTextColor = spaceData?.theme === Theme.DARK ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`min-h-screen flex flex-col ${bgColor}`}>
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center">
            {isLoading ? (
              <SkeletonLoading />
            ) : spaceData ? (
              <>
                {spaceData?.logo && (
                  <div className="mb-10">
                    <Image
                      src={spaceData.logo}
                      alt="Logo"
                      width={100}
                      height={100}
                      priority
                      className={`mx-auto ${spaceData.logoShape ? "rounded-lg" : "rounded-full"}`}
                      style={{ height: "auto", width: "auto" }}
                    />
                  </div>
                )}
                <h1 className={`text-4xl font-bold ${textColor} mb-4`}>{spaceData?.headerTitle}</h1>
                <p className={`${questionTextColor} text-lg mb-8`}>{spaceData?.customMessage}</p>

                <div className="w-full max-w-2xl mx-auto mb-14 pl-20">
                  <h3 className={`text-lg font-semibold ${textColor} uppercase mb-2 text-left`}>{spaceData?.questionLabel}</h3>
                  <div className="w-10 h-1 bg-blue-600 mb-4"></div>
                  <ul className={`text-left list-disc pl-5 ${questionTextColor} space-y-2`}>
                    {spaceData?.questions.map((question) => (
                      <li key={question.id}>{question.content}</li>
                    ))}
                  </ul>
                </div>

                <div className="max-w-sm mx-auto sm:flex sm:justify-center gap-4">
                  {spaceData?.collectionType !== CollectionType.TEXT_ONLY && (
                    <Button
                      onClick={() => setShowVideoUploader(true)}
                      style={{ backgroundColor: spaceData.customButtonColorRV }}
                      className="text-white w-full md:w-auto h-12 px-6 flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-opacity-200 hover:shadow-lg"
                    >
                      <Video className="w-5 h-5 mr-2" />
                      {spaceData.videoButtonText || "Record video"}
                    </Button>
                  )}
                  {spaceData?.collectionType !== CollectionType.VIDEO_ONLY && (
                    <Button
                      onClick={() => setShowTextForm(true)}
                      style={{ backgroundColor: spaceData.customButtonColorST }}
                      className="text-white w-full md:w-auto h-12 px-6 flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-opacity-200 hover:shadow-lg"
                    >
                      <PenSquare className="w-5 h-5 mr-2" />
                      {spaceData.textButtonText || "Send text"}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div>No space data available or questions are missing.</div>
            )}
          </div>
        </div>
      </div>

      {spaceData && (
        <>
          <Modal isOpen={showTextForm} onClose={closeTextForm}>
            <TextTestimonialForm
              spaceId={spaceId}
              language={spaceData.language}
              logo={spaceData.logo}
              headerTitle={spaceData.headerTitle}
              questionLabel={spaceData.questionLabel}
              questions={spaceData.questions}
              extraInformationFields={spaceData.extraInformationFields}
              collectStarRatings={spaceData.collectStarRatings}
              logoShape={spaceData.logoShape}
              maxTextCharacters={spaceData.maxTextCharacters || 0}
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
              language={spaceData.language}
              logo={spaceData.logo}
              headerTitle={spaceData.headerTitle}
              questions={spaceData.questions}
              extraInformationFields={spaceData.extraInformationFields}
              collectStarRatings={spaceData.collectStarRatings}
              logoShape={spaceData.logoShape}
              maxVideoDuration={spaceData.maxVideoDuration}
              consentDisplay={spaceData.consentDisplay}
              consentStatement={spaceData.consentStatement}
              videoSubmissionTitle={spaceData.videoSubmissionTitle}
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
            redirectUrl={spaceData.redirectUrl}
          />
        </>
      )}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <>
      <Skeleton className="w-24 h-24 rounded-full mx-auto mb-10" />
      <Skeleton className="w-3/4 h-10 mx-auto mb-4" />
      <Skeleton className="w-2/3 h-6 mx-auto mb-8" />
      <div className="w-full max-w-2xl mx-auto mb-14 pl-20">
        <Skeleton className="w-1/3 h-6 mb-2" />
        <Skeleton className="w-10 h-1 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-5/6 h-4" />
          ))}
        </div>
      </div>
      <div className="max-w-sm mx-auto sm:flex sm:justify-center gap-4">
        <Skeleton className="w-full sm:w-40 h-12" />
        <Skeleton className="w-full sm:w-40 h-12" />
      </div>
    </>
  );
}

