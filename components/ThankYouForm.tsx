// // components/ThankYouForm
// import React, { useState, useEffect } from 'react';
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import Image from 'next/image';
// import { CreateSpaceInput } from '@/types/space';

// interface ThankYouFormProps {
//   thankYouData: {
//     image: File | string | null;
//     title: string;
//     message: string;
//     allowSocialShare: boolean;
//     redirectUrl: string;
//     autoReward: boolean;
//   };
//   onThankYouDataChange: (newData: Partial<CreateSpaceInput>) => void;
// }

// export default function ThankYouForm({ thankYouData, onThankYouDataChange }: ThankYouFormProps) {
//   const defaultImageUrl = "/testiy.png";
//   const [imagePreview, setImagePreview] = useState<string>(defaultImageUrl);
//   const [hideImage, setHideImage] = useState(false);

//   useEffect(() => {
//     if (thankYouData.image instanceof File) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(thankYouData.image);
//     } else if (typeof thankYouData.image === 'string') {
//       setImagePreview(thankYouData.image);
//     } else {
//       setImagePreview(defaultImageUrl);
//     }
//     setHideImage(!thankYouData.image);
//   }, [thankYouData.image]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     onThankYouDataChange({ [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onThankYouDataChange({ thankYouImage: file });
//     }
//   };

//   const handleHideImageChange = (checked: boolean) => {
//     setHideImage(checked);
//     if (checked) {
//       onThankYouDataChange({ thankYouImage: null });
//     } else {
//       // When unchecking, if no custom image was uploaded, use the default image
//       onThankYouDataChange({ thankYouImage: imagePreview === defaultImageUrl ? defaultImageUrl : thankYouData.image });
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold mb-4">Customize thank you page</h2>
//         <p className="text-gray-600 mb-6">Add your personalized message to show your appreciation</p>

//         <div className="w-full px-3">
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="thankYouImage">
//             Image
//             <div className="relative flex rounded-md items-start my-auto ml-2">
//               <div className="ml-4 flex items-center">
//                 <Checkbox
//                   id="hideImage"
//                   checked={hideImage}
//                   onCheckedChange={handleHideImageChange}
//                 />
//                 <Label htmlFor="hideImage" className="ml-2">Hide the image?</Label>
//               </div>
//             </div>
//           </Label>

//           <div className="mt-2 flex items-center">
//             {!hideImage && (
//               <span className="h-14 w-26 rounded-md overflow-hidden bg-gray-100">
//                 <Image
//                   src={imagePreview}
//                   alt="Thank you image preview"
//                   width={100}
//                   height={100}
//                   className="h-full w-full object-cover"
//                 />
//               </span>
//             )}

//             <span className="ml-5 rounded-md shadow-sm">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 id="thankYouImage"
//                 onChange={handleImageChange}
//                 className="hidden"
//                 disabled={hideImage}
//               />
//               <Label
//                 htmlFor="thankYouImage"
//                 className={`py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium ${
//                   hideImage ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-50 text-gray-600 hover:text-gray-700 focus:outline-none cursor-pointer'
//                 }`}
//               >
//                 Change
//               </Label>
//             </span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="thankYouTitle">Thank you title</Label>
//           <Input
//             id="thankYouTitle"
//             name="thankYouTitle"
//             value={thankYouData.title}
//             onChange={handleInputChange}
//             placeholder="Thank you!"
//           />
//         </div>

//         <div>
//           <Label htmlFor="thankYouMessage">Thank you message</Label>
//           <Textarea
//             id="thankYouMessage"
//             name="thankYouMessage"
//             value={thankYouData.message}
//             onChange={handleInputChange}
//             placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏"
//             rows={4}
//           />
//           <span className="text-sm text-gray-500">Markdown supported</span>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Switch
//             id="allowSocialShare"
//             checked={thankYouData.allowSocialShare}
//             onCheckedChange={(checked) => onThankYouDataChange({ allowSocialShare: checked })}
//           />
//           <Label htmlFor="allowSocialShare">Allow to share on social media</Label>
//         </div>

//         <div>
//           <Label htmlFor="redirectUrl">Redirect to your own page</Label>
//           <Input
//             id="redirectUrl"
//             name="redirectUrl"
//             value={thankYouData.redirectUrl}
//             onChange={handleInputChange}
//             placeholder="https://your-website.com/thank-you"
//           />
//         </div>

//         <div className="flex items-center space-x-2">
//           <Switch
//             id="autoReward"
//             checked={thankYouData.autoReward}
//             onCheckedChange={(checked) => onThankYouDataChange({ autoReward: checked })}
//           />
//           <Label htmlFor="autoReward">Automatically reward your customer for a video testimonial?</Label>
//         </div>
//       </div>
//     </div>
//   );
// }

//components/ThankYouForm.tsx
// import React, { useState, useEffect } from 'react';
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from 'next/image';
// import { CreateSpaceInput } from '@/types/space';

// interface ThankYouFormProps {
//   thankYouData: {
//     image: File | string | null;
//     title: string;
//     message: string;
//     allowSocialShare: boolean;
//     redirectUrl: string;
//     autoReward: boolean;
//     hideImage: boolean;  // New property for preview
//   };
//   onThankYouDataChange: (newData: Partial<CreateSpaceInput>) => void;
// }

// export default function ThankYouForm({ thankYouData, onThankYouDataChange }: ThankYouFormProps) {
//   const defaultImageUrl = "/testiy.png";
//   const [imagePreview, setImagePreview] = useState<string>(defaultImageUrl);

//   useEffect(() => {
//     if (thankYouData.image instanceof File) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(thankYouData.image);
//     } else if (typeof thankYouData.image === 'string') {
//       setImagePreview(thankYouData.image);
//     } else {
//       setImagePreview(defaultImageUrl);
//     }
//   }, [thankYouData.image]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     onThankYouDataChange({ [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onThankYouDataChange({ thankYouImage: file });
//     }
//   };

//   const handleHideImageChange = (checked: boolean) => {
//     onThankYouDataChange({ hideImage: checked });  // Only updating preview
//   };

//   return (
//     <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold mb-4 text-center">Customize thank you page</h2>
//         <p className="text-gray-600 mb-6 text-center">Add your personalized message to show your appreciation</p>

//         <div className="w-full px-3">
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="thankYouImage">
//             Image
//             <div className="relative flex rounded-md items-start my-auto ml-2">
//               <div className="ml-4 flex items-center">
//                 <Checkbox
//                   id="hideImage"
//                   checked={thankYouData.hideImage}
//                   onCheckedChange={handleHideImageChange}
//                 />
//                 <Label htmlFor="hideImage" className="ml-2">Hide the image?</Label>
//               </div>
//             </div>
//           </Label>

//           <div className="mt-2 flex items-center">
//             <span className="h-14 w-26 rounded-md overflow-hidden bg-gray-100">
//               <Image
//                 src={imagePreview}
//                 alt="Thank you image preview"
//                 width={100}
//                 height={100}
//                 className="h-full w-full object-cover"
//               />
//             </span>

//             <span className="ml-5 rounded-md shadow-sm">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 id="thankYouImage"
//                 onChange={handleImageChange}
//                 className="hidden"
//                 disabled={thankYouData.hideImage}
//               />
//               <Label
//                 htmlFor="thankYouImage"
//                 className={`py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium ${
//                   thankYouData.hideImage ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-50 text-gray-600 hover:text-gray-700 focus:outline-none cursor-pointer'
//                 }`}
//               >
//                 Change
//               </Label>
//             </span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="thankYouTitle">Thank you title</Label>
//           <Input
//             id="thankYouTitle"
//             name="thankYouTitle"
//             value={thankYouData.title}
//             onChange={handleInputChange}
//             placeholder="Thank you!"
//           />
//         </div>

//         <div>
//           <Label htmlFor="thankYouMessage">Thank you message</Label>
//           <Textarea
//             id="thankYouMessage"
//             name="thankYouMessage"
//             value={thankYouData.message}
//             onChange={handleInputChange}
//             placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏"
//             rows={4}
//           />
//           <span className="text-sm text-gray-500">Markdown supported</span>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Switch
//             id="allowSocialShare"
//             checked={thankYouData.allowSocialShare}
//             onCheckedChange={(checked) => onThankYouDataChange({ allowSocialShare: checked })}
//           />
//           <Label htmlFor="allowSocialShare">Allow to share on social media</Label>
//         </div>

//         <div>
//           <Label htmlFor="redirectUrl">Redirect to your own page</Label>
//           <Input
//             id="redirectUrl"
//             name="redirectUrl"
//             value={thankYouData.redirectUrl}
//             onChange={handleInputChange}
//             placeholder="https://your-website.com/thank-you"
//           />
//         </div>

//         <div className="flex items-center space-x-2">
//           <Switch
//             id="autoReward"
//             checked={thankYouData.autoReward}
//             onCheckedChange={(checked) => onThankYouDataChange({ autoReward: checked })}
//           />
//           <Label htmlFor="autoReward">Automatically reward your customer for a video testimonial?</Label>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import Image from 'next/image';
import { CreateSpaceInput } from '@/types/space';

interface ThankYouFormProps {
  thankYouData: {
    image: File | string | null;
    title: string;
    message: string;
    allowSocialShare: boolean;
    redirectUrl: string;
    autoReward: boolean;
    hideImage: boolean;
  };
  onThankYouDataChange: (newData: Partial<CreateSpaceInput>) => void;
}

export default function ThankYouForm({ thankYouData, onThankYouDataChange }: ThankYouFormProps) {
  const defaultImageUrl = "/testiy.png";
  const [imagePreview, setImagePreview] = useState<string>(defaultImageUrl);

  useEffect(() => {
    if (thankYouData.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(thankYouData.image);
    } else if (typeof thankYouData.image === 'string') {
      setImagePreview(thankYouData.image);
    } else {
      setImagePreview(defaultImageUrl);
    }
  }, [thankYouData.image]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onThankYouDataChange({ [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onThankYouDataChange({ thankYouImage: file });
    }
  };

  const handleHideImageChange = (checked: boolean) => {
    onThankYouDataChange({ hideImage: checked });
    if (checked) {
      onThankYouDataChange({ thankYouImage: null });
    } else {
      onThankYouDataChange({ thankYouImage: defaultImageUrl });
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Customize thank you page</h2>
        <p className="text-gray-600 mb-6 text-center">Add your personalized message to show your appreciation</p>

        <div className="w-full px-3">
          <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="thankYouImage">
            Image
            <div className="relative flex rounded-md items-start my-auto ml-2">
              <div className="ml-4 flex items-center">
                <Checkbox
                  id="hideImage"
                  checked={thankYouData.hideImage}
                  onCheckedChange={handleHideImageChange}
                />
                <Label htmlFor="hideImage" className="ml-2">Hide the image?</Label>
              </div>
            </div>
          </Label>


            <div className="mt-2 flex items-center">
              <span className="h-14 w-26 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={imagePreview}
                  alt="Thank you image preview"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="ml-5 rounded-md shadow-sm">
                <Input
                  type="file"
                  accept="image/*"
                  id="thankYouImage"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="thankYouImage"
                  className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium bg-gray-50 text-gray-600 hover:text-gray-700 focus:outline-none cursor-pointer"
                >
                  Change
                </Label>
              </span>
            </div>
        
        </div>

        <div>
          <Label htmlFor="thankYouTitle">Thank you title</Label>
          <Input
            id="thankYouTitle"
            name="thankYouTitle"
            value={thankYouData.title}
            onChange={handleInputChange}
            placeholder="Thank you!"
          />
        </div>

        <div>
          <Label htmlFor="thankYouMessage">Thank you message</Label>
          <Textarea
            id="thankYouMessage"
            name="thankYouMessage"
            value={thankYouData.message}
            onChange={handleInputChange}
            placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏"
            rows={4}
          />
          <span className="text-sm text-gray-500">Markdown supported</span>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="allowSocialShare"
            checked={thankYouData.allowSocialShare}
            onCheckedChange={(checked) => onThankYouDataChange({ allowSocialShare: checked })}
          />
          <Label htmlFor="allowSocialShare">Allow to share on social media</Label>
        </div>

        <div>
          <Label htmlFor="redirectUrl">Redirect to your own page</Label>
          <Input
            id="redirectUrl"
            name="redirectUrl"
            value={thankYouData.redirectUrl}
            onChange={handleInputChange}
            placeholder="https://your-website.com/thank-you"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="autoReward"
            checked={thankYouData.autoReward}
            onCheckedChange={(checked) => onThankYouDataChange({ autoReward: checked })}
          />
          <Label htmlFor="autoReward">Automatically reward your customer for a video testimonial?</Label>
        </div>
      </div>
    </div>
  );
}
