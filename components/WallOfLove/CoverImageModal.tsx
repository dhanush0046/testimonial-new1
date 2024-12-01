// // //components/CoverImageModal.tsx -- workings
// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Slider } from "@/components/ui/slider"
// import { Label } from "@/components/ui/label"
// import { WallOfLoveSettings } from '@/types/space'
// import { uploadFile } from '@/lib/api'
// import { X } from 'lucide-react'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { SketchPicker } from 'react-color';

// interface CoverImageModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onUpdate: (settings: Partial<WallOfLoveSettings>) => Promise<void>
//   currentSettings: WallOfLoveSettings
// }

// export default function CoverImageModal({
//   isOpen,
//   onClose,
//   onUpdate,
//   currentSettings
// }: CoverImageModalProps) {
//   const [coverImage, setCoverImage] = useState<File | null>(null)
//   const [coverImageDarkness, setCoverImageDarkness] = useState(currentSettings.coverImageDarkness)
//   const [topBannerTextColor, setTopBannerTextColor] = useState(currentSettings.topBannerTextColor || '#FFFFFF')
//   const [topBannerButtonColor, setTopBannerButtonColor] = useState(currentSettings.topBannerButtonColor || '#4F46E5')

//   const [imagePreview, setImagePreview] = useState<string | null>(currentSettings.coverImage || null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (coverImage) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string)
//       }
//       reader.readAsDataURL(coverImage)
//     } else {
//       setImagePreview(currentSettings.coverImage || null)
//     }
//   }, [coverImage, currentSettings.coverImage])

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setCoverImage(file)
//     }
//     e.target.value = '';
//   };

//   const handleUndoLogo = () => {
//     setCoverImage(null);
//     setImagePreview(null);
//   };

//   console.log("coverImage", coverImage)

//   const handleSave = async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       let coverImageUrl = currentSettings.coverImage
//       if (coverImage) {
//         coverImageUrl = await uploadFile(coverImage, 'coverImage')
//       }else if (!imagePreview) {
//         // Upload default cover image
//         const response = await fetch('/walloflove.jpg')
//         const blob = await response.blob()
//         const file = new File([blob], "default-cover-image.jpg", { type: blob.type })
//         coverImageUrl = await uploadFile(file, 'coverImage')
//       }

//       const updatedSettings: Partial<WallOfLoveSettings> = {
//         coverImage: coverImageUrl,
//         coverImageDarkness,
//         topBannerTextColor,
//         topBannerButtonColor
//       }

//       await onUpdate(updatedSettings)
//       onClose()
//     } catch (err) {
//       setError('Failed to update cover image settings. Please try again.')
//       console.error('Error updating cover image settings:', err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add a cover image</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-6 mt-2">
//           <div className="flex flex-col items-center">
//             <Label htmlFor="coverImage">Choose an image</Label>
//             <div className="mt-4 flex items-center">
//               <span className="h-24 w-40 rounded-md overflow-hidden bg-gray-100">
//                 {imagePreview ? (
//                   <Image
//                     src={imagePreview}
//                     alt="Cover image preview"
//                     width={160}
//                     height={96}
//                     className="h-full w-full object-cover"
//                   />
//                   ) : (
//                     <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
//                 )}
//               </span>
//               <span className="ml-5 rounded-md shadow-sm">
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   id="coverImage"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//                 <Label
//                   htmlFor="coverImage"
//                   className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium bg-gray-50 text-gray-600 hover:text-gray-700 focus:outline-none cursor-pointer"
//                 >
//                   Change
//                 </Label>
//               </span>
//               {imagePreview && (
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="ml-2"
//                       onClick={handleUndoLogo}
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
//             </div>
//             <p className="text-sm text-muted-foreground text-center mt-4">You can use any image, but our recommended size is 1200 x 600, and less than 5MB.</p>
//           </div>
//           <div className="py-2 cursor-pointer">
//             <Label>Darken cover image</Label>
//             <Slider
//               min={0}
//               max={100}
//               step={1}
//               value={[coverImageDarkness]}
//               onValueChange={([value]) => setCoverImageDarkness(value)}
//               className="mt-2"
//             />
//           </div>

//           <div className="flex items-center justify-between grid-cols-2 gap-4">
//             <div className="flex flex-col items-center">
//               <Label htmlFor="topBannerTextColor">Top banner text color</Label>
//               <Input
//                 id="topBannerTextColor"
//                 name='topBannerTextColor'
//                 type="color"
//                 value={topBannerTextColor}
//                 onChange={(e) => setTopBannerTextColor(e.target.value)}
//                 className="w-24 h-10 rounded-md mt-4 shadow-sm shadow-gray-500 hover:shadow-md hover:shadow-gray-600 transition-shadow"
//                 />
//             </div>
//             <div className="flex flex-col items-center">
//               <Label htmlFor="topBannerButtonColor">Top banner button color</Label>
//               <Input
//                 id="topBannerButtonColor"
//                 name='topBannerButtonColor'
//                 type="color"
//                 value={topBannerButtonColor}
//                 onChange={(e) => setTopBannerButtonColor(e.target.value)}
//                 className="w-24 h-10 rounded-md mt-4 shadow-sm shadow-gray-500 hover:shadow-md hover:shadow-gray-600 transition-shadow"
//                 />
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <div className="flex justify-center gap-3">
//             <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
//             <Button onClick={handleSave} disabled={isLoading}>
//               {isLoading ? 'Saving...' : 'Save'}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

//components/WallOfLove/CoverImageModal.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPrimitive } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { WallOfLoveSettings } from '@/types/space';
import { uploadFile } from '@/lib/api';
import { X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CompactPicker } from 'react-color';
import { ScrollArea } from "@/components/ui/scroll-area";

interface CoverImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (settings: Partial<WallOfLoveSettings>) => Promise<void>;
  currentSettings: WallOfLoveSettings;
}

export default function CoverImageModal({
  isOpen,
  onClose,
  onUpdate,
  currentSettings,
}: CoverImageModalProps) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageDarkness, setCoverImageDarkness] = useState(currentSettings.coverImageDarkness);
  const [topBannerTextColor, setTopBannerTextColor] = useState(currentSettings.topBannerTextColor || '#FFFFFF');
  const [topBannerButtonColor, setTopBannerButtonColor] = useState(currentSettings.topBannerButtonColor || '#4F46E5');
  const [imagePreview, setImagePreview] = useState<string | null>(currentSettings.coverImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (coverImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(coverImage);
    } else {
      setImagePreview(currentSettings.coverImage || null);
    }
  }, [coverImage, currentSettings.coverImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
    e.target.value = '';
  };

  const handleUndoLogo = () => {
    setCoverImage(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let coverImageUrl = currentSettings.coverImage;
      if (coverImage) {
        coverImageUrl = await uploadFile(coverImage, 'coverImage');
      } else if (!imagePreview) {
        const response = await fetch('/walloflove.jpg');
        const blob = await response.blob();
        const file = new File([blob], "default-cover-image.jpg", { type: blob.type });
        coverImageUrl = await uploadFile(file, 'coverImage');
      }

      const updatedSettings: Partial<WallOfLoveSettings> = {
        coverImage: coverImageUrl,
        coverImageDarkness,
        topBannerTextColor,
        topBannerButtonColor,
      };

      await onUpdate(updatedSettings);
      onClose();
    } catch (err) {
      setError('Failed to update cover image settings. Please try again.');
      console.error('Error updating cover image settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] px-6 py-4">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Add a Cover Image
          </DialogTitle>
        </DialogHeader>
          <div className="space-y-6 mt-4">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center">
              <Label
                htmlFor="coverImage"
                className="text-sm font-medium text-gray-700"
              >
                Choose an image
              </Label>
              <div className="mt-4 flex items-center">
                {/* Image Preview */}
                <div className="h-28 w-44 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Cover image preview"
                      width={176}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">No image selected</span>
                  )}
                </div>
                {/* Change and Undo Buttons */}
                <div className="ml-4 flex ">
                  <Input
                    type="file"
                    accept="image/*"
                    id="coverImage"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="coverImage"
                    className="mr-2 block py-2 px-4 text-sm font-medium text-gray-600 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none cursor-pointer"
                  >
                    Change
                  </Label>
                  {imagePreview && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className=" text-gray-600 hover:text-gray-700"
                            onClick={handleUndoLogo}
                          >
                            <X className="h-5 w-5" />
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
              <p className="text-xs text-gray-500 mt-4 text-center">
                Recommended size: 1200 x 600, less than 5MB.
              </p>
            </div>
    
            {/* Cover Image Darkness Slider */}
            <div>
              <Label
                htmlFor="coverImageDarkness"
                className="text-sm font-medium text-gray-700"
              >
                Darken Cover Image
              </Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[coverImageDarkness]}
                onValueChange={([value]) => setCoverImageDarkness(value)}
                className="mt-3"
              />
            </div>
    
            {/* Color Picker: Top Banner Text */}
            <div>
              <Label
                htmlFor="topBannerTextColor"
                className="text-sm font-medium text-gray-700"
              >
                Top Banner Text Color
              </Label>
              <div className="mt-2">
                <CompactPicker
                  color={topBannerTextColor}
                  onChange={(color) => setTopBannerTextColor(color.hex)}
                />
              </div>
            </div>
    
            {/* Color Picker: Top Banner Button */}
            <div>
              <Label
                htmlFor="topBannerButtonColor"
                className="text-sm font-medium text-gray-700"
              >
                Top Banner Button Color
              </Label>
              <div className="mt-2">
                <CompactPicker
                  color={topBannerButtonColor}
                  onChange={(color) => setTopBannerButtonColor(color.hex)}
                />
              </div>
            </div>
    
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
    
            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-2 text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2 text-sm"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}