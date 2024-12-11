// //components/VideoUploader.tsx -- workingss
// import React, { useRef, useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { FaVideo, FaStopCircle, FaCloudUploadAlt, FaRedo } from "react-icons/fa";
// import { toast, Toaster } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Star } from "lucide-react";
// import { ExtraInformationField, Language } from "@/types/space";
// import { ExtraInformationItem, CreateTestimonialInput, TestimonialType } from "@/types/testimonial";
// import { createTestimonial, getSignedUrl } from "@/lib/api";
// import Image from "next/image";

// interface VideoUploaderProps {
//   spaceId: string;
//   language: Language;
//   logo: string | null;
//   headerTitle: string;
//   questions: { id: string; content: string }[];
//   extraInformationFields: ExtraInformationField[];
//   collectStarRatings: boolean;
//   logoShape: boolean;
//   maxVideoDuration: number;
//   consentDisplay: string;
//   consentStatement: string;
//   onSuccess: () => void;
// }

// export default function VideoUploader({
//   spaceId,
//   language,
//   logo,
//   headerTitle,
//   questions,
//   extraInformationFields,
//   collectStarRatings,
//   logoShape,
//   maxVideoDuration,
//   consentDisplay,
//   consentStatement,
//   onSuccess,
// }: VideoUploaderProps) {
//   const { t, i18n } = useTranslation("common");
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [recording, setRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [rating, setRating] = useState(0);
//   const [extraInfo, setExtraInfo] = useState<ExtraInformationItem[]>([]);
//   const [permissionGranted, setPermissionGranted] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(maxVideoDuration*60);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

//   const extraFields = extraInformationFields.filter((field) => field.isEnabled);
//   React.useEffect(() => {
//     if (i18n && i18n.changeLanguage) {
//       i18n.changeLanguage(language);
//     }
//   }, [language, i18n]);

//   useEffect(() => {
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [stream]);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (recording && remainingTime > 0) {
//       timer = setInterval(() => {
//         setRemainingTime((prevTime) => {
//           if (prevTime <= 0.1) {
//             stopRecording();
//             return 0;
//           }
//           return prevTime - 0.1;
//         });
//       }, 100);
//     }
//     return () => clearInterval(timer);
//   }, [recording, remainingTime]);

//   const generateAvatar = React.useCallback((fieldId: string) => {
//     const field = extraInfo.find((item) => item.id === fieldId);
//     if (field && typeof field.value === "string" && field.value.length > 0) {
//       const initial = field.value.charAt(0).toUpperCase();
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.width = 200;
//       canvas.height = 200;
  
//       if (context) {
//         // Use a darker background color for better contrast
//         context.fillStyle = "#4F46E5";
//         context.fillRect(0, 0, canvas.width, canvas.height);
  
//         context.font = "bold 100px Arial";
//         context.fillStyle = "white";
//         context.textAlign = "center";
//         context.textBaseline = "middle";
//         context.fillText(initial, canvas.width / 2, canvas.height / 2 + 10);
//       }
  
//       setAvatarPreview(canvas.toDataURL("image/png"));
//     } else {
//       // Set a default avatar or clear the preview if the field is empty
//       setAvatarPreview(null);
//     }
//   }, [extraInfo]);

//   // Helper function to format time in MM:SS
//   const formatTime = (time: number) => {
//   const minutes = Math.floor(time / 60);
//   const seconds = Math.floor(time % 60);
//   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// };

//   const startRecording = async () => {
//     try {
//       const newStream = await navigator.mediaDevices.getUserMedia({
//         video: { width: 640, height: 480 },
//         audio: true,
//       });
//       setStream(newStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = newStream;
//         videoRef.current.play();
//       }
//       const recorder = new MediaRecorder(newStream);
//       const chunks: Blob[] = [];

//       recorder.ondataavailable = (e) => {
//         chunks.push(e.data);
//       };

//       recorder.onstop = () => {
//         const videoBlob = new Blob(chunks, { type: "video/mp4" });
//         setVideoBlob(videoBlob);

//         if (videoRef.current) {
//           const videoUrl = URL.createObjectURL(videoBlob);
//           videoRef.current.srcObject = null;
//           videoRef.current.src = videoUrl;
//           videoRef.current.controls = true;
//         }
//       };

//       recorder.start();
//       setMediaRecorder(recorder);
//       setRecording(true);
//       setRemainingTime(maxVideoDuration);
//     } catch (err) {
//       console.error("Error accessing camera or microphone: ", err);
//       toast.error("Failed to access camera or microphone");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//       setRecording(false);
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
//   };

//   const validateForm = () => {
//     let isValid = true;
//     let errorMessage = "";

//     if (collectStarRatings && rating === 0) {
//       isValid = false;
//       errorMessage = "Please provide a rating.";
//     }

//     extraFields.forEach((field) => {
//       if (field.isRequired) {
//         const infoItem = extraInfo.find((item) => item.id === field.id);
//         if (!infoItem || !infoItem.value) {
//           isValid = false;
//           errorMessage = `Please fill in the required field: ${field.label}`;
//         }
//       }
//     });

//     if (!permissionGranted) {
//       isValid = false;
//       errorMessage = "Please grant permission to use this testimonial.";
//     }

//     return { isValid, errorMessage };
//   };

//   const uploadVideo = async () => {
//     if (!videoBlob) return;

//     const { isValid, errorMessage } = validateForm();
//     if (!isValid) {
//       toast.error(errorMessage);
//       return;
//     }

//     setIsUploading(true);

//     const videoName = `video-${Date.now()}.mp4`;
//     const videoType = "video/mp4";

//     try {
//       const signedUrl = await getSignedUrl(videoName, videoType, spaceId);

//       const uploadResponse = await fetch(signedUrl, {
//         method: "PUT",
//         headers: { "Content-Type": videoType },
//         body: videoBlob,
//       });

//       if (uploadResponse.ok) {
//         const videoUrl = signedUrl.split("?")[0];
//         const testimonialData: CreateTestimonialInput = {
//           spaceId,
//           type: TestimonialType.VIDEO,
//           content: "",
//           videoUrl,
//           rating: collectStarRatings ? rating : undefined,
//           extraInformation: extraInfo,
//           permissionGranted,
//         };

//         await createTestimonial(testimonialData);

//         toast.success("Video uploaded and testimonial created successfully!");
//         setVideoBlob(null);
//         if (videoRef.current) {
//           videoRef.current.src = "";
//           videoRef.current.controls = false;
//         }
//         setRating(0);
//         setExtraInfo([]);
//         setPermissionGranted(false);
//         onSuccess();
//       } else {
//         toast.error("Failed to upload the video.");
//       }
//     } catch (error) {
//       console.error("Error during video upload:", error);
//       toast.error("An error occurred while uploading the video.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const reRecord = () => {
//     setVideoBlob(null);
//     if (videoRef.current) {
//       videoRef.current.src = "";
//       videoRef.current.controls = false;
//     }
//     startRecording();
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
//             {consentStatement}
//             {consentDisplay === "required" && <span className="text-red-600 ml-1">*</span>}
//             {consentDisplay === "optional" && <span className="text-gray-400 ml-1">(Optional)</span>}
//           </Label>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col items-center space-y-5 p-8 pt-2">
//       <h2 className="text-2xl font-bold">Record video testimonial to</h2>
//       <div className="text-center mt-0 mb-6 w-full">
//         {logo && (
//             <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-md">
//             <Image
//               src={logo}
//               alt="Logo"
//               width={96}
//               height={96}
//               objectFit="cover"
//               className={`${logoShape ? "rounded-lg" : "rounded-full"}`}
//             />
//           </div>
//         )}
//         <h3 className="text-2xl font-bold">{headerTitle}</h3>
//       </div>

//       <div className="mb-6 text-left w-full">
//         <h4 className="text-lg font-semibold mb-2">Questions</h4>
//         <ul className="list-disc pl-5 space-y-2">
//           {questions.map((question) => (
//             <li key={question.id}>{question.content}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="relative w-full max-w-[480px] h-[380px] overflow-hidden rounded-lg shadow-md border-4 border-white transition-all duration-300 ease-in-out">
//         <video
//           ref={videoRef}
//           playsInline
//           muted={recording}
//           className="w-full h-full object-cover transition-all duration-300 ease-in-out"
//         ></video>

//         {recording && (
//           <div className="absolute top-4 right-4 text-white px-3 py-1.5 rounded-md text-sm font-bold flex items-center transition-all duration-300 ease-in-out">
//             <span className="relative inline-flex items-center justify-center w-4 h-4 mr-2">
//               <span className="absolute inline-flex w-full h-full bg-red-500 opacity-75 rounded-full animate-ping"></span>
//               <span className="relative inline-flex w-2 h-2 bg-red-600 rounded-full"></span>
//             </span>
//             <span className="text-xl font-bold tracking-wider uppercase mt-0.5">
//                {formatTime(remainingTime)}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-center space-x-4 transition-all duration-300 ease-in-out">
//         {recording ? (
//           <Button
//             onClick={stopRecording}
//             className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
//           >
//             <FaStopCircle size={20} />
//             <span>Stop Recording</span>
//           </Button>
//         ) : (
//           <>
//             {!videoBlob && (
//               <Button
//                 onClick={startRecording}
//                 className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
//               >
//                 <FaVideo size={20} />
//                 <span>Start Recording</span>
//               </Button>
//             )}
//           </>
//         )}
//       </div>

//       {videoBlob && (
//         <div className="space-y-4 text-left w-full">
//           {collectStarRatings && (
//             <div>
//               <Label htmlFor="rating" className="text-black">
//                 Rating
//               </Label>
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
//           {extraFields.map((field) => (
//             <div key={field.id}>
//               <Label htmlFor={field.id} className="text-black">
//                 {field.label}
//                 {field.isRequired && <span className="text-red-600 ml-1">*</span>}
//               </Label>
//               <Input
//                 id={field.id}
//                 type={field.inputType}
//                 name={field.id}
//                 required={field.isRequired}
//                 onChange={(e) =>
//                   handleExtraInfoChange(field.id, field.label, e.target.value)
//                 }
//                 className="bg-white text-black"
//               />
//             </div>
//           ))}

//           {renderConsentSection()}
          
//           <div className="flex justify-center space-x-4 mt-8">
//             <Button
//               onClick={reRecord}
//               className="bg-yellow-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
//             >
//               <FaRedo size={20} />
//               <span>Re-record</span>
//             </Button>

//             <Button
//               onClick={uploadVideo}
//               disabled={isUploading}
//               className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-600 transform hover:scale-105  transition-all duration-300 ease-in-out"
//             >
//               <FaCloudUploadAlt size={20} />
//               <span>Upload Video</span>
//             </Button>
//           </div>
//           {isUploading && (
//             <div className="flex flex-col items-center justify-center space-y-4 transition-all duration-300 ease-in-out">
//               <svg
//                 className="animate-spin h-8 w-8 text-blue-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 ></path>
//               </svg>
//               <p className="text-black font-semibold">Uploading...</p>
//             </div>
//           )}
//         </div>
//       )}
//       <Toaster position="top-center" richColors />
//     </div>
//   );
// }

// //components/VideoRecorder.tsx -> Test
// "use client"

// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import { FaVideo, FaStopCircle, FaCloudUploadAlt, FaRedo } from "react-icons/fa";
// import { toast, Toaster } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Star } from 'lucide-react';
// import { ExtraInformationField, Language } from "@/types/space";
// import { ExtraInformationItem, CreateTestimonialInput, TestimonialType } from "@/types/testimonial";
// import { createTestimonial, getSignedUrl, uploadFile } from "@/lib/api";
// import Image from "next/image";

// interface VideoUploaderProps {
//   spaceId: string;
//   language: Language;
//   logo: string | null;
//   headerTitle: string;
//   questions: { id: string; content: string }[];
//   extraInformationFields: ExtraInformationField[];
//   collectStarRatings: boolean;
//   logoShape: boolean;
//   maxVideoDuration: number;
//   consentDisplay: string;
//   consentStatement: string;
//   videoSubmissionTitle: string;
//   onSuccess: () => void;
// }

// export default function VideoUploader({
//   spaceId,
//   language,
//   logo,
//   headerTitle,
//   questions,
//   extraInformationFields,
//   collectStarRatings,
//   logoShape,
//   maxVideoDuration,
//   consentDisplay,
//   consentStatement,
//   videoSubmissionTitle,
//   onSuccess,
// }: VideoUploaderProps) {
//   const { t, i18n } = useTranslation("common");
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [recording, setRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [rating, setRating] = useState(0);
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [extraInfo, setExtraInfo] = useState<ExtraInformationItem[]>([]);
//   const [permissionGranted, setPermissionGranted] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(maxVideoDuration*60);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const extraFields = extraInformationFields.filter((field) => field.isEnabled);

//   useEffect(() => {
//     if (i18n && i18n.changeLanguage) {
//       i18n.changeLanguage(language);
//     }
//   }, [language, i18n]);

//   useEffect(() => {
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [stream]);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (recording && remainingTime > 0) {
//       timer = setInterval(() => {
//         setRemainingTime((prevTime) => {
//           if (prevTime <= 0.1) {
//             stopRecording();
//             return 0;
//           }
//           return prevTime - 0.1;
//         });
//       }, 100);
//     }
//     return () => clearInterval(timer);
//   }, [recording, remainingTime]);

//   const generateAvatar = useCallback((value: string) => {
//     if (value && value.length > 0) {
//       const initial = value.charAt(0).toUpperCase();
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.width = 200;
//       canvas.height = 200;
  
//       if (context) {
//         context.fillStyle = "#4F46E5";
//         context.fillRect(0, 0, canvas.width, canvas.height);
//         context.font = "bold 100px Arial";
//         context.fillStyle = "white";
//         context.textAlign = "center";
//         context.textBaseline = "middle";
//         context.fillText(initial, canvas.width / 2, canvas.height / 2 + 10);
//       }
  
//       setAvatarPreview(canvas.toDataURL("image/png"));
//     } else {
//       setAvatarPreview(null);
//     }
//   }, []);

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

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   const startRecording = async () => {
//     try {
//       const newStream = await navigator.mediaDevices.getUserMedia({
//         video: { width: 640, height: 480 },
//         audio: true,
//       });
//       setStream(newStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = newStream;
//         videoRef.current.play();
//       }
//       const recorder = new MediaRecorder(newStream);
//       const chunks: Blob[] = [];

//       recorder.ondataavailable = (e) => {
//         chunks.push(e.data);
//       };

//       recorder.onstop = () => {
//         const videoBlob = new Blob(chunks, { type: "video/mp4" });
//         setVideoBlob(videoBlob);

//         if (videoRef.current) {
//           const videoUrl = URL.createObjectURL(videoBlob);
//           videoRef.current.srcObject = null;
//           videoRef.current.src = videoUrl;
//           videoRef.current.controls = true;
//         }
//       };

//       recorder.start();
//       setMediaRecorder(recorder);
//       setRecording(true);
//       setRemainingTime(maxVideoDuration * 60);
//     } catch (err) {
//       console.error("Error accessing camera or microphone: ", err);
//       toast.error(t("errors.cameraAccessFailed"));
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//       setRecording(false);
//     }
//   };

//   const handleExtraInfoChange = (
//     id: string,
//     label: string,
//     value: string | boolean
//   ) => {
//     setExtraInfo((prevInfo) => {
//       const updatedInfo = prevInfo.map((item) =>
//         item.id === id ? { ...item, value } : item
//       );
//       if (!updatedInfo.some((item) => item.id === id)) {
//         updatedInfo.push({ id, label, value });
//       }
//       return updatedInfo;
//     });

//     if (typeof value === 'string') {
//       const nameField = extraFields.find((field) => field.inputType === "text");
//       if (nameField && id === nameField.id) {
//         generateAvatar(value);
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!videoBlob) return;

//     setIsUploading(true);

//     const videoName = `video-${Date.now()}.mp4`;
//     const videoType = "video/mp4";

//     try {
//       const signedUrl = await getSignedUrl(videoName, videoType, spaceId);
//       let photoUrl: string | undefined;

//       if (photo) {
//         photoUrl = await uploadFile(photo, "photo");
//       } else if (avatarPreview) {
//         const response = await fetch(avatarPreview);
//         const blob = await response.blob();
//         const file = new File([blob], "avatar.png", { type: "image/png" });
//         photoUrl = await uploadFile(file, "photo");
//       }

//       const uploadResponse = await fetch(signedUrl, {
//         method: "PUT",
//         headers: { "Content-Type": videoType },
//         body: videoBlob,
//       });

//       if (uploadResponse.ok) {
//         const videoUrl = signedUrl.split("?")[0];
//         const testimonialData: CreateTestimonialInput = {
//           spaceId,
//           type: TestimonialType.VIDEO,
//           content: "",
//           videoUrl,
//           rating: collectStarRatings ? rating : undefined,
//           photo: photoUrl,
//           extraInformation: extraInfo,
//           permissionGranted,
//         };

//         await createTestimonial(testimonialData);

//         toast.success(t("success.testimonialSubmitted"));
//         setVideoBlob(null);
//         if (videoRef.current) {
//           videoRef.current.src = "";
//           videoRef.current.controls = false;
//         }
//         setRating(0);
//         setExtraInfo([]);
//         setPermissionGranted(false);
//         onSuccess();
//       } else {
//         toast.error(t("errors.videoUploadFailed"));
//       }
//     } catch (error) {
//       console.error("Error during video upload:", error);
//       toast.error(t("errors.submissionFailed"));
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const reRecord = () => {
//     setVideoBlob(null);
//     if (videoRef.current) {
//       videoRef.current.src = "";
//       videoRef.current.controls = false;
//     }
//     startRecording();
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
//             {consentStatement}
//             {consentDisplay === "required" && <span className="text-red-600 ml-1">*</span>}
//             {consentDisplay === "optional" && <span className="text-gray-400 ml-1">({t("labels.optional")})</span>}
//           </Label>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 p-8 pt-2">
//       <h2 className="text-2xl font-bold">{videoSubmissionTitle}</h2>
//       <div className="text-center mt-0 mb-6 w-full">
//         {logo && (
//           <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-md">
//             <Image
//               src={logo}
//               alt={t("alt.logo")}
//               width={96}
//               height={96}
//               style={{ objectFit: "cover" }}
//               className={logoShape ? "rounded-lg" : "rounded-full"}
//             />
//           </div>
//         )}
//         <h3 className="text-2xl font-bold">{headerTitle}</h3>
//       </div>

//       <div className="mb-6 text-left w-full">
//         <h4 className="text-lg font-semibold mb-2">{t("labels.questions")}</h4>
//         <ul className="list-disc pl-5 space-y-2">
//           {questions.map((question) => (
//             <li key={question.id}>{question.content}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="relative w-full max-w-[480px] h-[380px] overflow-hidden rounded-lg shadow-md border-4 border-white transition-all duration-300 ease-in-out">
//         <video
//           ref={videoRef}
//           playsInline
//           muted={recording}
//           className="w-full h-full object-cover transition-all duration-300 ease-in-out"
//         ></video>

//         {recording && (
//           <div className="absolute top-4 right-4 text-white px-3 py-1.5 rounded-md text-sm font-bold flex items-center transition-all duration-300 ease-in-out">
//             <span className="relative inline-flex items-center justify-center w-4 h-4 mr-2">
//               <span className="absolute inline-flex w-full h-full bg-red-500 opacity-75 rounded-full animate-ping"></span>
//               <span className="relative inline-flex w-2 h-2 bg-red-600 rounded-full"></span>
//             </span>
//             <span className="text-xl font-bold tracking-wider uppercase mt-0.5">
//                {formatTime(remainingTime)}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-center space-x-4 transition-all duration-300 ease-in-out">
//         {recording ? (
//           <Button
//             type="button"
//             onClick={stopRecording}
//             className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
//           >
//             <FaStopCircle size={20} />
//             <span>{t("buttons.stopRecording")}</span>
//           </Button>
//         ) : (
//           <>
//             {!videoBlob && (
//               <Button
//                 type="button"
//                 onClick={startRecording}
//                 className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
//               >
//                 <FaVideo size={20} />
//                 <span>{t("buttons.startRecording")}</span>
//               </Button>
//             )}
//           </>
//         )}
//       </div>

//       {videoBlob && (
//         <div className="space-y-4 text-left w-full">
//           {collectStarRatings && (
//             <div>
//               <Label htmlFor="rating" className="text-black">
//                 {t("labels.rating")}
//               </Label>
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
//           {extraFields.map((field) => (
//             <div key={field.id}>
//               <Label htmlFor={field.id} className="text-black">
//                 {t(`extraFields.${field.id}`, field.label)}
//                 {field.isRequired && <span className="text-red-600 ml-1">*</span>}
//               </Label>
//               <Input
//                 id={field.id}
//                 type={field.inputType}
//                 name={field.id}
//                 required={field.isRequired}
//                 onChange={(e) =>
//                   handleExtraInfoChange(field.id, t(`extraFields.${field.id}`, field.label), e.target.value)
//                 }
//                 className="bg-white text-black"
//               />
//             </div>
//           ))}

//           <div>
//             <Label htmlFor="photo">{t("labels.uploadYourPhoto")}</Label>
//             <div className="mt-2 flex items-center">
//               <span className="rounded-full h-20 w-20 overflow-hidden bg-gray-300">
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt={t("alt.preview")}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : avatarPreview ? (
//                   <img
//                     src={avatarPreview}
//                     alt={t("alt.avatar")}
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
//                   {t("buttons.chooseFile")}
//                 </label>
//               </span>
//             </div>
//           </div>

//           {renderConsentSection()}
          
//           <div className="flex justify-center space-x-4 mt-8">
//             <Button
//               type="button"
//               onClick={reRecord}
//               className="bg-yellow-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
//             >
//               <FaRedo size={20} />
//               <span>{t("buttons.reRecord")}</span>
//             </Button>

//             <Button
//               type="submit"
//               disabled={isUploading}
//               className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
//             >
//               <FaCloudUploadAlt size={20} />
//               <span>{t("buttons.uploadVideo")}</span>
//             </Button>
//           </div>
//           {isUploading && (
//             <div className="flex flex-col items-center justify-center space-y-4 transition-all duration-300 ease-in-out">
//               <svg
//                 className="animate-spin h-8 w-8 text-blue-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 ></path>
//               </svg>
//               <p className="text-black font-semibold">{t("labels.uploading")}</p>
//             </div>
//           )}
//         </div>
//       )}
//       <Toaster position="top-center" richColors />
//     </form>
//   );
// }

//components/VideoRecorder.tsx -> Test
"use client"

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaVideo, FaStopCircle, FaCloudUploadAlt, FaRedo } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from 'lucide-react';
import { ExtraInformationField, Language } from "@/types/space";
import { ExtraInformationItem, CreateTestimonialInput, TestimonialType } from "@/types/testimonial";
import { createTestimonial, getSignedUrl, uploadFile } from "@/lib/api";
import Image from "next/image";

interface VideoUploaderProps {
  spaceId: string;
  language: Language;
  logo: string | null;
  headerTitle: string;
  questions: { id: string; content: string }[];
  extraInformationFields: ExtraInformationField[];
  collectStarRatings: boolean;
  logoShape: boolean;
  maxVideoDuration: number;
  consentDisplay: string;
  consentStatement: string;
  videoSubmissionTitle: string;
  onSuccess: () => void;
}

export default function VideoUploader({
  spaceId,
  language,
  logo,
  headerTitle,
  questions,
  extraInformationFields,
  collectStarRatings,
  logoShape,
  maxVideoDuration,
  consentDisplay,
  consentStatement,
  videoSubmissionTitle,
  onSuccess,
}: VideoUploaderProps) {
  const { t, i18n } = useTranslation("common");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [extraInfo, setExtraInfo] = useState<ExtraInformationItem[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(maxVideoDuration * 60);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extraFields = extraInformationFields.filter((field) => field.isEnabled);

  console.log("remainingTime", remainingTime);
  useEffect(() => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (recording && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0.1) {
            stopRecording();
            return 0;
          }
          return prevTime - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [recording, remainingTime]);

  const generateAvatar = useCallback((value: string) => {
    if (value && value.length > 0) {
      const initial = value.charAt(0).toUpperCase();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 200;
      canvas.height = 200;
  
      if (context) {
        context.fillStyle = "#4F46E5";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "bold 100px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(initial, canvas.width / 2, canvas.height / 2 + 10);
      }
  
      setAvatarPreview(canvas.toDataURL("image/png"));
    } else {
      setAvatarPreview(null);
    }
  }, []);

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startRecording = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
      }
      const recorder = new MediaRecorder(newStream, { mimeType: 'video/webm' });
      const chunks: Blob[] = [];
      const startTime = Date.now();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(videoBlob);

        if (videoRef.current) {
          const videoUrl = URL.createObjectURL(videoBlob);
          videoRef.current.srcObject = null;
          videoRef.current.src = videoUrl;
          videoRef.current.controls = true;
        }
      };

      recorder.start(1000); // Start recording, and dump data every second
      setMediaRecorder(recorder);
      setRecording(true);
      setRemainingTime(maxVideoDuration * 60);
    } catch (err) {
      console.error("Error accessing camera or microphone: ", err);
      toast.error(t("errors.cameraAccessFailed"));
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setRecording(false);
    }
  };

  const handleExtraInfoChange = (
    id: string,
    label: string,
    value: string | boolean
  ) => {
    setExtraInfo((prevInfo) => {
      const updatedInfo = prevInfo.map((item) =>
        item.id === id ? { ...item, value } : item
      );
      if (!updatedInfo.some((item) => item.id === id)) {
        updatedInfo.push({ id, label, value });
      }
      return updatedInfo;
    });

    if (typeof value === 'string') {
      const nameField = extraFields.find((field) => field.inputType === "text");
      if (nameField && id === nameField.id) {
        generateAvatar(value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoBlob) return;

    setIsUploading(true);

    const videoName = `video-${Date.now()}.webm`;
    const videoType = "video/webm";

    try {
      const signedUrl = await getSignedUrl(videoName, videoType, spaceId);
      let photoUrl: string | undefined;

      if (photo) {
        photoUrl = await uploadFile(photo, "photo");
      } else if (avatarPreview) {
        const response = await fetch(avatarPreview);
        const blob = await response.blob();
        const file = new File([blob], "avatar.png", { type: "image/png" });
        photoUrl = await uploadFile(file, "photo");
      }

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": videoType },
        body: videoBlob,
      });

      if (uploadResponse.ok) {
        const videoUrl = signedUrl.split("?")[0];
        const testimonialData: CreateTestimonialInput = {
          spaceId,
          type: TestimonialType.VIDEO,
          content: "",
          videoUrl,
          rating: collectStarRatings ? rating : undefined,
          photo: photoUrl,
          extraInformation: extraInfo,
          permissionGranted,
        };

        await createTestimonial(testimonialData);

        toast.success(t("success.testimonialSubmitted"));
        setVideoBlob(null);
        if (videoRef.current) {
          videoRef.current.src = "";
          videoRef.current.controls = false;
        }
        setRating(0);
        setExtraInfo([]);
        setPermissionGranted(false);
        onSuccess();
      } else {
        toast.error(t("errors.videoUploadFailed"));
      }
    } catch (error) {
      console.error("Error during video upload:", error);
      toast.error(t("errors.submissionFailed"));
    } finally {
      setIsUploading(false);
    }
  };

  const reRecord = () => {
    setVideoBlob(null);
    if (videoRef.current) {
      videoRef.current.src = "";
      videoRef.current.controls = false;
    }
    startRecording();
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
            {consentDisplay === "optional" && <span className="text-gray-400 ml-1">({t("labels.optional")})</span>}
          </Label>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 p-8 pt-2">
      <h2 className="text-2xl font-bold">{videoSubmissionTitle}</h2>
      <div className="text-center mt-0 mb-6 w-full">
        {logo && (
          <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden inline-flex justify-center rounded-md">
            <Image
              src={logo}
              alt={t("alt.logo")}
              width={96}
              height={96}
              style={{ objectFit: "cover" }}
              className={logoShape ? "rounded-lg" : "rounded-full"}
            />
          </div>
        )}
        <h3 className="text-2xl font-bold">{headerTitle}</h3>
      </div>

      <div className="mb-6 text-left w-full">
        <h4 className="text-lg font-semibold mb-2">{t("labels.questions")}</h4>
        <ul className="list-disc pl-5 space-y-2">
          {questions.map((question) => (
            <li key={question.id}>{question.content}</li>
          ))}
        </ul>
      </div>

      <div className="relative w-full max-w-[480px] h-[380px] overflow-hidden rounded-lg shadow-md border-4 border-white transition-all duration-300 ease-in-out">
        <video
          ref={videoRef}
          playsInline
          muted={recording}
          className="w-full h-full object-cover transition-all duration-300 ease-in-out"
        ></video>

        {recording && (
          <div className="absolute top-4 right-4 text-white px-3 py-1.5 rounded-md text-sm font-bold flex items-center transition-all duration-300 ease-in-out">
            <span className="relative inline-flex items-center justify-center w-4 h-4 mr-2">
              <span className="absolute inline-flex w-full h-full bg-red-500 opacity-75 rounded-full animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-red-600 rounded-full"></span>
            </span>
            <span className="text-xl font-bold tracking-wider uppercase mt-0.5">
               {formatTime(remainingTime)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4 transition-all duration-300 ease-in-out">
        {recording ? (
          <Button
            type="button"
            onClick={stopRecording}
            className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <FaStopCircle size={20} />
            <span>{t("buttons.stopRecording")}</span>
          </Button>
        ) : (
          <>
            {!videoBlob && (
              <Button
                type="button"
                onClick={startRecording}
                className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <FaVideo size={20} />
                <span>{t("buttons.startRecording")}</span>
              </Button>
            )}
          </>
        )}
      </div>

      {videoBlob && (
        <div className="space-y-4 text-left w-full">
          {collectStarRatings && (
            <div>
              <Label htmlFor="rating" className="text-black">
                {t("labels.rating")}
              </Label>
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
          {extraFields.map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id} className="text-black">
                {t(`extraFields.${field.id}`, field.label)}
                {field.isRequired && <span className="text-red-600 ml-1">*</span>}
              </Label>
              <Input
                id={field.id}
                type={field.inputType}
                name={field.id}
                required={field.isRequired}
                onChange={(e) =>
                  handleExtraInfoChange(field.id, t(`extraFields.${field.id}`, field.label), e.target.value)
                }
                className="bg-white text-black"
              />
            </div>
          ))}

          <div>
            <Label htmlFor="photo">{t("labels.uploadYourPhoto")}</Label>
            <div className="mt-2 flex items-center">
              <span className="rounded-full h-20 w-20 overflow-hidden bg-gray-300">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt={t("alt.preview")}
                    className="h-full w-full object-cover"
                  />
                ) : avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={t("alt.avatar")}
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
                  {t("buttons.chooseFile")}
                </label>
              </span>
            </div>
          </div>

          {renderConsentSection()}
          
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              type="button"
              onClick={reRecord}
              className="bg-yellow-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FaRedo size={20} />
              <span>{t("buttons.reRecord")}</span>
            </Button>

            <Button
              type="submit"
              disabled={isUploading}
              className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FaCloudUploadAlt size={20} />
              <span>{t("buttons.uploadVideo")}</span>
            </Button>
          </div>
          {isUploading && (
            <div className="flex flex-col items-center justify-center space-y-4 transition-all duration-300 ease-in-out">
              <svg
                className="animate-spin h-8 w-8 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <p className="text-black font-semibold">{t("labels.uploading")}</p>
            </div>
          )}
        </div>
      )}
      <Toaster position="top-center" richColors />
    </form>
  );
}