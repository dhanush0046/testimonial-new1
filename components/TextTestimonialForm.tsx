// component/TextTestimonialForm.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { ExtraInformationField,Theme } from "@/types/space";
import { CreateTestimonialInput, ExtraInformationItem, TestimonialType } from "@/types/testimonial";
import { toast, Toaster } from "sonner";
import { createTestimonial, uploadFile } from "@/lib/api";
import Image from "next/image";

interface TextTestimonialFormProps {
  spaceId: string;
  logo: string | null;
  headerTitle: string;
  questions: { id: string; content: string }[];
  extraInformationFields: ExtraInformationField[];
  collectStarRatings: boolean;
  logoShape: boolean;
  maxTextCharacters: number;
  consentDisplay: string;
  consentStatement: string;
  textSubmissionTitle: string;  
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TextTestimonialForm({
  spaceId,
  logo,
  headerTitle,
  questions,
  extraInformationFields,
  collectStarRatings,
  logoShape,
  maxTextCharacters,
  consentDisplay,
  consentStatement,
  textSubmissionTitle,  
  onSuccess,
  onCancel,
}: TextTestimonialFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [extraInfo, setExtraInfo] = useState<ExtraInformationItem[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extraFields = extraInformationFields.filter((field) => field.isEnabled);

  useEffect(() => {
    // Generate initial avatar based on the first enabled text field (usually the name field)
    const nameField = extraFields.find(field => field.inputType === 'text');
    if (nameField) {
      generateAvatar(nameField.id);
    }
  }, [extraFields]);

  const generateAvatar = (fieldId: string) => {
    const field = extraInfo.find(item => item.id === fieldId);
    if (field && typeof field.value === 'string') {
      const initial = field.value.charAt(0).toUpperCase();
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 200;
      canvas.height = 200;

      if (context) {
        context.fillStyle = '#4F46E5';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = 'bold 100px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(initial, canvas.width / 2, canvas.height / 2);
      }

      setAvatarPreview(canvas.toDataURL('image/png'));
    }
  };

  const handleAttachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(files);
  
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newPreviews);
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
  
    setAttachments(updatedAttachments);
    setPreviewUrls(updatedPreviews);
  };
  
  const handleClearAll = () => {
    setAttachments([]);
    setPreviewUrls([]);
  };
  
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtraInfoChange = (
    id: string,
    label: string,
    value: string | boolean
  ) => {
    setExtraInfo((prevInfo) => {
      const existingIndex = prevInfo.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        return prevInfo.map((item) =>
          item.id === id ? { ...item, value } : item
        );
      } else {
        return [...prevInfo, { id, label, value }];
      }
    });
      // Generate avatar when the name field changes
      if (id === extraFields.find(field => field.inputType === 'text')?.id) {
        generateAvatar(id);
      }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (content.length < maxTextCharacters) {
      toast.error(`Please enter at least ${maxTextCharacters} characters for your testimonial.`);
      return;
    }

    try {
      let photoUrl: string | undefined;
      let attachedImageUrls: string[] = [];

      if (photo) {
        photoUrl = await uploadFile(photo, 'photo');
      }else if (avatarPreview) {
        // If no photo is uploaded, use the generated avatar
        const response = await fetch(avatarPreview);
        const blob = await response.blob();
        const file = new File([blob], 'avatar.png', { type: 'image/png' });
        photoUrl = await uploadFile(file, 'photo');
      }

      for (const attachment of attachments) {
        const attachmentUrl = await uploadFile(attachment, 'attachment');
        attachedImageUrls.push(attachmentUrl);
      }

      const testimonialData: CreateTestimonialInput = {
        spaceId,
        content,
        type: TestimonialType.TEXT,
        rating: collectStarRatings ? rating : undefined,
        photo: photoUrl,
        attachedImages: attachedImageUrls,
        permissionGranted,
        extraInformation: extraInfo,
      };

      await createTestimonial(testimonialData);
      toast.success("Testimonial submitted successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("An error occurred while submitting the testimonial.");
    }
  };

  const renderConsentSection = () => {
    if (consentDisplay === "hidden") {
      return null;
    }

    return (
      <div className="mt-1 relative flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="permission"
            required={consentDisplay === "required"}
            className="focus:ring-purple-500 text-purple-600 rounded mr-2"
            checked={permissionGranted}
            onChange={(e) => setPermissionGranted(e.target.checked)}
          />
        </div>
        <div className="ml-2 text-sm leading-5">
          <Label htmlFor="permission" className="text-gray-600">
            {consentStatement}
            {consentDisplay === "required" && <span className="text-red-600 ml-1">*</span>}
            {consentDisplay === "optional" && <span className="text-gray-400 ml-1">(Optional)</span>}
          </Label>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full p-3 text-left">
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-2xl text-gray-900 text-center font-bold mb-3">{textSubmissionTitle}</h2>
        <div className="text-center mb-6">
          {logo && (
            <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-md">
              <Image
                src={logo}
                alt="Logo"
                width={96}
                height={96}
                objectFit="cover"
                className={`${logoShape ? "rounded-lg" : "rounded-full"}`}
              />
            </div>
          )}
          <h3 className="font-bold text-xl text-gray-900">{headerTitle}</h3>
        </div>

        <div className="mb-6">
          <h4 className="text-lg text-gray-900 font-semibold mb-2">Questions</h4>
          <ul className="list-disc pl-5 space-y-2">
            {questions.map((question) => (
              <li key={question.id}>{question.content}</li>
            ))}
          </ul>
        </div>

        <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-4">
          {collectStarRatings && (
            <div>
              <Label htmlFor="rating">Rating</Label>
              <span className="text-red-600 ml-1">*</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="testimonial">Your Testimonial</Label>
            <Textarea
              id="testimonial"
              placeholder={`Write your testimonial here (minimum ${maxTextCharacters} characters)...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              //className={`${content.length < maxTextCharacters ? 'border-red-500' : 'border-green-500'}`}
            />
            <p className={`text-sm ${content.length < maxTextCharacters ? 'text-red-500' : 'text-green-500'}`}>
              {content.length}/{maxTextCharacters} characters
              {content.length < maxTextCharacters ? ` (${maxTextCharacters - content.length} more needed)` : ' (minimum reached)'}
            </p>
          </div>

          <div className="w-full">
            <Label className="text-sm text-gray-700" htmlFor="multiple-image-select">
              Attach Image(s)
            </Label>
            <div className="mt-2 flex flex-col space-y-3">
              <div className="flex space-x-3">
                <span className="rounded-md">
                  <Input
                    type="file"
                    accept="image/*"
                    id="multiple-image-select"
                    multiple
                    className="hidden"
                    onChange={handleAttachChange}
                  />
                  <label
                    htmlFor="multiple-image-select"
                    className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
                  >
                    Choose file
                  </label>
                </span>
                {previewUrls.length > 0 && (
                  <button
                    type="button"
                    title="Remove all"
                    onClick={handleClearAll}
                    className="ml-2 text-gray-600 hover:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              {previewUrls.length > 0 && (
                <div style={{ width: '350px' }}>
                  <div className="flex flex-wrap gap-2">                    
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative p-2" style={{ width: '70px', height: '70px' }}>
                        <div className="flex items-center justify-center relative w-14 h-14">
                          <button
                            type="button"
                            title="Remove"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 w-7 h-7 z-50 fill-white text-purple-600 hover:text-purple-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <button type="button" title="View" className="border rounded-md bg-black cursor-pointer overflow-hidden h-full w-full flex items-center justify-center transition hover:scale-105">
                            <img src={url} alt="attached" className="w-full h-full object-cover" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>          
          {extraFields.map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id}>
                {field.label}
                {field.isRequired && <span className="text-red-600 ml-1">*</span>}
              </Label>
              <Input
                id={field.id}
                type={field.inputType}
                name={field.id}
                required={field.isRequired}
                onChange={(e) =>
                  handleExtraInfoChange(field.id, field.label, e.target.value)
                }
              />
            </div>
          ))}

          <div>
            <Label htmlFor="photo">Upload Your Photo</Label>
            <div className="mt-2 flex items-center">
              <span className="rounded-full h-20 w-20 overflow-hidden bg-gray-300">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </span>
              <span className="ml-5 rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  id="photo"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <label
                  htmlFor="photo"
                  className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
                >
                  Choose file
                </label>
              </span>
            </div>
          </div>
          {renderConsentSection()}
        </form>
      </div>
      
      <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button 
          type="submit" 
          form="testimonial-form" 
          className="border"
          //disabled={content.length < maxTextCharacters}
        >
          Send
        </Button>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}


// //components/TextTestimonialForm.tsx -- language translations
// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Star } from "lucide-react";
// import { ExtraInformationField, Theme, Language } from "@/types/space";
// import { CreateTestimonialInput, ExtraInformationItem, TestimonialType } from "@/types/testimonial";
// import { toast, Toaster } from "sonner";
// import { createTestimonial, uploadFile } from "@/lib/api";
// import Image from "next/image";
// import { useTranslation } from "@/hooks/useTranslation";

// interface TextTestimonialFormProps {
//   spaceId: string;
//   logo: string | null;
//   headerTitle: string;
//   questions: { id: string; content: string }[];
//   extraInformationFields: ExtraInformationField[];
//   collectStarRatings: boolean;
//   logoShape: boolean;
//   maxTextCharacters: number;
//   consentDisplay: string;
//   consentStatement: string;
//   textSubmissionTitle: string;  
//   onSuccess: () => void;
//   onCancel: () => void;
//   selectedLanguage: Language;
// }

// export default function TextTestimonialForm({
//   spaceId,
//   logo,
//   headerTitle,
//   questions,
//   extraInformationFields,
//   collectStarRatings,
//   logoShape,
//   maxTextCharacters,
//   consentDisplay,
//   consentStatement,
//   textSubmissionTitle,  
//   onSuccess,
//   onCancel,
//   selectedLanguage,
// }: TextTestimonialFormProps) {
//   const [rating, setRating] = useState(0);
//   const [content, setContent] = useState("");
//   const [extraInfo, setExtraInfo] = useState<ExtraInformationItem[]>([]);
//   const [attachments, setAttachments] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [permissionGranted, setPermissionGranted] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const extraFields = extraInformationFields.filter((field) => field.isEnabled);

//   const { translatedText: translatedHeaderTitle } = useTranslation(headerTitle, selectedLanguage);
//   const { translatedText: translatedTextSubmissionTitle } = useTranslation(textSubmissionTitle, selectedLanguage);
//   const { translatedText: translatedConsentStatement } = useTranslation(consentStatement, selectedLanguage);

//   useEffect(() => {
//     const nameField = extraFields.find(field => field.inputType === 'text');
//     if (nameField) {
//       generateAvatar(nameField.id);
//     }
//   }, [extraFields]);

//   const generateAvatar = (fieldId: string) => {
//     const field = extraInfo.find(item => item.id === fieldId);
//     if (field && typeof field.value === 'string') {
//       const initial = field.value.charAt(0).toUpperCase();
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       canvas.width = 200;
//       canvas.height = 200;

//       if (context) {
//         context.fillStyle = '#4F46E5';
//         context.fillRect(0, 0, canvas.width, canvas.height);

//         context.font = 'bold 100px Arial';
//         context.fillStyle = 'white';
//         context.textAlign = 'center';
//         context.textBaseline = 'middle';
//         context.fillText(initial, canvas.width / 2, canvas.height / 2);
//       }

//       setAvatarPreview(canvas.toDataURL('image/png'));
//     }
//   };

//   const handleAttachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     setAttachments(files);
  
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviewUrls(newPreviews);
//   };
  
//   const handleRemoveImage = (index: number) => {
//     const updatedAttachments = attachments.filter((_, i) => i !== index);
//     const updatedPreviews = previewUrls.filter((_, i) => i !== index);
  
//     setAttachments(updatedAttachments);
//     setPreviewUrls(updatedPreviews);
//   };
  
//   const handleClearAll = () => {
//     setAttachments([]);
//     setPreviewUrls([]);
//   };
  
//   const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setPhoto(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleExtraInfoChange = (
//     id: string,
//     label: string,
//     value: string | boolean
//   ) => {
//     setExtraInfo((prevInfo) => {
//       const existingIndex = prevInfo.findIndex((item) => item.id === id);
//       if (existingIndex !== -1) {
//         return prevInfo.map((item) =>
//           item.id === id ? { ...item, value } : item
//         );
//       } else {
//         return [...prevInfo, { id, label, value }];
//       }
//     });
//     const nameField = extraFields.find(field => field.inputType === 'text');
//     if (id === nameField?.id) {
//       generateAvatar(id);
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (content.length < maxTextCharacters) {
//       toast.error(`Please enter at least ${maxTextCharacters} characters for your testimonial.`);
//       return;
//     }

//     try {
//       let photoUrl: string | undefined;
//       let attachedImageUrls: string[] = [];

//       if (photo) {
//         photoUrl = await uploadFile(photo, 'photo');
//       } else if (avatarPreview) {
//         const response = await fetch(avatarPreview);
//         const blob = await response.blob();
//         const file = new File([blob], 'avatar.png', { type: 'image/png' });
//         photoUrl = await uploadFile(file, 'photo');
//       }

//       for (const attachment of attachments) {
//         const attachmentUrl = await uploadFile(attachment, 'attachment');
//         attachedImageUrls.push(attachmentUrl);
//       }

//       const testimonialData: CreateTestimonialInput = {
//         spaceId,
//         content,
//         type: TestimonialType.TEXT,
//         rating: collectStarRatings ? rating : undefined,
//         photo: photoUrl,
//         attachedImages: attachedImageUrls,
//         permissionGranted,
//         extraInformation: extraInfo,
//         language: selectedLanguage,
//       };

//       await createTestimonial(testimonialData);
//       toast.success("Testimonial submitted successfully!");
//       onSuccess();
//     } catch (error) {
//       console.error("Error submitting testimonial:", error);
//       toast.error("An error occurred while submitting the testimonial.");
//     }
//   };

//   const renderConsentSection = () => {
//     if (consentDisplay === "hidden") {
//       return null;
//     }

//     return (
//       <div className="mt-1 relative flex items-start">
//         <div className="flex items-center h-5">
//           <input
//             type="checkbox"
//             id="permission"
//             required={consentDisplay === "required"}
//             className="focus:ring-purple-500 text-purple-600 rounded mr-2"
//             checked={permissionGranted}
//             onChange={(e) => setPermissionGranted(e.target.checked)}
//           />
//         </div>
//         <div className="ml-2 text-sm leading-5">
//           <Label htmlFor="permission" className="text-gray-600">
//             {translatedConsentStatement}
//             {consentDisplay === "required" && <span className="text-red-600 ml-1">*</span>}
//             {consentDisplay === "optional" && <span className="text-gray-400 ml-1">(Optional)</span>}
//           </Label>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col h-full p-3 text-left">
//       <div className="flex-grow overflow-y-auto">
//         <h2 className="text-2xl text-gray-900 text-center font-bold mb-3">{translatedTextSubmissionTitle}</h2>
//         <div className="text-center mb-6">
//           {logo && (
//             <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-md">
//               <Image
//                 src={logo}
//                 alt="Logo"
//                 width={96}
//                 height={96}
//                 objectFit="cover"
//                 className={`${logoShape ? "rounded-lg" : "rounded-full"}`}
//               />
//             </div>
//           )}
//           <h3 className="font-bold text-xl text-gray-900">{translatedHeaderTitle}</h3>
//         </div>

//         <div className="mb-6">
//           <h4 className="text-lg text-gray-900 font-semibold mb-2">Questions</h4>
//           <ul className="list-disc pl-5 space-y-2">
//             {questions.map((question) => {
//               const { translatedText: translatedQuestion } = useTranslation(question.content, selectedLanguage);
//               return <li key={question.id}>{translatedQuestion}</li>;
//             })}
//           </ul>
//         </div>

//         <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-4">
//           {collectStarRatings && (
//             <div>
//               <Label htmlFor="rating">Rating</Label>
//               <span className="text-red-600 ml-1">*</span>
//               <div className="flex items-center">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     className={`w-6 h-6 cursor-pointer ${
//                       star <= rating
//                         ? "text-yellow-400 fill-current"
//                         : "text-gray-300"
//                     }`}
//                     onClick={() => setRating(star)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           <div>
//             <Label htmlFor="testimonial">Your Testimonial</Label>
//             <Textarea
//               id="testimonial"
//               placeholder={`Write your testimonial here (minimum ${maxTextCharacters} characters)...`}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               rows={5}
//             />
//             <p className={`text-sm ${content.length < maxTextCharacters ? 'text-red-500' : 'text-green-500'}`}>
//               {content.length}/{maxTextCharacters} characters
//               {content.length < maxTextCharacters ? ` (${maxTextCharacters - content.length} more needed)` : ' (minimum reached)'}
//             </p>
//           </div>

//           <div className="w-full">
//             <Label className="text-sm text-gray-700" htmlFor="multiple-image-select">
//               Attach Image(s)
//             </Label>
//             <div className="mt-2 flex flex-col space-y-3">
//               <div className="flex space-x-3">
//                 <span className="rounded-md">
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     id="multiple-image-select"
//                     multiple
//                     className="hidden"
//                     onChange={handleAttachChange}
//                   />
//                   <label
//                     htmlFor="multiple-image-select"
//                     className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//                   >
//                     Choose file
//                   </label>
//                 </span>
//                 {previewUrls.length > 0 && (
//                   <button
//                     type="button"
//                     title="Remove all"
//                     onClick={handleClearAll}
//                     className="ml-2 text-gray-600 hover:text-gray-400"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 )}
//               </div>

//               {previewUrls.length > 0 && (
//                 <div style={{ width: '350px' }}>
//                   <div className="flex flex-wrap gap-2">                    
//                     {previewUrls.map((url, index) => (
//                       <div key={index} className="relative p-2" style={{ width: '70px', height: '70px' }}>
//                         <div className="flex items-center justify-center relative w-14 h-14">
//                           <button
//                             type="button"
//                             title="Remove"
//                             onClick={() => handleRemoveImage(index)}
//                             className="absolute -top-2 -right-2 w-7 h-7 z-50 fill-white text-purple-600 hover:text-purple-700"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                           </button>
//                           <button type="button" title="View" className="border rounded-md bg-black cursor-pointer overflow-hidden h-full w-full flex items-center justify-center transition hover:scale-105">
//                             <img src={url} alt="attached" className="w-full h-full object-cover" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>          
//           {extraFields.map((field) => {
//             const { translatedText: translatedLabel } = useTranslation(field.label, selectedLanguage);
//             return (
//               <div key={field.id}>
//                 <Label htmlFor={field.id}>
//                   {translatedLabel}
//                   {field.isRequired && <span className="text-red-600 ml-1">*</span>}
//                 </Label>
//                 <Input
//                   id={field.id}
//                   type={field.inputType}
//                   name={field.id}
//                   required={field.isRequired}
//                   onChange={(e) =>
//                     handleExtraInfoChange(field.id, field.label, e.target.value)
//                   }
//                 />
//               </div>
//             );
//           })}

//           <div>
//             <Label htmlFor="photo">Upload Your Photo</Label>
//             <div className="mt-2 flex items-center">
//               <span className="rounded-full h-20 w-20 overflow-hidden bg-gray-300">
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt="Preview"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : avatarPreview ? (
//                   <img
//                     src={avatarPreview}
//                     alt="Avatar"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : null}
//               </span>
//               <span className="ml-5 rounded-md">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="photo"
//                   ref={fileInputRef}
//                   className="hidden"
//                   onChange={handlePhotoChange}
//                 />
//                 <label
//                   htmlFor="photo"
//                   className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//                 >
//                   Choose file
//                 </label>
//               </span>
//             </div>
//           </div>
//           {renderConsentSection()}
//         </form>
//       </div>
      
//       <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
//         <Button onClick={onCancel} variant="outline">
//           Cancel
//         </Button>
//         <Button 
//           type="submit" 
//           form="testimonial-form" 
//           className="border"
//         >
//           Send
//         </Button>
//       </div>
//       <Toaster position="top-center" richColors />
//     </div>
//   );
// }