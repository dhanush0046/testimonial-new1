// //components/ExtraSettingsForm.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { X } from 'lucide-react';
// import { ExtraSettings } from '@/types/space';

// interface ExtraSettingsFormProps {
//   extraSettings: ExtraSettings;
//   onExtraSettingsChange: (newSettings: Partial<ExtraSettings>) => void;
// }

// export default function ExtraSettingsForm({ extraSettings, onExtraSettingsChange }: ExtraSettingsFormProps) {

//   const [showMetaTags, setShowMetaTags] = useState(false);
//   const defaultAvatarImg= "/testiy.png";
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(defaultAvatarImg);
//   const [openGraphImagePreview, setOpenGraphImagePreview] = useState<string | null>(null);
//   const consentStatementRef = useRef<HTMLDivElement>(null);

//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//   //   const { name, value } = e.target;
//   //   onExtraSettingsChange({ [name]: value });
//   // };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     if (name === 'maxTextCharacters') {
//       onExtraSettingsChange({ [name]: parseInt(value, 10) || 0 });
//     } else {
//       onExtraSettingsChange({ [name]: value });
//     }
//   };

//   const handleSwitchChange = (name: string) => (checked: boolean) => {
//     onExtraSettingsChange({ [name]: checked });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (fieldName === 'defaultAvatar') {
//           setAvatarPreview(reader.result as string);
//         } else if (fieldName === 'openGraphImage') {
//           setOpenGraphImagePreview(reader.result as string);
//         }
//         onExtraSettingsChange({ [fieldName]: file });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUndoImage = (fieldName: string) => {
//     if (fieldName === 'defaultAvatar') {
//       setAvatarPreview(defaultAvatarImg);
//       onExtraSettingsChange({ defaultAvatar: defaultAvatarImg });
//     } else if (fieldName === 'openGraphImage') {
//       setOpenGraphImagePreview(null);
//       onExtraSettingsChange({ openGraphImage: null });
//     }
//   };

//   const handleConsentStatementChange = () => {
//     if (consentStatementRef.current) {
//       onExtraSettingsChange({ consentStatement: consentStatementRef.current.textContent || '' });
//     }
//   };

//   useEffect(() => {
//     if (consentStatementRef.current) {
//       consentStatementRef.current.textContent = extraSettings.consentStatement || '';
//     }
//   }, [extraSettings.consentStatement]);

//   return (
//     <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
//       <div className="space-y-6">
//         <h3 className="text-2xl font-bold text-center">Some extra settings</h3>

//         <div className="w-full">
//           <Label htmlFor="maxVideoDuration" className="block text-gray-700 text-sm font-medium mb-1">
//             Max video duration
//           </Label>
//           <div className="grid grid-cols-6 gap-4">
//             <div className="col-span-6 sm:col-span-2">
//               <Select
//                 name="maxVideoDuration"
//                 value={extraSettings.maxVideoDuration ? extraSettings.maxVideoDuration.toString() : "2"}
//                 onValueChange={(value) => onExtraSettingsChange({ maxVideoDuration: parseFloat(value) })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select duration" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0.5">30 seconds</SelectItem>
//                   <SelectItem value="1">60 seconds</SelectItem>
//                   <SelectItem value="1.5">90 seconds</SelectItem>
//                   <SelectItem value="2">120 seconds</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>


//         <div>
//           <Label htmlFor="maxTextCharacters">Max characters for the text testimonial</Label>
//           <Input
//             type="number"
//             id="maxTextCharacters"
//             name="maxTextCharacters"
//             value={extraSettings.maxTextCharacters}
//             onChange={handleChange}
//             placeholder="0 for no limit"
//           />
//           <p className="text-sm text-gray-500">Setting it to 0 will remove the max char limit</p>
//         </div>

//         <div>
//           <Label htmlFor="videoButtonText">Video button text</Label>
//           <Input
//             type="text"
//             id="videoButtonText"
//             name="videoButtonText"
//             placeholder='Record a video'
//             value={extraSettings.videoButtonText}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="textButtonText">Text button text</Label>
//           <Input
//             type="text"
//             id="textButtonText"
//             name="textButtonText"
//             placeholder='Send in text'
//             value={extraSettings.textButtonText}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="w-full">
//           <Label htmlFor="consentDisplay" className="block text-gray-700 text-sm font-medium mb-1">
//             Consent display
//           </Label>
//           <div className="grid grid-cols-6 gap-4">
//             <div className="col-span-6 sm:col-span-2">
//               <Select
//                 name="consentDisplay"
//                 value={extraSettings.consentDisplay || 'required'}
//                 onValueChange={(value) => onExtraSettingsChange({ consentDisplay: value as 'required' | 'optional' | 'hidden' })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select display option" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="required">Required</SelectItem>
//                   <SelectItem value="optional">Optional</SelectItem>
//                   <SelectItem value="hidden">Hidden</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         {extraSettings.consentDisplay !== 'hidden' && (
//           <div>
//             <Label htmlFor="consentStatement">Consent statement</Label>
//             <div
//               ref={consentStatementRef}
//               id="consentStatement"
//               className="form-input react-editor-parent react-editor-no-min-height w-full bg-white text-gray-800 border border-gray-200 rounded-md p-2 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
//               contentEditable="true"
//               spellCheck="true"
//               role="textbox"
//               aria-multiline="true"
//               data-placeholder="I give permission to use this testimonial."
//               onInput={handleConsentStatementChange}
//               onBlur={handleConsentStatementChange}
//             />
//           </div>
//         )}

//         <div>
//           <Label htmlFor="textSubmissionTitle">Text submission title</Label>
//           <Input
//             type="text"
//             id="textSubmissionTitle"
//             name="textSubmissionTitle"
//             placeholder='Title'
//             value={extraSettings.textSubmissionTitle}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="questionLabel">Question label</Label>
//           <Input
//             type="text"
//             id="questionLabel"
//             name="questionLabel"
//             placeholder='Questions'
//             value={extraSettings.questionLabel}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="defaultAvatar">Default text testimonial avatar</Label>
//           <div className="mt-2 flex items-center">
//             <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
//               {avatarPreview && (
//                 <img
//                   src={avatarPreview}
//                   alt="Avatar preview"
//                   className="h-full w-full object-cover"
//                 />
//               )}
//             </span>
//             <span className="ml-5 rounded-md shadow-sm">
//               <Input
//                 id="defaultAvatar"
//                 name="defaultAvatar"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileChange(e, 'defaultAvatar')}
//                 className="hidden"
//               />
//               <Label
//                 htmlFor="defaultAvatar"
//                 className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//               >
//                 Change
//               </Label>
//             </span>
//             {avatarPreview && avatarPreview !== defaultAvatarImg && (            <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="ml-2"
//                       onClick={() => handleUndoImage('defaultAvatar')}
//                     >
//                       <X className="h-5 w-5 text-gray-600 hover:text-gray-700" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>Undo the change</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//             <div>
//               <Label htmlFor="customButtonColorRV">Custom button color for "Record a Video"</Label>
//               <Input
//                 type="color"
//                 id="customButtonColorRV"
//                 name="customButtonColorRV"
//                 value={extraSettings.customButtonColorRV}
//                 className="w-24 h-10 rounded-md"
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label htmlFor="customButtonColorST">Custom button color for "Send in Text"</Label>
//               <Input
//                 type="color"
//                 id="customButtonColorST"
//                 name="customButtonColorST"
//                 value={extraSettings.customButtonColorST}
//                 className="w-24 h-10 rounded-md"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>      

//         <div>
//           <Label htmlFor="affiliateLink">Add your affiliate link</Label>
//           <Input
//             type="url"
//             id="affiliateLink"
//             name="affiliateLink"
//             value={extraSettings.affiliateLink}
//             onChange={handleChange}
//             placeholder="https://testimonial.to/?via=xyz"
//           />
//         </div>

//         <div className="w-full px-3">
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="thirdPartyName">
//             Add a 3rd-party review link
//           </Label>
//           <div className="grid grid-cols-6 gap-4">
//             <div className="col-span-6 sm:col-span-2">
//               <Select
//                 name="thirdPartyReviewPlatform"
//                 value={extraSettings.thirdPartyReviewPlatform}
//                 onValueChange={(value) => onExtraSettingsChange({ thirdPartyReviewPlatform: value })}
//               >
//                 <SelectTrigger id="thirdPartyName">
//                   <SelectValue placeholder="Select platform" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Google">Google</SelectItem>
//                   <SelectItem value="Facebook">Facebook</SelectItem>
//                   <SelectItem value="Trustpilot">Trustpilot</SelectItem>
//                   <SelectItem value="Capterra">Capterra</SelectItem>
//                   <SelectItem value="G2">G2</SelectItem>
//                   <SelectItem value="Yelp">Yelp</SelectItem>
//                   <SelectItem value="Twitter">Twitter</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="mt-1 flex rounded-md shadow-sm col-span-6 sm:col-span-4">
//               <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                 http://
//               </span>
//               <Input
//                 type="text"
//                 name="thirdPartyReviewLink"
//                 id="thirdPartyLink"
//                 value={extraSettings.thirdPartyReviewLink}
//                 onChange={handleChange}
//                 className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
//                 placeholder="Enter review link"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Switch
//             id="autoPopulateWallOfLove"
//             checked={extraSettings.autoPopulateWallOfLove}
//             onCheckedChange={handleSwitchChange('autoPopulateWallOfLove')}
//           />
//           <Label htmlFor="autoPopulateWallOfLove">Auto populate testimonials to the Wall of Love</Label>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Switch
//             id="disableVideoForIphone"
//             checked={extraSettings.disableVideoForIphone}
//             onCheckedChange={handleSwitchChange('disableVideoForIphone')}
//           />
//           <Label htmlFor="disableVideoForIphone">Disable video recording for iPhone users</Label>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Switch
//             id="allowSearchEngineIndexing"
//             checked={extraSettings.allowSearchEngineIndexing}
//             onCheckedChange={handleSwitchChange('allowSearchEngineIndexing')}
//           />
//           <Label htmlFor="allowSearchEngineIndexing">Allow search engines to index your page</Label>
//         </div>

//         <div className="space-y-2">
//           <div
//             className="flex justify-between cursor-pointer"
//             onClick={() => setShowMetaTags(!showMetaTags)}
//           >
//             <span className="text-gray-700 text-sm">Custom Open Graph Meta Tags</span>
//             <span className="text-gray-600">{showMetaTags ? '▲' : '▼'}</span>
//           </div>

//           {showMetaTags && (
//             <div className="bg-gray-50 p-4 rounded-md space-y-4 duration-300 ease-linear">
//               <p className="text-sm text-gray-700">
//                 Change how your Testimonial page looks on social media.
//               </p>
//               <div>
//                 <Label htmlFor="openGraphTitle">Title</Label>
//                 <Input
//                   id="openGraphTitle"
//                   name="openGraphTitle"
//                   value={extraSettings.openGraphTitle}
//                   onChange={handleChange}
//                   placeholder="Title"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="openGraphDescription">Description</Label>
//                 <Input
//                   id="openGraphDescription"
//                   name="openGraphDescription"
//                   value={extraSettings.openGraphDescription}
//                   onChange={handleChange}
//                   placeholder="Description"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="openGraphImage">Image</Label>
//                 <div className="mt-2 flex items-center">
//                   <span className="h-12 w-24 rounded-md overflow-hidden bg-gray-100">
//                     {openGraphImagePreview && (
//                       <img
//                         src={openGraphImagePreview}
//                         alt="Open Graph preview"
//                         className="h-full w-full object-cover"
//                       />
//                     )}
//                   </span>
//                   <span className="ml-5 rounded-md shadow-sm">
//                     <Input
//                       id="openGraphImage"
//                       name="openGraphImage"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e, 'openGraphImage')}
//                       className="hidden"
//                     />
//                     <Label
//                       htmlFor="openGraphImage"
//                       className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//                     >
//                       Change
//                     </Label>
//                   </span>
//                   {openGraphImagePreview && (
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="ml-2"
//                             onClick={() => handleUndoImage('openGraphImage')}
//                           >
//                             <X className="h-5 w-5 text-gray-600 hover:text-gray-700" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>Undo the change</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


//components/ExtraSettingsForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { X } from 'lucide-react';
import { ExtraSettings } from '@/types/space';

interface ExtraSettingsFormProps {
  extraSettings: ExtraSettings;
  onExtraSettingsChange: (newSettings: Partial<ExtraSettings>) => void;
}

export default function ExtraSettingsForm({ extraSettings, onExtraSettingsChange }: ExtraSettingsFormProps) {

  const [showMetaTags, setShowMetaTags] = useState(false);
  const [openGraphImagePreview, setOpenGraphImagePreview] = useState<string | null>(null);
  const consentStatementRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'maxTextCharacters') {
      onExtraSettingsChange({ [name]: parseInt(value, 10) || 0 });
    } else {
      onExtraSettingsChange({ [name]: value });
    }
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    onExtraSettingsChange({ [name]: checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (fieldName === 'openGraphImage') {
          setOpenGraphImagePreview(reader.result as string);
        }
        onExtraSettingsChange({ [fieldName]: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUndoImage = (fieldName: string) => {
   if (fieldName === 'openGraphImage') {
      setOpenGraphImagePreview(null);
      onExtraSettingsChange({ openGraphImage: null });
    }
  };
  const handleConsentStatementChange = () => {
    if (consentStatementRef.current) {
      onExtraSettingsChange({ consentStatement: consentStatementRef.current.textContent || '' });
    }
  };

  useEffect(() => {
    if (consentStatementRef.current) {
      consentStatementRef.current.textContent = extraSettings.consentStatement || '';
    }
  }, [extraSettings.consentStatement]);

  return (
    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Some extra settings</h3>

        <div className="w-full">
          <Label htmlFor="maxVideoDuration" className="block text-gray-700 text-sm font-medium mb-1">
            Max video duration
          </Label>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 sm:col-span-2">
              <Select
                name="maxVideoDuration"
                value={extraSettings.maxVideoDuration ? extraSettings.maxVideoDuration.toString() : "2"}
                onValueChange={(value) => onExtraSettingsChange({ maxVideoDuration: parseFloat(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                  <SelectItem value="90">90 seconds</SelectItem>
                  <SelectItem value="120">120 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="maxTextCharacters">Max characters for the text testimonial</Label>
          <Input
            type="number"
            id="maxTextCharacters"
            name="maxTextCharacters"
            value={extraSettings.maxTextCharacters}
            onChange={handleChange}
            placeholder="0 for no limit"
          />
          <p className="text-sm text-gray-500">Setting it to 0 will remove the max char limit</p>
        </div>

        <div>
          <Label htmlFor="videoButtonText">Video button text</Label>
          <Input
            type="text"
            id="videoButtonText"
            name="videoButtonText"
            placeholder='Record a video'
            value={extraSettings.videoButtonText}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="textButtonText">Text button text</Label>
          <Input
            type="text"
            id="textButtonText"
            name="textButtonText"
            placeholder='Send in text'
            value={extraSettings.textButtonText}
            onChange={handleChange}
          />
        </div>

        <div className="w-full">
          <Label htmlFor="consentDisplay" className="block text-gray-700 text-sm font-medium mb-1">
            Consent display
          </Label>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 sm:col-span-2">
              <Select
                name="consentDisplay"
                value={extraSettings.consentDisplay || 'required'}
                onValueChange={(value) => onExtraSettingsChange({ consentDisplay: value as 'required' | 'optional' | 'hidden' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select display option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="required">Required</SelectItem>
                  <SelectItem value="optional">Optional</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {extraSettings.consentDisplay !== 'hidden' && (
          <div>
            <Label htmlFor="consentStatement">Consent statement</Label>
            <div
              ref={consentStatementRef}
              id="consentStatement"
              className="form-input react-editor-parent react-editor-no-min-height w-full bg-white text-gray-800 border border-gray-200 rounded-md p-2 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
              contentEditable="true"
              spellCheck="true"
              role="textbox"
              aria-multiline="true"
              data-placeholder="I give permission to use this testimonial."
              onInput={handleConsentStatementChange}
              onBlur={handleConsentStatementChange}
            />
          </div>
        )}

        <div>
          <Label htmlFor="textSubmissionTitle">Text submission title</Label>
          <Input
            type="text"
            id="textSubmissionTitle"
            name="textSubmissionTitle"
            placeholder='Title'
            value={extraSettings.textSubmissionTitle}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="questionLabel">Question label</Label>
          <Input
            type="text"
            id="questionLabel"
            name="questionLabel"
            placeholder='Questions'
            value={extraSettings.questionLabel}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
            <div>
              <Label htmlFor="customButtonColorRV">Custom button color for "Record a Video"</Label>
              <Input
                type="color"
                id="customButtonColorRV"
                name="customButtonColorRV"
                value={extraSettings.customButtonColorRV}
                className="w-24 h-10 rounded-md"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="customButtonColorST">Custom button color for "Send in Text"</Label>
              <Input
                type="color"
                id="customButtonColorST"
                name="customButtonColorST"
                value={extraSettings.customButtonColorST}
                className="w-24 h-10 rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>      

        <div>
          <Label htmlFor="affiliateLink">Add your affiliate link</Label>
          <Input
            type="url"
            id="affiliateLink"
            name="affiliateLink"
            value={extraSettings.affiliateLink || ''}
            onChange={handleChange}
            placeholder="https://testimonial.to/?via=xyz"
          />
        </div>

        <div className="w-full px-3">
          <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="thirdPartyName">
            Add a 3rd-party review link
          </Label>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 sm:col-span-2">
              <Select
                name="thirdPartyReviewPlatform"
                value={extraSettings.thirdPartyReviewPlatform || ''}
                onValueChange={(value) => onExtraSettingsChange({ thirdPartyReviewPlatform: value })}
              >
                <SelectTrigger id="thirdPartyName">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Trustpilot">Trustpilot</SelectItem>
                  <SelectItem value="Capterra">Capterra</SelectItem>
                  <SelectItem value="G2">G2</SelectItem>
                  <SelectItem value="Yelp">Yelp</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-1 flex rounded-md shadow-sm col-span-6 sm:col-span-4">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                http://
              </span>
              <Input
                type="text"
                name="thirdPartyReviewLink"
                id="thirdPartyLink"
                value={extraSettings.thirdPartyReviewLink || ''}
                onChange={handleChange}
                className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="Enter review link"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="autoPopulateWallOfLove"
            checked={extraSettings.autoPopulateWallOfLove}
            onCheckedChange={handleSwitchChange('autoPopulateWallOfLove')}
          />
          <Label htmlFor="autoPopulateWallOfLove">Auto populate testimonials to the Wall of Love</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="disableVideoForIphone"
            checked={extraSettings.disableVideoForIphone}
            onCheckedChange={handleSwitchChange('disableVideoForIphone')}
          />
          <Label htmlFor="disableVideoForIphone">Disable video recording for iPhone users</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="allowSearchEngineIndexing"
            checked={extraSettings.allowSearchEngineIndexing}
            onCheckedChange={handleSwitchChange('allowSearchEngineIndexing')}
          />
          <Label htmlFor="allowSearchEngineIndexing">Allow search engines to index your page</Label>
        </div>

        <div className="space-y-2">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowMetaTags(!showMetaTags)}
          >
            <span className="text-gray-700 text-sm">Custom Open Graph Meta Tags</span>
            <span className="text-gray-600">{showMetaTags ? '▲' : '▼'}</span>
          </div>

          {showMetaTags && (
            <div className="bg-gray-50 p-4 rounded-md space-y-4 duration-300 ease-linear">
              <p className="text-sm text-gray-700">
                Change how your Testimonial page looks on social media.
              </p>
              <div>
                <Label htmlFor="openGraphTitle">Title</Label>
                <Input
                  id="openGraphTitle"
                  name="openGraphTitle"
                  value={extraSettings.openGraphTitle || ''}
                  onChange={handleChange}
                  placeholder="Title"
                />
              </div>
              <div>
                <Label htmlFor="openGraphDescription">Description</Label>
                <Input
                  id="openGraphDescription"
                  name="openGraphDescription"
                  value={extraSettings.openGraphDescription || ''}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>
              <div>
                <Label htmlFor="openGraphImage">Image</Label>
                <div className="mt-2 flex items-center">
                  <span className="h-12 w-24 rounded-md overflow-hidden bg-gray-100">
                    {openGraphImagePreview && (
                      <img
                        src={openGraphImagePreview}
                        alt="Open Graph preview"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </span>
                  <span className="ml-5 rounded-md shadow-sm">
                    <Input
                      id="openGraphImage"
                      name="openGraphImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'openGraphImage')}
                      className="hidden"
                    />
                    <Label
                      htmlFor="openGraphImage"
                      className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
                    >
                      Change
                    </Label>
                  </span>
                  {openGraphImagePreview && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => handleUndoImage('openGraphImage')}
                          >
                            <X className="h-5 w-5 text-gray-600 hover:text-gray-700" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Undo the change</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}