// //components/TestimonialActions/EditTestimonialDialog.tsx --> Testing for generating.
// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { format } from "date-fns"
// import { CalendarIcon, X, ImagePlus } from 'lucide-react'
// import { cn } from "@/lib/utils"
// import Image from "next/image"
// import { Testimonial, TestimonialType } from "@/types/testimonial"
// import { ThumbnailSelector } from "@/components/TestimonialActions/ThumbnailSelector"

// interface EditTestimonialDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   testimonial: Testimonial
//   onUpdate: (updatedData: Testimonial) => Promise<void>
// }

// export function EditTestimonialDialog({
//   isOpen,
//   onClose,
//   testimonial,
//   onUpdate
// }: EditTestimonialDialogProps) {
//   const [formData, setFormData] = useState<Testimonial>(testimonial)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [previewUrls, setPreviewUrls] = useState<string[]>(testimonial.attachedImages || [])
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(testimonial.photo || null)
//   const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(testimonial.companyLogo || null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     setFormData(testimonial)
//     setPreviewUrls(testimonial.attachedImages || [])
//     setAvatarPreview(testimonial.photo || null)
//     setCompanyLogoPreview(testimonial.companyLogo || null)
//   }, [testimonial])

//   const handleChange = (field: keyof Testimonial, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   const handleThumbnailSelect = (thumbnailUrl: string) => {
//     handleChange('videoThumbnail', thumbnailUrl);
//   };

//   const handleExtraInfoChange = (id: string, value: string | boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       extraInformation: prev.extraInformation.map(item =>
//         item.id === id ? { ...item, value } : item
//       )
//     }))
//   }

//   const handleAttachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || [])
//     const newUrls = files.map(file => URL.createObjectURL(file))
//     setPreviewUrls(prev => [...prev, ...newUrls])
//     handleChange('attachedImages', [...formData.attachedImages, ...newUrls])
//   }

//   const handleRemoveImage = (index: number) => {
//     setPreviewUrls(prev => prev.filter((_, i) => i !== index))
//     handleChange('attachedImages', formData.attachedImages.filter((_, i) => i !== index))
//   }

//   const handleClearAll = () => {
//     setPreviewUrls([])
//     handleChange('attachedImages', [])
//   }

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const previewUrl = URL.createObjectURL(file)
//       setAvatarPreview(previewUrl)
//       handleChange('photo', file)
//     }
//     e.target.value = ''
//   }

//   const handleUndoAvatar = () => {
//     handleChange('photo', null)
//     setAvatarPreview(null)
//   }

//   const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const previewUrl = URL.createObjectURL(file)
//       setCompanyLogoPreview(previewUrl)
//       handleChange('companyLogo', file)
//     }
//     e.target.value = ''
//   }

//   const handleUndoCompanyLogo = () => {
//     handleChange('companyLogo', null)
//     setCompanyLogoPreview(null)
//   }

//   const handleSubmit = async () => {
//     try {
//       setIsSubmitting(true)
//       await onUpdate(formData)
//       onClose()
//     } catch (error) {
//       console.error('Error updating testimonial:', error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Edit the testimonial</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               value={formData.extraInformation.find(item => item.id === 'name')?.value.toString() || ''}
//               onChange={(e) => handleExtraInfoChange('name', e.target.value)}
//             />
//           </div>
//           {testimonial.type === TestimonialType.TEXT && (
//             <div className="grid gap-2">
//               <Label htmlFor="testimonial">Testimonial</Label>
//               <Textarea
//                 id="testimonial"
//                 value={formData.content}
//                 onChange={(e) => handleChange('content', e.target.value)}
//                 rows={4}
//               />
//             </div>
//           )}

//           {testimonial.type === TestimonialType.VIDEO && (
//             <div className="grid gap-2">
//               <ThumbnailSelector
//                 videoUrl={formData.videoUrl || ''}
//                 onSelect={handleThumbnailSelect}
//                 selectedThumbnail={formData.videoThumbnail || null}
//               />
//             </div>
//           )}

//           {testimonial.type === TestimonialType.VIDEO && (
//             <div className="grid gap-2">
//               <Label htmlFor="excerpt">Excerpt</Label>
//               <Textarea
//                 id="excerpt"
//                 value={formData.excerpt}
//                 onChange={(e) => handleChange('excerpt', e.target.value)}
//                 rows={4}
//               />
//             </div>
//           )}

//           <div className="grid gap-2">
//             <Label htmlFor="avatar" className="text-gray-700 text-sm font-medium mb-1">Update avatar</Label>
//             <div className="flex items-center gap-4">
//               <span className="h-12 w-12 overflow-hidden bg-gray-100 rounded-full">
//                  {avatarPreview ? (
//                     <Image
//                       src={avatarPreview}
//                       alt="Avatar preview"
//                       width={48}
//                       height={48}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
//                   )}
//                 </span>
//                 <span className="rounded-md shadow-sm">
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     name="avatar"
//                     id="avatar"
//                     onChange={handleAvatarChange}
//                     className="hidden"
//                   />
//                   <Label
//                     htmlFor="avatar"
//                     className="py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//                   >
//                     Change
//                   </Label>
//                 </span>
//                 {avatarPreview && (
//                   <Button variant="ghost" size="sm" onClick={handleUndoAvatar}>
//                     <X className="h-5 w-5 text-gray-600 hover:text-gray-700" />
//                   </Button>
//                 )}
//             </div>
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="titleAndCompany">Title and company</Label>
//             <Input
//               id="titleAndCompany"
//               value={formData.extraInformation.find(item => item.id === 'title,company')?.value.toString() || ''}
//               onChange={(e) => handleExtraInfoChange('title,company', e.target.value)}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="companyLink">Company link</Label>
//             <div className="flex gap-2">
//               <span className="flex items-center bg-muted px-2 rounded-l-md">https://</span>
//               <Input
//                 id="companyLink"
//                 value={formData.companyLink?.replace('https://', '') || ''}
//                 onChange={(e) => handleChange('companyLink', `https://${e.target.value}`)}
//                 className="rounded-l-none"
//               />
//             </div>
//           </div>
//           {testimonial.type === TestimonialType.TEXT && (
//           <div className="w-full">
//             <Label
//               className="text-sm text-gray-700"
//               htmlFor="multiple-image-select"
//             >
//               Attached images
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
//                     ref={fileInputRef}
//                   />
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     Choose files
//                   </Button>
//                 </span>
//                 {previewUrls.length > 0 && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleClearAll}
//                   >
//                     Remove all
//                   </Button>
//                 )}
//               </div>

//               {previewUrls.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {previewUrls.map((url, index) => (
//                     <div
//                       key={index}
//                       className="relative"
//                       style={{ width: "70px", height: "70px" }}
//                     >
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         className="absolute -top-2 -right-2 w-6 h-6 rounded-full z-10"
//                         onClick={() => handleRemoveImage(index)}
//                       >
//                         <X className="h-5 w-5 text-white" />
//                       </Button>
//                       <Image
//                         src={url}
//                         alt={`Attached ${index + 1}`}
//                         width={70}
//                         height={70}
//                         className="rounded-md object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           )}
//           {testimonial.type === TestimonialType.TEXT && (
//           <div className="grid gap-2">
//             <Label htmlFor="companyLogo" className="text-gray-700 text-sm font-medium mb-1">Company logo</Label>
//             <div className="flex items-center gap-4">
//               <span className="h-12 w-12 overflow-hidden bg-gray-100 rounded-full">
//                 {companyLogoPreview ? (
//                   <Image
//                     src={companyLogoPreview}
//                     alt="Company logo"
//                     width={48}
//                     height={48}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
//                 )}
//               </span>
//               <span className="rounded-md shadow-sm">
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   name="companyLogo"
//                   id="companyLogo"
//                   onChange={handleCompanyLogoChange}
//                   className="hidden"
//                 />
//                 <Label
//                   htmlFor="companyLogo"
//                   className="py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//                 >
//                   Change
//                 </Label>
//               </span>
//               {companyLogoPreview && (
//                 <Button variant="ghost"size="sm" onClick={handleUndoCompanyLogo}>
//                 <X className="h-5 w-5 text-gray-600 hover:text-gray-700" />
//               </Button>
//               )}
//             </div>
//           </div>
//           )}

//           <div className="grid gap-2">
//             <Label htmlFor="socialLink">Social link</Label>
//             <div className="flex gap-2">
//               <span className="flex items-center bg-muted px-2 rounded-l-md">https://</span>
//               <Input
//                 id="socialLink"
//                 value={formData.extraInformation.find(item => item.id === 'social link')?.value.toString().replace('https://', '') || ''}
//                 onChange={(e) => handleExtraInfoChange('social link', `https://${e.target.value}`)}
//                 className="rounded-l-none"
//               />
//             </div>
//           </div>
//           {testimonial.type === TestimonialType.TEXT && (
//           <div className="grid gap-2">
//             <Label htmlFor="readMoreLink">Read more link</Label>
//             <div className="flex gap-2">
//               <span className="flex items-center bg-muted px-2 rounded-l-md">https://</span>
//               <Input
//                 id="readMoreLink"
//                 value={formData.readMoreLink?.replace('https://', '') || ''}
//                 onChange={(e) => handleChange('readMoreLink', `https://${e.target.value}`)}
//                 className="rounded-l-none"
//               />
//             </div>
//           </div>
//           )}

//           {testimonial.type === TestimonialType.VIDEO && (
//             <div className="grid gap-2">
//               <Label htmlFor="internalComments">Internal comments</Label>
//               <Input
//                 id="internalComments"
//                 value={formData.internalComments}
//                 onChange={(e) => handleChange('internalComments', e.target.value)}
//               />
//             </div>
//           )}

//           <div className="grid gap-2">
//             <Label>Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className={cn(
//                     "justify-start text-left font-normal",
//                     !formData.createdAt && "text-muted-foreground"
//                   )}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {formData.createdAt ? format(new Date(formData.createdAt), "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={new Date(formData.createdAt)}
//                   onSelect={(date) => handleChange('createdAt', date?.toISOString())}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={isSubmitting}>
//             {isSubmitting ? "Updating..." : "Update the testimonial"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

//components/TestimonialActions/EditTestimonialDialog.tsx --> Testing for generating.

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPrimitive, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar, CalendarIcon, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Testimonial, TestimonialType, ExtraInformationItem } from "@/types/testimonial"
import { ThumbnailSelector } from "@/components/TestimonialActions/ThumbnailSelector"
import { putTestimonial } from "@/lib/dashboardApi"
import { uploadFile } from "@/lib/api"
import { DayPicker } from "react-day-picker"
import classNames from "react-day-picker/style.module.css";

interface EditTestimonialDialogProps {
  isOpen: boolean
  onClose: () => void
  testimonial: Testimonial
  onUpdate: (id: string, data: Testimonial) => void
}

export function EditTestimonialDialog({
  isOpen,
  onClose,
  testimonial,
  onUpdate
}: EditTestimonialDialogProps) {
  const [formData, setFormData] = useState<Testimonial>(testimonial)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(testimonial.companyLogo || null)

  const [updatePhoto, setUpdatePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(testimonial.photo || null)

  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreview, setAttachmentPreview] = useState<string[]>(testimonial.attachedImages || [])

  const [videoThumbnail, setVideoThumbnail] = useState<File | null>(null);  

  const fileInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const companyLogoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setFormData(testimonial);
      setAttachmentPreview(testimonial.attachedImages || []);
      setPhotoPreview(testimonial.photo || null);
      setCompanyLogoPreview(testimonial.companyLogo || null);
    }
  }, [isOpen, testimonial]);

  const handleChange = (field: keyof Testimonial, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleExtraInfoChange = useCallback((id: string, label: string, value: string) => {
    setFormData((prevData) => {
      const updatedExtraInfo = [...prevData.extraInformation];
      const existingIndex = updatedExtraInfo.findIndex((item) => item.id === id);
  
      if (existingIndex !== -1) {
        updatedExtraInfo[existingIndex] = { ...updatedExtraInfo[existingIndex], value };
      } else {
        updatedExtraInfo.push({ id, label, value });
      }
  
      return {
        ...prevData,
        extraInformation: updatedExtraInfo,
      };
    });
  }, []);

  const getExtraInfoValue = (id: string) => {
    return formData.extraInformation.find(item => item.id === id)?.value?.toString() || '';
  };

  const handleAttachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setAttachmentPreview(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    const updatedPreviews = attachmentPreview.filter((_, i) => i !== index);

    setAttachments(updatedAttachments);
    setAttachmentPreview(updatedPreviews);
  };

  const handleClearAll = () => {
    setAttachments([]);
    setAttachmentPreview([]);
  };

  const  handlePhotoChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUpdatePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUndoPhoto = () => {
    handleChange('photo', null)
    setPhotoPreview(null)
  }

  const handleCompanyLogoChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCompanyLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogoPreview(reader.result as string)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUndoCompanyLogo = () => {
    handleChange('companyLogo', null)
    setCompanyLogoPreview(null)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      let photoUrl: string | undefined;
      let attachedImageUrls: string[] = [];
      let companyLogoUrl: string | undefined;
      let thumbnailUrl: string | undefined;

      if (videoThumbnail instanceof File) {
        thumbnailUrl = await uploadFile(videoThumbnail, "thumbnail");
      }

      if (companyLogo instanceof File) {
        companyLogoUrl = await uploadFile(companyLogo, "companyLogo");
      }

      if (updatePhoto instanceof File) {
        photoUrl = await uploadFile(updatePhoto, "photo");
      }

      for (const attachment of attachments) {
        if (attachment instanceof File) {
          const attachmentUrl = await uploadFile(attachment, "attachment");
          attachedImageUrls.push(attachmentUrl);
        } else {
          attachedImageUrls.push(attachment);
        }
      }

      const updatedTestimonial: Testimonial = {
        ...formData,
        photo: photoUrl || formData.photo,
        companyLogo: companyLogoUrl || formData.companyLogo,
        attachedImages: attachedImageUrls,
        videoThumbnail: thumbnailUrl || formData.videoThumbnail,
      };
      await putTestimonial(testimonial.id, updatedTestimonial)
      onUpdate(testimonial.id, updatedTestimonial)
      onClose()
    } catch (error) {
      console.error('Error updating testimonial:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
const handleThumbnailSelect = (file: File | string) => { 
  if(typeof file === 'string'){
    // setVideoThumbnail(file);
  }else{
    setVideoThumbnail(file);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <DialogHeader>
          <DialogTitle>Edit the testimonial</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-muted-foreground">
          You can edit the testimonial details here.
        </DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={getExtraInfoValue('name')}
              onChange={(e) => handleExtraInfoChange('name', 'Name', e.target.value)}
            />
          </div>
          {testimonial.type === TestimonialType.TEXT && (
            <div className="grid gap-2">
              <Label htmlFor="testimonial">Testimonial</Label>
              <Textarea
                id="testimonial"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={4}
              />  
            </div>  
          )}

          {testimonial.type === TestimonialType.VIDEO && (
            <div className="grid gap-2">
              <ThumbnailSelector
                videoUrl={formData.videoUrl || ''}
                videoDuration={formData.videoDuration || 0}
                videoThumbnail={formData.videoThumbnail || null}
                onSelect={handleThumbnailSelect}
                selectedThumbnail={videoThumbnail || null }
              />
            </div>
          )}

          {testimonial.type === TestimonialType.VIDEO && (
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                value={formData.excerpt || ''} 
                onChange={(e) => handleChange('excerpt', e.target.value)}
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="avatar" className="text-gray-700 text-sm font-medium mb-1">Update avatar</Label>
            <div className="flex items-center gap-4">
              <span className="h-12 w-12 overflow-hidden bg-gray-100 rounded-full">
                 {photoPreview ? (
                    <Image
                      src={photoPreview} alt="Avatar preview" width={48} height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
                  )}
                </span>
                <span className="rounded-md shadow-sm">
                  <Input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    id="avatar"
                    onChange={handlePhotoChange}
                    className="hidden"
                    ref={photoInputRef}
                  />
                  <Label
                    htmlFor="avatar"
                    className="py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
                  >
                    Change
                  </Label>
                </span>
                {photoPreview && (
                  <Button variant="ghost" size="sm" onClick={handleUndoPhoto}>
                    <X className="h-5 w-5 text-gray-600 hover:text-gray-700" />
                  </Button>
                )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="titleAndCompany">Title and company</Label>
            <Input
              id="title,company"
              value={getExtraInfoValue('title,company')}
              onChange={(e) => handleExtraInfoChange('title,company', 'Title and company', e.target.value)}            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="companyLink">Company link</Label>
            <div className="flex gap-2">
              <span className="flex items-center bg-muted px-2 rounded-l-md">https://</span>
              <Input
                id="companyLink"
                value={formData.companyLink?.replace('https://', '') || ''}
                onChange={(e) => handleChange('companyLink', `https://${e.target.value}`)}
                className="rounded-l-none"
              />
            </div>
          </div>
          {testimonial.type === TestimonialType.TEXT && (
            <div className="w-full">
              <Label
                className="text-sm text-gray-700"
                htmlFor="multiple-image-select"
              >
                Attached images
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
                      ref={fileInputRef}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose files
                    </Button>
                  </span>
                  {attachmentPreview.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearAll}
                    >
                      Remove all
                    </Button>
                  )}
                </div>

                {attachmentPreview.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {attachmentPreview.map((url, index) => (
                      <div
                        key={index}
                        className="relative"
                        style={{ width: "70px", height: "70px" }}
                      >
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full z-10"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-5 w-5 text-white" />
                        </Button>
                        <Image
                          src={url}
                          alt={`Attached ${index + 1}`}
                          width={70}
                          height={70}
                          className="rounded-md object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {testimonial.type === TestimonialType.TEXT && (
            <div className="grid gap-2">
              <Label
                htmlFor="companyLogo"
                className="text-gray-700 text-sm font-medium mb-1"
              >
                Company logo
              </Label>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 overflow-hidden bg-gray-100 rounded-full">
                  {companyLogoPreview ? (
                    <Image
                      src={companyLogoPreview}
                      alt="Company logo"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
                  )}
                </span>
                <span className="rounded-md shadow-sm">
                  <Input
                    type="file"
                    accept="image/*"
                    name="companyLogo"
                    id="companyLogo"
                    onChange={handleCompanyLogoChange}
                    className="hidden"
                    ref={companyLogoInputRef}
                  />
                  <Label
                    htmlFor="companyLogo"
                    className="py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
                  >
                    Change
                  </Label>
                </span>
                {companyLogoPreview && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUndoCompanyLogo}
                  >
                    <X className="h-5 w-5 text-gray-600 hover:text-gray-700" />
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="socialLink">Social link</Label>
            <div className="flex gap-2">
              <span className="flex items-center bg-muted px-2 rounded-l-md">https://</span>
              <Input
                id="social link"
                value={getExtraInfoValue('social link').replace('https://', '')}
                onChange={(e) => handleExtraInfoChange('social link', 'Social link', `https://${e.target.value}`)}              />
            </div>
          </div>
          {testimonial.type === TestimonialType.TEXT && (
            <div className="grid gap-2">
              <Label htmlFor="readMoreLink">Read more link</Label>
              <div className="flex gap-2">
                <span className="flex items-center bg-muted px-2 rounded-l-md">https://</span>
                <Input
                  id="readMoreLink"
                  value={formData.readMoreLink?.replace('https://', '') || ''}
                  onChange={(e) => handleChange('readMoreLink', `https://${e.target.value}`)}
                  className="rounded-l-none"
                />
              </div>
            </div>
          )}

          {testimonial.type === TestimonialType.VIDEO && (
            <div className="grid gap-2">
              <Label htmlFor="internalComments">Internal comments</Label>
              <Input
                id="internalComments"
                value={formData.internalComments || ''}
                onChange={(e) => handleChange('internalComments', e.target.value)}
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !formData.createdAt && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.createdAt ? format(new Date(formData.createdAt), "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4">
                <DayPicker
                  classNames={classNames}
                  className="w-full"
                  mode="single"
                  selected={formData.createdAt ? new Date(formData.createdAt) : undefined}
                  onSelect={(date) => handleChange('createdAt', date?.toISOString())}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update the testimonial"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}