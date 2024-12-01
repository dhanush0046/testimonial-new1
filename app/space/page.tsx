// //app/space/page.tsx  -- test extra settings--
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Header from "@/components/Header";
// import SpaceForm from "@/components/SpaceForm";
// import LivePreview from "@/components/LivePreview";
// import LivePreviewThankYou from "@/components/LivePreviewThankYou";
// import ThankYouForm from "@/components/ThankYouForm";
// import ExtraSettingsForm from "@/components/ExtraSettingsForm";
// import LivePreviewExtraSettings from "@/components/LivePreExtraSetting";
// import { Button } from "@/components/ui/button";
// import CreateSpaceResult from "@/components/CreateSpaceResult";
// import { CreateSpaceInput, Space, CollectionType, Theme, Language, ExtraSettings } from '@/types/space';
// import { createSpace, uploadFile } from "@/lib/api";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Settings, Heart, Bell, ArrowLeft } from 'lucide-react';

// export default function CreateSpacePage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("basic");
//   const [spaceData, setSpaceData] = useState<CreateSpaceInput & ExtraSettings>({
//     spaceName: "",
//     headerTitle: "",
//     customMessage: "Please give your testimonial here...",
//     questions: [
//       { id: "q1", content: "What did you like the most about the product?" },
//       { id: "q2", content: "Would you recommend this to a friend?" },
//       { id: "q3", content: "How can we improve?" }
//     ],
//     logo: null,
//     logoShape: false,
//     collectionType: CollectionType.TEXT_AND_VIDEO,
//     collectStarRatings: true,
//     theme: Theme.LIGHT,
//     language: Language.ENGLISH,
//     autoTranslate: false,
//     extraInformationFields: [
//       {
//         id: "name",
//         label: "Name",
//         inputType: "text",
//         isRequired: true,
//         isEditable: false,
//         isEnabled: true,
//       },
//       {
//         id: "email",
//         label: "Email",
//         inputType: "email",
//         isRequired: false,
//         isEnabled: true,
//         isEditable: true,
//       },
//       {
//         id: "title,company",
//         label: "Title,Company",
//         inputType: "text",
//         isRequired: false,
//         isEditable: true,
//         isEnabled: true,
//       },
//       {
//         id: "social link",
//         label: "Social Link",
//         inputType: "link",
//         isRequired: false,
//         isEnabled: true,
//         isEditable: true,
//       },
//       {
//         id: "address",
//         label: "Address",
//         inputType: "text",
//         isRequired: false,
//         isEnabled: true,
//         isEditable: true,
//       },
//     ],
//     shareableLink: null,

//     thankYouImage: "/testiy.png",
//     thankYouTitle: "",
//     thankYouMessage: "",
//     allowSocialShare: false,
//     redirectUrl: "",
//     autoReward: false,
//     hideImage: false,
 
//     maxVideoDuration: 120,
//     maxTextCharacters: 0,
//     videoButtonText: "",
//     textButtonText: "",
//     consentDisplay: 'required',
//     consentStatement: "",
//     textSubmissionTitle: "",
//     questionLabel: "",
//     customButtonColorRV: "#4F46E5",
//     customButtonColorST: "#6B7280",
//     affiliateLink: "",
//     thirdPartyReviewPlatform: "Google",
//     thirdPartyReviewLink: "",
//     autoPopulateWallOfLove: false,
//     disableVideoForIphone: false,
//     allowSearchEngineIndexing: false,
//     openGraphTitle: "",
//     openGraphDescription: "",
//     openGraphImage: null,
//   });

//   const [createdSpace, setCreatedSpace] = useState<Space | null>(null);
//   const [isCreating, setIsCreating] = useState(false);

//   const handleSpaceDataChange = (newData: Partial<CreateSpaceInput & ExtraSettings>) => {
//     setSpaceData((prevData) => ({ ...prevData, ...newData }));
//   };

//   const handleCreateSpace = async () => {
//     setIsCreating(true);
//     try {
//       const logoUrl = await handleFileUpload(spaceData.logo, 'logo');
//       const thankYouImageUrl = await handleThankYouImageUpload(spaceData.thankYouImage, spaceData.hideImage);
//       const openGraphImageUrl = await handleFileUpload(spaceData.openGraphImage, 'openGraphImage');

//       const finalSpaceData = {
//         ...spaceData,
//         logo: logoUrl,
//         thankYouImage: thankYouImageUrl,
//         openGraphImage : openGraphImageUrl,
//       };
//       const newSpace: Space = await createSpace(finalSpaceData);
//       setCreatedSpace(newSpace);
//     } catch (error) {
//       console.error("Error creating space:", error);
//       alert("Failed to create space. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleFileUpload = async (file: File | string | null, type: 'logo' | 'thankYouImage' | 'openGraphImage') => {
//     if (file instanceof File) {
//       return await uploadFile(file, type);
//     }
//     return file;
//   };

//   const handleThankYouImageUpload = async (image: string | File | null, hideImage: boolean | null) => {
//     if (hideImage) {
//       return null;
//     }

//     if (image instanceof File) {
//       return await uploadFile(image, 'thankYouImage');
//     } else if (typeof image === 'string' && image !== "/testiy.png") {
//       const response = await fetch(image);
//       const blob = await response.blob();
//       const file = new File([blob], "thank-you-image.png", { type: blob.type });
//       return await uploadFile(file, 'thankYouImage');
//     } else if (image === "/testiy.png") {
//       const response = await fetch(image);
//       const blob = await response.blob();
//       const file = new File([blob], "default-thank-you-image.png", { type: blob.type });
//       return await uploadFile(file, 'thankYouImage');
//     }
//     return null;
//   };

//   const handleOpenLink = (link: string) => {
//     router.push(link);
//   };

//   const handleGoBack = () => {
//     setActiveTab("basic");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
//       <Header />
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center animate-fadeIn">
//           Create a Testimonial Space
//         </h2>
//         {createdSpace ? (
//           <CreateSpaceResult
//             spaceName={createdSpace.spaceName}
//             spaceId={createdSpace.id}
//             shareableLink={createdSpace.shareableLink}
//             onOpenLink={handleOpenLink}
//           />
//         ) : (
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-4 mb-8">
//               <TabsTrigger value="basic">
//                 <Settings className="mr-2 h-4 w-4" />
//                 Basic
//               </TabsTrigger>
//               <TabsTrigger value="thankYou">
//                 <Heart className="mr-2 h-4 w-4" />
//                 Thank you page
//               </TabsTrigger>
//               <TabsTrigger value="extra">
//                 <Settings className="mr-2 h-4 w-4" />
//                 Extra settings
//               </TabsTrigger>
//               <TabsTrigger value="notifications" disabled>
//                 <Bell className="mr-2 h-4 w-4" />
//                 Notifications
//               </TabsTrigger>
//             </TabsList>

//             <div className="flex flex-col lg:flex-row gap-8">
//               <div className="w-full lg:w-1/2">
//                 <TabsContent value="basic">
//                   <LivePreview previewData={spaceData} />
//                 </TabsContent>
//                 <TabsContent value="thankYou">
//                   <LivePreviewThankYou previewData={spaceData} />
//                   <div className="mt-4">
//                     <Button variant="outline" onClick={handleGoBack}>
//                       <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
//                     </Button>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="extra">
//                   <LivePreviewExtraSettings previewData={spaceData} />
//                   <div className="mt-4">
//                     <Button variant="outline" onClick={handleGoBack}>
//                       <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
//                     </Button>
//                   </div>
//                 </TabsContent>
//               </div>
//               <div className="w-full lg:w-1/2">
//                 <TabsContent value="basic">
//                   <SpaceForm
//                     spaceData={spaceData}
//                     onSpaceDataChange={handleSpaceDataChange}
//                     isEditing={false}
//                   />
//                   <div className="mt-8 text-center">
//                     <Button
//                       onClick={handleCreateSpace}
//                       disabled={isCreating}
//                       className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
//                     >
//                       {isCreating ? "Creating..." : "Create Space"}
//                     </Button>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="thankYou">
//                   <ThankYouForm
//                     thankYouData={{
//                       image: spaceData.thankYouImage,
//                       title: spaceData.thankYouTitle,
//                       message: spaceData.thankYouMessage,
//                       allowSocialShare: spaceData.allowSocialShare,
//                       redirectUrl: spaceData.redirectUrl || "",
//                       autoReward: spaceData.autoReward,
//                       hideImage: spaceData.hideImage || false,
//                     }}
//                     onThankYouDataChange={handleSpaceDataChange}
//                   />
//                 </TabsContent>
//                 <TabsContent value="extra">
//                     <ExtraSettingsForm
//                       extraSettings={spaceData}
//                       onExtraSettingsChange={handleSpaceDataChange}
//                     />
//                 </TabsContent>
//               </div>
//             </div>
//           </Tabs>
//         )}
//       </div>
//     </div>
//   );
// }

// //app/space/page.tsx  -- testing language translation
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Header from "@/components/Header";
// import SpaceForm from "@/components/SpaceForm";
// import LivePreview from "@/components/LivePreview";
// import LivePreviewThankYou from "@/components/LivePreviewThankYou";
// import ThankYouForm from "@/components/ThankYouForm";
// import ExtraSettingsForm from "@/components/ExtraSettingsForm";
// import LivePreviewExtraSettings from "@/components/LivePreExtraSetting";
// import { Button } from "@/components/ui/button";
// import CreateSpaceResult from "@/components/CreateSpaceResult";
// import { CreateSpaceInput, Space, CollectionType, Theme, Language, ExtraSettings } from '@/types/space';
// import { createSpace, uploadFile, translateText } from "@/lib/api";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Settings, Heart, Bell, ArrowLeft } from 'lucide-react';

// export default function CreateSpacePage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("basic");
//   const [spaceData, setSpaceData] = useState<CreateSpaceInput & ExtraSettings>({
//     spaceName: "",
//     headerTitle: "",
//     customMessage: "Please give your testimonial here...",
//     questions: [
//       { id: "q1", content: "What did you like the most about the product?" },
//       { id: "q2", content: "Would you recommend this to a friend?" },
//       { id: "q3", content: "How can we improve?" }
//     ],
//     logo: null,
//     logoShape: false,
//     collectionType: CollectionType.TEXT_AND_VIDEO,
//     collectStarRatings: true,
//     theme: Theme.LIGHT,
//     language: Language.ENGLISH,
//     autoTranslate: false,
//     extraInformationFields: [
//       {
//         id: "name",
//         label: "Name",
//         inputType: "text",
//         isRequired: true,
//         isEditable: false,
//         isEnabled: true,
//       },
//       {
//         id: "email",
//         label: "Email",
//         inputType: "email",
//         isRequired: false,
//         isEnabled: true,
//         isEditable: true,
//       },
//       {
//         id: "title,company",
//         label: "Title,Company",
//         inputType: "text",
//         isRequired: false,
//         isEditable: true,
//         isEnabled: true,
//       },
//       {
//         id: "social link",
//         label: "Social Link",
//         inputType: "link",
//         isRequired: false,
//         isEnabled: true,
//         isEditable: true,
//       },
//       {
//         id: "address",
//         label: "Address",
//         inputType: "text",
//         isRequired: false,
//         isEnabled: true,
//         isEditable: true,
//       },
//     ],
//     shareableLink: null,

//     thankYouImage: "/testiy.png",
//     thankYouTitle: "",
//     thankYouMessage: "",
//     allowSocialShare: false,
//     redirectUrl: "",
//     autoReward: false,
//     hideImage: false,
 
//     maxVideoDuration: 120,
//     maxTextCharacters: 0,
//     videoButtonText: "",
//     textButtonText: "",
//     consentDisplay: 'required',
//     consentStatement: "",
//     textSubmissionTitle: "",
//     questionLabel: "",
//     customButtonColorRV: "#4F46E5",
//     customButtonColorST: "#6B7280",
//     affiliateLink: "",
//     thirdPartyReviewPlatform: "Google",
//     thirdPartyReviewLink: "",
//     autoPopulateWallOfLove: false,
//     disableVideoForIphone: false,
//     allowSearchEngineIndexing: false,
//     openGraphTitle: "",
//     openGraphDescription: "",
//     openGraphImage: null,
//   });

//   const [createdSpace, setCreatedSpace] = useState<Space | null>(null);
//   const [isCreating, setIsCreating] = useState(false);
//   const [translations, setTranslations] = useState<Record<string, Record<Language, string>>>({});


//   const handleSpaceDataChange = useCallback(async (newData: Partial<CreateSpaceInput & ExtraSettings>) => {
//     setSpaceData((prevData) => ({ ...prevData, ...newData }));
//     // If language or autoTranslate changed, update translations
//     if ('language' in newData || 'autoTranslate' in newData) {
//       await updateTranslations({ ...spaceData, ...newData });
//     }
//   }, [spaceData]);

//   const updateTranslations = async (data: CreateSpaceInput & ExtraSettings) => {
//     if (data.autoTranslate) {
//       const fieldsToTranslate = ['headerTitle', 'customMessage', 'thankYouTitle', 'thankYouMessage'];
//       const newTranslations: Record<string, Record<Language, string>> = {};

//       for (const field of fieldsToTranslate) {
//         newTranslations[field] = {} as Record<Language, string>;
//         for (const lang of Object.values(Language)) {
//           if (lang !== data.language && data[field as keyof typeof data]) {
//             const translatedText = await translateText(data[field as keyof typeof data] as string, data.language, lang);
//             newTranslations[field][lang] = translatedText;
//           }
//         }
//       }

//       setTranslations(newTranslations);
//     } else {
//       setTranslations({});
//     }
//   };

//   const handleCreateSpace = async () => {
//     setIsCreating(true);
//     try {
//       const logoUrl = await handleFileUpload(spaceData.logo, 'logo');
//       const thankYouImageUrl = await handleThankYouImageUpload(spaceData.thankYouImage, spaceData.hideImage);
//       const openGraphImageUrl = await handleFileUpload(spaceData.openGraphImage, 'openGraphImage');

//       const finalSpaceData = {
//         ...spaceData,
//         logo: logoUrl,
//         thankYouImage: thankYouImageUrl,
//         openGraphImage : openGraphImageUrl,
//       };
//       const newSpace: Space = await createSpace(finalSpaceData);
//       setCreatedSpace(newSpace);
//     } catch (error) {
//       console.error("Error creating space:", error);
//       alert("Failed to create space. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleFileUpload = async (file: File | string | null, type: 'logo' | 'thankYouImage' | 'openGraphImage') => {
//     if (file instanceof File) {
//       return await uploadFile(file, type);
//     }
//     return file;
//   };

//   const handleThankYouImageUpload = async (image: string | File | null, hideImage: boolean | null) => {
//     if (hideImage) {
//       return null;
//     }

//     if (image instanceof File) {
//       return await uploadFile(image, 'thankYouImage');
//     } else if (typeof image === 'string' && image !== "/testiy.png") {
//       const response = await fetch(image);
//       const blob = await response.blob();
//       const file = new File([blob], "thank-you-image.png", { type: blob.type });
//       return await uploadFile(file, 'thankYouImage');
//     } else if (image === "/testiy.png") {
//       const response = await fetch(image);
//       const blob = await response.blob();
//       const file = new File([blob], "default-thank-you-image.png", { type: blob.type });
//       return await uploadFile(file, 'thankYouImage');
//     }
//     return null;
//   };

//   const handleOpenLink = (link: string) => {
//     router.push(link);
//   };

//   const handleGoBack = () => {
//     setActiveTab("basic");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
//       <Header />
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center animate-fadeIn">
//           Create a Testimonial Space
//         </h2>
//         {createdSpace ? (
//           <CreateSpaceResult
//             spaceName={createdSpace.spaceName}
//             spaceId={createdSpace.id}
//             shareableLink={createdSpace.shareableLink}
//             onOpenLink={handleOpenLink}
//           />
//         ) : (
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-4 mb-8">
//               <TabsTrigger value="basic">
//                 <Settings className="mr-2 h-4 w-4" />
//                 Basic
//               </TabsTrigger>
//               <TabsTrigger value="thankYou">
//                 <Heart className="mr-2 h-4 w-4" />
//                 Thank you page
//               </TabsTrigger>
//               <TabsTrigger value="extra">
//                 <Settings className="mr-2 h-4 w-4" />
//                 Extra settings
//               </TabsTrigger>
//               <TabsTrigger value="notifications" disabled>
//                 <Bell className="mr-2 h-4 w-4" />
//                 Notifications
//               </TabsTrigger>
//             </TabsList>

//             <div className="flex flex-col lg:flex-row gap-8">
//               <div className="w-full lg:w-1/2">
//                 <TabsContent value="basic">
//                   <LivePreview previewData={spaceData} translations={translations} />
//                 </TabsContent>
//                 <TabsContent value="thankYou">
//                   <LivePreviewThankYou previewData={spaceData} translations={translations} />
//                   <div className="mt-4">
//                     <Button variant="outline" onClick={handleGoBack}>
//                       <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
//                     </Button>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="extra">
//                   <LivePreviewExtraSettings previewData={spaceData} translations={translations} />
//                   <div className="mt-4">
//                     <Button variant="outline" onClick={handleGoBack}>
//                       <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
//                     </Button>
//                   </div>
//                 </TabsContent>
//               </div>
//               <div className="w-full lg:w-1/2">
//                 <TabsContent value="basic">
//                   <SpaceForm
//                     spaceData={spaceData}
//                     onSpaceDataChange={handleSpaceDataChange}
//                     isEditing={false}
//                   />
//                   <div className="mt-8 text-center">
//                     <Button
//                       onClick={handleCreateSpace}
//                       disabled={isCreating}
//                       className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
//                     >
//                       {isCreating ? "Creating..." : "Create Space"}
//                     </Button>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="thankYou">
//                   <ThankYouForm
//                     thankYouData={{
//                       image: spaceData.thankYouImage,
//                       title: spaceData.thankYouTitle,
//                       message: spaceData.thankYouMessage,
//                       allowSocialShare: spaceData.allowSocialShare,
//                       redirectUrl: spaceData.redirectUrl || "",
//                       autoReward: spaceData.autoReward,
//                       hideImage: spaceData.hideImage || false,
//                     }}
//                     onThankYouDataChange={handleSpaceDataChange}
//                     // language={spaceData.language}
//                     // translations={translations}
//                   />
//                 </TabsContent>
//                 <TabsContent value="extra">
//                   <ExtraSettingsForm
//                     extraSettings={spaceData}
//                     onExtraSettingsChange={handleSpaceDataChange}
//                     // language={spaceData.language}
//                     // translations={translations}
//                   />
//                 </TabsContent>
//               </div>
//             </div>
//           </Tabs>
//         )}
//       </div>
//     </div>
//   );
// }

//app/space/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import SpaceForm from "@/components/SpaceForm";
import LivePreview from "@/components/LivePreview";
import LivePreviewThankYou from "@/components/LivePreviewThankYou";
import ThankYouForm from "@/components/ThankYouForm";
import ExtraSettingsForm from "@/components/ExtraSettingsForm";
import LivePreviewExtraSettings from "@/components/LivePreExtraSetting";
import { Button } from "@/components/ui/button";
import CreateSpaceResult from "@/components/CreateSpaceResult";
import { CreateSpaceInput, Space, CollectionType, Theme, Language, ExtraSettings, mapLanguageCodeToEnum } from '@/types/space';
import { createSpace, uploadFile } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Heart, Bell, ArrowLeft } from 'lucide-react';
import i18n from '@/lib/i18n';

export default function CreateSpacePage() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState("basic");
  const [spaceData, setSpaceData] = useState<CreateSpaceInput & ExtraSettings>({
    spaceName: "",
    headerTitle: "",
    customMessage: "",
    questions: [
      { id: "q1", content: "What did you like the most about the product?" },
      { id: "q2", content: "Would you recommend this to a friend?" },
      { id: "q3", content: "How can we improve?" }
    ],
    logo: null,
    logoShape: false,
    collectionType: CollectionType.TEXT_AND_VIDEO,
    collectStarRatings: true,
    theme: Theme.LIGHT,
    language: Language.ENGLISH,
    autoTranslate: false,
    extraInformationFields: [
      {
        id: "name",
        label: "Name",
        inputType: "text",
        type:"defaultType",
        isRequired: true,
        isEditable: false,
        isEnabled: true,
      },
      {
        id: "email",
        label: "Email",
        inputType: "email",
        type:"defaultType",
        isRequired: false,
        isEnabled: true,
        isEditable: true,
      },
      {
        id: "title,company",
        label: "Title,Company",
        inputType: "text",
        type:"defaultType",
        isRequired: false,
        isEditable: true,
        isEnabled: true,
      },
      {
        id: "social link",
        label: "Social Link",
        inputType: "link",
        type:"defaultType",
        isRequired: false,
        isEnabled: true,
        isEditable: true,
      },
      {
        id: "address",
        label: "Address",
        inputType: "text",
        type:"defaultType",
        isRequired: false,
        isEnabled: true,
        isEditable: true,
      },
    ],
    shareableLink: null,
    thankYouImage: "/testiy.png",
    thankYouTitle: "",
    thankYouMessage: "",
    allowSocialShare: false,
    redirectUrl: "",
    autoReward: false,
    hideImage: false,
    maxVideoDuration: 120,
    maxTextCharacters: null,
    videoButtonText: "",
    textButtonText: "",
    consentDisplay: 'required',
    consentStatement: "",
    textSubmissionTitle: "",
    videoSubmissionTitle:"",
    questionLabel: "",
    customButtonColorRV: "#4F46E5",
    customButtonColorST: "#6B7280",
    affiliateLink: "",
    thirdPartyReviewPlatform: "Google",
    thirdPartyReviewLink: "",
    autoPopulateWallOfLove: false,
    disableVideoForIphone: false,
    allowSearchEngineIndexing: false,
    openGraphTitle: "",
    openGraphDescription: "",
    openGraphImage: null,
  });

  const [createdSpace, setCreatedSpace] = useState<Space | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (spaceData?.language) {
      i18n.changeLanguage(spaceData.language.toLowerCase());
    }
  }, [spaceData?.language, i18n]);

  const handleSpaceDataChange = (newData: Partial<CreateSpaceInput & ExtraSettings>) => {
    setSpaceData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      // if (newData.language) {
      //   i18n.changeLanguage(newData.language.toLowerCase());
      // }
      return updatedData;
    });
  };
  const handleCreateSpace = async () => {
    setIsCreating(true);
    try {
      const logoUrl = await handleFileUpload(spaceData.logo, 'logo');
      const thankYouImageUrl = await handleThankYouImageUpload(spaceData.thankYouImage, spaceData.hideImage);
      const openGraphImageUrl = await handleFileUpload(spaceData.openGraphImage, 'openGraphImage');

      const finalSpaceData = {
        ...spaceData,

        logo: logoUrl,
        thankYouImage: thankYouImageUrl,
        openGraphImage: openGraphImageUrl,
        thankYouTitle: spaceData.thankYouTitle || t('preview.thankYou', 'Thank you!'),
        thankYouMessage: spaceData.thankYouMessage || t('preview.thankYouMessage', 'Thank you so much for your message! It means a lot to us! 🙏'),
        videoButtonText: spaceData.videoButtonText || t('preview.videoButtonText', 'Record video'),
        textButtonText: spaceData.textButtonText || t('preview.textButtonText', 'Send text'),
        textSubmissionTitle: spaceData.textSubmissionTitle || t('preview.textSubmissionTitle', 'Write a text testimonial for'),
        videoSubmissionTitle: spaceData.videoSubmissionTitle || t('preview.videoSubmissionTitle', 'Record a video testimonial for'),
        consentStatement: spaceData.consentStatement || t('preview.consentStatement', 'I give permission to use this testimonial.'),
        consentDisplay: spaceData.consentDisplay || t('preview.consentDisplay', 'Required'),
        questionLabel: spaceData.questionLabel || t('preview.questionLabel', 'Question'),
        customButtonColorRV: spaceData.customButtonColorRV || "#4F46E5",
        customButtonColorST: spaceData.customButtonColorST || "#6B7280",
        thirdPartyReviewPlatform: spaceData.thirdPartyReviewPlatform || "Google",
      };      
      const newSpace: Space = await createSpace(finalSpaceData);
      setCreatedSpace(newSpace);
    } catch (error) {
      console.error("Error creating space:", error);
      alert("Failed to create space. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleFileUpload = async (file: File | string | null, type: 'logo' | 'thankYouImage' | 'openGraphImage') => {
    if (file instanceof File) {
      return await uploadFile(file, type);
    }
    return file;
  };

  const handleThankYouImageUpload = async (image: string | File | null, hideImage: boolean | null) => {
    if (hideImage) {
      return null;
    }

    if (image instanceof File) {
      return await uploadFile(image, 'thankYouImage');
    } else if (typeof image === 'string' && image !== "/testiy.png") {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "thank-you-image.png", { type: blob.type });
      return await uploadFile(file, 'thankYouImage');
    } else if (image === "/testiy.png") {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "default-thank-you-image.png", { type: blob.type });
      return await uploadFile(file, 'thankYouImage');
    }
    return null;
  };

  const handleOpenLink = (link: string) => {
    router.push(link);
  };

  const handleGoBack = () => {
    setActiveTab("basic");
  };

  if (!isClient) {
    return null; // or return a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center animate-fadeIn">
          Create a Testimonial Space
        </h2>
        {createdSpace ? (
          <CreateSpaceResult
            spaceName={createdSpace.spaceName}
            spaceId={createdSpace.id}
            shareableLink={createdSpace.shareableLink}
            onOpenLink={handleOpenLink}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-200">
              <TabsTrigger value="basic">
                <Settings className="mr-2 h-4 w-4" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="thankYou">
                <Heart className="mr-2 h-4 w-4" />
                Thank you page
              </TabsTrigger>
              <TabsTrigger value="extra">
                <Settings className="mr-2 h-4 w-4" />
                Extra settings
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <TabsContent value="basic">
                  <LivePreview previewData={spaceData} />
                </TabsContent>
                <TabsContent value="thankYou">
                  <LivePreviewThankYou previewData={spaceData} />
                  <div className="mt-4">
                    <Button variant="outline" onClick={handleGoBack}>
                      <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="extra">
                  <LivePreviewExtraSettings previewData={spaceData} />
                  <div className="mt-4">
                    <Button variant="outline" onClick={handleGoBack}>
                      <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
                    </Button>
                  </div>
                </TabsContent>
              </div>
              <div className="w-full lg:w-1/2">
                <TabsContent value="basic">
                  <SpaceForm
                    spaceData={spaceData}
                    onSpaceDataChange={handleSpaceDataChange}
                  />
                  <div className="mt-8 text-center">
                    <Button
                      onClick={handleCreateSpace}
                      disabled={isCreating}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                      {isCreating ? "Creating..." : "Create Space"}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="thankYou">
                  <ThankYouForm
                    thankYouData={{
                      image: spaceData.thankYouImage,
                      title: spaceData.thankYouTitle,
                      message: spaceData.thankYouMessage,
                      allowSocialShare: spaceData.allowSocialShare,
                      redirectUrl: spaceData.redirectUrl || "",
                      autoReward: spaceData.autoReward,
                      hideImage: spaceData.hideImage || false,
                    }}
                    onThankYouDataChange={handleSpaceDataChange}
                  />
                </TabsContent>
                <TabsContent value="extra">
                  <ExtraSettingsForm
                    extraSettings={spaceData}
                    onExtraSettingsChange={handleSpaceDataChange}
                  />
                </TabsContent>
              </div>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
}


