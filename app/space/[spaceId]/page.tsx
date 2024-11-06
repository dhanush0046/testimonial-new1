// //app/space/[spaceId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import SpaceForm from "@/components/SpaceForm";
import LivePreview from "@/components/LivePreview";
import ExtraSettingsForm from "@/components/ExtraSettingsForm";
import LivePreviewThankYou from "@/components/LivePreviewThankYou";
import LivePreviewExtraSettings from "@/components/LivePreExtraSetting";
import ThankYouForm from "@/components/ThankYouForm";
import { Button } from "@/components/ui/button";
import { CreateSpaceInput, Space, ExtraSettings } from '@/types/space';
import { updateSpace, getSpace } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Heart, Bell, ArrowLeft } from 'lucide-react';

export default function EditSpacePage({ params }: { params: { spaceId: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [spaceData, setSpaceData] = useState<CreateSpaceInput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const space = await getSpace(params.spaceId);
        setSpaceData(space as CreateSpaceInput & ExtraSettings);
      } catch (error) {
        console.error("Error fetching space data:", error);
        setError("Failed to load space data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaceData();
  }, [params.spaceId]);

  const handleSpaceDataChange = (newData: Partial<CreateSpaceInput & ExtraSettings>) => {
    setSpaceData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        ...newData,
        questions: newData.questions || prevData.questions,
        extraInformationFields: newData.extraInformationFields || prevData.extraInformationFields,
      };
    });
  };

  const handleThankYouDataChange = (newData: Partial<CreateSpaceInput>) => {
    setSpaceData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        ...newData,
        thankYouImage: newData.thankYouImage ?? prevData.thankYouImage,
        thankYouTitle: newData.thankYouTitle ?? prevData.thankYouTitle,
        thankYouMessage: newData.thankYouMessage ?? prevData.thankYouMessage,
        allowSocialShare: newData.allowSocialShare ?? prevData.allowSocialShare,
        redirectUrl: newData.redirectUrl ?? prevData.redirectUrl,
        autoReward: newData.autoReward ?? prevData.autoReward,
        hideImage: newData.hideImage ?? prevData.hideImage,
      };
    });
  };

  const handleExtraSettingsChange = (newData: Partial<ExtraSettings>) => {
    setSpaceData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        ...newData,
      };
    });
  };

  const handleSaveSpace = async () => {
    if (!spaceData) return;

    setIsSaving(true);
    try {
      const updatedSpace: Space = await updateSpace(params.spaceId, spaceData);
      router.push(`/dashboard?spaceId=${updatedSpace.id}`);
    } catch (error) {
      console.error("Error updating space:", error);
      setError("Failed to update space. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // const handleGoBack = () => {
  //   router.push(`/dashboard?spaceId=${params.spaceId}`);
  // };

  const handleGoBack = () => {
    setActiveTab("basic");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!spaceData) {
    return <div>No space data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center animate-fadeIn">
          Edit Testimonial Space
        </h2>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
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
                  isEditing={true}
                />
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
                  onThankYouDataChange={handleThankYouDataChange}
                />
              </TabsContent>
              <TabsContent value="extra">
                    <ExtraSettingsForm
                      extraSettings={spaceData}
                      onExtraSettingsChange={handleExtraSettingsChange}
                    />
                </TabsContent>
            </div>
          </div>
        </Tabs>
        <div className="mt-8 flex items-center justify-center">
          {/* <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
          </Button> */}
          <Button
            onClick={handleSaveSpace}
            disabled={isSaving}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// //app/space/[spaceId]/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Header from "@/components/Header";
// import SpaceForm from "@/components/SpaceForm";
// import LivePreview from "@/components/LivePreview";
// import LivePreviewThankYou from "@/components/LivePreviewThankYou";
// import ThankYouForm from "@/components/ThankYouForm";
// import { Button } from "@/components/ui/button";
// import { CreateSpaceInput, Space } from '@/types/space';
// import { updateSpace, getSpace } from "@/lib/api";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Settings, Heart, Bell, ArrowLeft } from 'lucide-react';

// export default function EditSpacePage({ params }: { params: { spaceId: string } }) {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("basic");
//   const [spaceData, setSpaceData] = useState<CreateSpaceInput | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSpaceData = async () => {
//       try {
//         const space = await getSpace(params.spaceId);
//         setSpaceData(space);
//       } catch (error) {
//         console.error("Error fetching space data:", error);
//         setError("Failed to load space data. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSpaceData();
//   }, [params.spaceId]);

//   const handleSpaceDataChange = (newData: Partial<CreateSpaceInput>) => {
//     setSpaceData((prevData) => ({ ...prevData, ...newData }));
//   };

//   const handleThankYouDataChange = (newData: Partial<CreateSpaceInput>) => {
//     setSpaceData((prevData) => ({
//       ...prevData,
//       ...newData,
//     }));
//   };

//   const handleSaveSpace = async () => {
//     if (!spaceData) return;

//     setIsSaving(true);
//     try {
//       const updatedSpace: Space = await updateSpace(params.spaceId, spaceData);
//       router.push(`/dashboard?spaceId=${updatedSpace.id}`);
//     } catch (error) {
//       console.error("Error updating space:", error);
//       setError("Failed to update space. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleGoBack = () => {
//     router.push(`/dashboard?spaceId=${params.spaceId}`);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!spaceData) {
//     return <div>No space data found.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
//       <Header />
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center animate-fadeIn">
//           Edit Testimonial Space
//         </h2>
//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList className="grid w-full grid-cols-4 mb-8">
//             <TabsTrigger value="basic">
//               <Settings className="mr-2 h-4 w-4" />
//               Basic
//             </TabsTrigger>
//             <TabsTrigger value="thankYou">
//               <Heart className="mr-2 h-4 w-4" />
//               Thank you page
//             </TabsTrigger>
//             <TabsTrigger value="extra">
//               <Settings className="mr-2 h-4 w-4" />
//               Extra settings
//             </TabsTrigger>
//             <TabsTrigger value="notifications" disabled>
//               <Bell className="mr-2 h-4 w-4" />
//               Notifications
//             </TabsTrigger>
//           </TabsList>

//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="w-full lg:w-1/2">
//               <TabsContent value="basic">
//                 <LivePreview previewData={spaceData} />
//               </TabsContent>
//               <TabsContent value="thankYou">
//                 <LivePreviewThankYou previewData={spaceData} />
//               </TabsContent>
//             </div>
//             <div className="w-full lg:w-1/2">
//               <TabsContent value="basic">
//                 <SpaceForm
//                   spaceData={spaceData}
//                   onSpaceDataChange={handleSpaceDataChange}
//                 />
//               </TabsContent>
//               <TabsContent value="thankYou">
//                 <ThankYouForm
//                   thankYouData={{
//                     image: spaceData.thankYouImage,
//                     title: spaceData.thankYouTitle,
//                     message: spaceData.thankYouMessage,
//                     allowSocialShare: spaceData.allowSocialShare,
//                     redirectUrl: spaceData.redirectUrl || "",
//                     autoReward: spaceData.autoReward,
//                     hideImage: spaceData.hideImage || false,
//                   }}
//                   onThankYouDataChange={handleThankYouDataChange}
//                 />
//               </TabsContent>
//               <TabsContent value="extra">
//                 <div className="bg-white p-6 rounded-lg shadow">
//                   <h3 className="text-xl font-semibold mb-4">Extra Settings</h3>
//                   <p>Extra settings content goes here.</p>
//                 </div>
//               </TabsContent>
//             </div>
//           </div>
//         </Tabs>
//         <div className="mt-8 flex justify-between">
//           <Button variant="outline" onClick={handleGoBack}>
//             <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
//           </Button>
//           <Button
//             onClick={handleSaveSpace}
//             disabled={isSaving}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
//           >
//             {isSaving ? "Saving..." : "Save Changes"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }