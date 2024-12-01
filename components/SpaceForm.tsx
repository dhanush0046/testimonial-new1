// //components/SpaceForm.tsx - working befor lan
// import React, { useState, useEffect } from 'react';
// import { CreateSpaceInput, ExtraInformationField, CollectionType, Theme, Language, Question } from '@/types/space';
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Switch } from "@/components/ui/switch"
// import { ChevronDown, Trash2, Lock, X } from 'lucide-react';
// import Image from "next/image";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// interface SpaceFormProps {
//   spaceData: CreateSpaceInput;
//   onSpaceDataChange: (newData: Partial<CreateSpaceInput>) => void;
//   isEditing?: boolean;
// }

// export default function SpaceForm({ spaceData, onSpaceDataChange, isEditing = false }: SpaceFormProps) { 
//   const [logoPreview, setLogoPreview] = useState<string | null>(null);
//   const [newExtraField, setNewExtraField] = useState('');
//   const [newExtraFieldType, setNewExtraFieldType] = useState<ExtraInformationField['inputType']>('text');

//   const defaultFields = spaceData.extraInformationFields.filter(field => !field.isEditable || field.isEditable);
//   const customFields = spaceData.extraInformationFields.filter(field => field.isEditable);

//   useEffect(() => {
//     if (spaceData.logo instanceof File) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogoPreview(reader.result as string);
//       };
//       reader.readAsDataURL(spaceData.logo);
//     } else if (typeof spaceData.logo === 'string') {
//       setLogoPreview(spaceData.logo);
//     }
//   }, [spaceData.logo]);

//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onSpaceDataChange({ logo: file });
//     }
//   };

//   const handleUndoLogo = () => {
//     onSpaceDataChange({ logo: null });
//     setLogoPreview(null);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     onSpaceDataChange({ [name]: value });
//   };

//   const handleQuestionChange = (index: number, value: string) => {
//     const updatedQuestions = [...spaceData.questions];
//     updatedQuestions[index] = { ...updatedQuestions[index], content: value };
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleAddQuestion = () => {
//     if (spaceData.questions.length < 5) {
//       const newId = `q${spaceData.questions.length + 1}`;
//       onSpaceDataChange({ questions: [...spaceData.questions, { id: newId, content: '' }] });
//     }
//   };

//   const handleRemoveQuestion = (id: string) => {
//     const updatedQuestions = spaceData.questions.filter(q => q.id !== id);
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleExtraInfoChange = (field: ExtraInformationField) => {
//     let updatedExtraInfo = [...spaceData.extraInformationFields];
//     const existingFieldIndex = updatedExtraInfo.findIndex(f => f.id === field.id);
//     if (existingFieldIndex === -1) {
//       updatedExtraInfo.push(field);
//     } else {
//       updatedExtraInfo[existingFieldIndex] = { ...updatedExtraInfo[existingFieldIndex], isEnabled: !updatedExtraInfo[existingFieldIndex].isEnabled };
//     }
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   const handleExtraInfoRequiredChange = (id: string, isRequired: boolean) => {
//     const updatedExtraInfo = spaceData.extraInformationFields.map(field => 
//       field.id === id ? { ...field, isRequired } : field
//     );
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   const handleAddExtraField = () => {
//     if (newExtraField && customFields.length < 10) {
//       const newField: ExtraInformationField = {
//         id: newExtraField.toLowerCase().replace(/\s+/g, '-'),
//         label: newExtraField,
//         inputType: newExtraFieldType,
//         isRequired: false,
//         isEditable: true,
//         isEnabled: true
//       };
//       const updatedExtraInfo = [...spaceData.extraInformationFields, newField];
//       onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//       setNewExtraField('');
//       setNewExtraFieldType('text');
//     }
//   };

//   const handleRemoveExtraField = (fieldId: string) => {
//     const updatedExtraInfo = spaceData.extraInformationFields.filter(field => field.id !== fieldId);
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   return (
//     <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         {isEditing ? "Edit Space" : "Create a new Space"}
//       </h2>
//       <p className="text-gray-600 mb-6 text-center">
//         {isEditing ? "Update your space settings" : "Create a new space to collect testimonials"}   
//       </p>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="spaceName">Space name <span className="text-red-600">*</span></Label>
//           <Input
//             id="spaceName"
//             name="spaceName"
//             required
//             value={spaceData.spaceName}
//             onChange={handleInputChange}
//             placeholder="Enter space name"
//           />
//           <p className="text-sm text-gray-500">Public URL: testimonial.to/{spaceData.spaceName}</p>
//         </div>

//         <div className="w-full">
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="logo">
//             Space logo 
//             <div className="relative flex rounded-md items-start my-auto ml-2">
//               <div className="flex items-center h-5 my-auto">
//                 <Checkbox
//                   id="logoShape"
//                   checked={spaceData.logoShape}
//                   onCheckedChange={(checked) => onSpaceDataChange({ logoShape: checked as boolean })}
//                 />
//               </div>
//               <div className="ml-1 leading-5 my-auto">
//                 <Label htmlFor="logoShape" className="text-gray-600 text-sm">square?</Label>
//               </div>
//             </div>
//           </Label>
//           <div className="mt-2 flex items-center">
//             <span className={`h-12 w-12 overflow-hidden bg-gray-100 ${spaceData.logoShape ? 'rounded-lg' : 'rounded-full'}`}>
//               {logoPreview ? (
//                 <Image
//                   src={logoPreview}
//                   alt="Logo preview"
//                   width={48}
//                   height={48}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
//               )}
//             </span>
//             <span className="ml-5 rounded-md shadow-sm">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 name="logo"
//                 id="logo"
//                 onChange={handleLogoChange}
//                 className="hidden"
//               />
//               <Label
//                 htmlFor="logo"
//                 className="py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//               >
//                 Change
//               </Label>
//             </span>
//             {logoPreview && (
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
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="headerTitle">Header title <span className="text-red-600">*</span></Label>
//           <Input
//             id="headerTitle"
//             name="headerTitle"
//             required
//             value={spaceData.headerTitle}
//             onChange={handleInputChange}
//             placeholder="Enter header title"
//           />
//         </div>

//         <div>
//           <Label htmlFor="customMessage">Your custom message <span className="text-red-600">*</span></Label>
//           <Textarea
//             id="customMessage"
//             name="customMessage"
//             required
//             value={spaceData.customMessage}
//             onChange={handleInputChange}
//             placeholder="Enter your custom message"
//             rows={3}
//           />
//         </div>

//         <div>
//           <Label>Questions</Label>
//           {spaceData.questions.map((question, index) => (
//             <div key={question.id} className="flex items-center mt-2">
//               <Input
//                 value={question.content}
//                 onChange={(e) => handleQuestionChange(index, e.target.value)}
//                 maxLength={100}
//               />
//               <span className="ml-2 text-sm text-gray-500">{100 - question.content.length}/100</span>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => handleRemoveQuestion(question.id)}
//                 className="ml-2"
//               >
//                 <Trash2/>
//               </Button>
//             </div>
//           ))}
//           {spaceData.questions.length < 5 && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleAddQuestion}
//               className="mt-2"
//             >
//               Add one (up to 5)
//             </Button>
//           )}
//         </div>

//         <div>
//           <Label>Collect extra information</Label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className="w-full justify-between">
//                 Name, email, title, social link, etc.
//                 <ChevronDown className="h-4 w-4 opacity-50" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                 {defaultFields.map((field) => (
//                     <div key={field.id} className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id={field.id}
//                           checked={field.isEnabled}
//                           onCheckedChange={() => handleExtraInfoChange(field)}
//                           disabled={!field.isEditable}
//                         />
//                         <Label htmlFor={field.id}>{field.label}</Label>
//                         {!field.isEditable && <Lock className="h-4 w-4 text-gray-400" />}
//                       </div>
//                       {field.isEnabled && (
//                         <div className="flex items-center space-x-2">
//                           <Label htmlFor={`${field.id}-required`}>Required?</Label>
//                           <Switch
//                             id={`${field.id}-required`}
//                             checked={field.isRequired}
//                             onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked)}
//                             disabled={!field.isEditable}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   <Label>Create your own fields</Label>
//                   {spaceData.extraInformationFields.map((field) => {
//                     // Check if the field is a custom field (not already included)
//                     if (!['name', 'email', 'title,company', 'social link','address'].includes(field.id)) {
//                       return (
//                         <div key={field.label} className="flex items-center justify-between mt-2">
//                           <span>{field.label} ({field.inputType})</span>
//                           <div className="flex items-center space-x-2">
//                             <Label htmlFor={`${field.id}-required`}>Required?</Label>
//                             <Switch
//                               id={`${field.id}-required`}
//                               checked={field.isRequired}
//                               onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked)}
//                             />
//                             <Button size="sm" variant="ghost" onClick={() => handleRemoveExtraField(field.id)}>
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       );
//                     }
//                     return null; // Don't render anything for pre-defined fields
//                   })}
//                   <div className="flex items-center space-x-2 mt-2">
//                     <Input
//                       placeholder="Add custom field"
//                       value={newExtraField}
//                       onChange={(e) => setNewExtraField(e.target.value)}
//                     />
//                     <Select value={newExtraFieldType} onValueChange={(value) => setNewExtraFieldType(value as ExtraInformationField['inputType'])}>
//                       <SelectTrigger className="w-[100px]">
//                         <SelectValue placeholder="Type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="text">Text</SelectItem>
//                         <SelectItem value="email">Email</SelectItem>
//                         <SelectItem value="checkbox">Checkbox</SelectItem>
//                         <SelectItem value="link">Link</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <Button onClick={handleAddExtraField}>Add</Button>
//                   </div>
//                 </div>
//               </div>
//             </PopoverContent>
//           </Popover>
//         </div>

//         <div>
//           <Label htmlFor="collectionType">Collection type</Label>
//           <Select
//             value={spaceData.collectionType}
//             onValueChange={(value) => onSpaceDataChange({ collectionType: value as CollectionType })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select collection type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value={CollectionType.TEXT_AND_VIDEO}>Text and video</SelectItem>
//               <SelectItem value={CollectionType.TEXT_ONLY}>Text only</SelectItem>
//               <SelectItem value={CollectionType.VIDEO_ONLY}>Video only</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>


//         <div className='flex items-center space-x-2'>
//           <div className="flex items-center space-x-2 mr-10">
//             <Label htmlFor="collectStarRatings">Collect star ratings</Label>
//             <Switch
//               id="collectStarRatings"
//               checked={spaceData.collectStarRatings}
//               onCheckedChange={(checked) => 
//                 onSpaceDataChange({ collectStarRatings: checked })
//               }
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <Label htmlFor="theme">Choose a theme</Label>
//             <Switch
//               id="theme"
//               checked={spaceData.theme === Theme.DARK}
//               onCheckedChange={(checked) => 
//                 onSpaceDataChange({ theme: checked ? Theme.DARK : Theme.LIGHT })
//               }
//             />
//             <span>{spaceData.theme === Theme.DARK ? 'Dark' : 'Light'}</span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="language">Language</Label>
//           <Select
//             value={spaceData.language}
//             onValueChange={(value) => onSpaceDataChange({ language: value as Language })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value={Language.ENGLISH}>English</SelectItem>
//               <SelectItem value={Language.SPANISH}>Spanish</SelectItem>
//               <SelectItem  value={Language.FRENCH}>French</SelectItem>
//               <SelectItem value={Language.GERMAN}>German</SelectItem>
//               <SelectItem value={Language.CHINESE}>Chinese</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="autoTranslate"
//             checked={spaceData.autoTranslate}
//             onCheckedChange={(checked) => 
//               onSpaceDataChange({ autoTranslate: checked as boolean })
//             }
//           />
          
//           <Label htmlFor="autoTranslate">Auto translate to other languages?</Label>
//         </div>
//       </div>
//     </div>
//   );
// }

// //components/SpaceForm.tsx 
// import React, { useState, useEffect } from 'react';
// import { CreateSpaceInput, ExtraInformationField, CollectionType, Theme, Language, Question } from '@/types/space';
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Switch } from "@/components/ui/switch"
// import { ChevronDown, Trash2, Lock, X } from 'lucide-react';
// import Image from "next/image";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { translateText, translateSpaceData } from '@/lib/translate';
// interface SpaceFormProps {
//   spaceData: CreateSpaceInput;
//   onSpaceDataChange: (newData: Partial<CreateSpaceInput>) => void;
//   isEditing?: boolean;
// }

// export default function SpaceForm({ spaceData, onSpaceDataChange, isEditing = false }: SpaceFormProps) { 
//   const [logoPreview, setLogoPreview] = useState<string | null>(null);
//   const [newExtraField, setNewExtraField] = useState('');
//   const [newExtraFieldType, setNewExtraFieldType] = useState<ExtraInformationField['inputType']>('text');

//   const defaultFields = spaceData.extraInformationFields.filter(field => !field.isEditable || field.isEditable);
//   const customFields = spaceData.extraInformationFields.filter(field => field.isEditable);

//   useEffect(() => {
//     if (spaceData.logo instanceof File) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogoPreview(reader.result as string);
//       };
//       reader.readAsDataURL(spaceData.logo);
//     } else if (typeof spaceData.logo === 'string') {
//       setLogoPreview(spaceData.logo);
//     }
//   }, [spaceData.logo]);

//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onSpaceDataChange({ logo: file });
//     }
//   };

//   const handleUndoLogo = () => {
//     onSpaceDataChange({ logo: null });
//     setLogoPreview(null);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     onSpaceDataChange({ [name]: value });
//   };

//   const handleQuestionChange = (index: number, value: string) => {
//     const updatedQuestions = [...spaceData.questions];
//     updatedQuestions[index] = { ...updatedQuestions[index], content: value };
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleAddQuestion = () => {
//     if (spaceData.questions.length < 5) {
//       const newId = `q${spaceData.questions.length + 1}`;
//       onSpaceDataChange({ questions: [...spaceData.questions, { id: newId, content: '' }] });
//     }
//   };

//   const handleRemoveQuestion = (id: string) => {
//     const updatedQuestions = spaceData.questions.filter(q => q.id !== id);
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleExtraInfoChange = (field: ExtraInformationField) => {
//     let updatedExtraInfo = [...spaceData.extraInformationFields];
//     const existingFieldIndex = updatedExtraInfo.findIndex(f => f.id === field.id);
//     if (existingFieldIndex === -1) {
//       updatedExtraInfo.push(field);
//     } else {
//       updatedExtraInfo[existingFieldIndex] = { ...updatedExtraInfo[existingFieldIndex], isEnabled: !updatedExtraInfo[existingFieldIndex].isEnabled };
//     }
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   const handleExtraInfoRequiredChange = (id: string, isRequired: boolean) => {
//     const updatedExtraInfo = spaceData.extraInformationFields.map(field => 
//       field.id === id ? { ...field, isRequired } : field
//     );
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   const handleAddExtraField = () => {
//     if (newExtraField && customFields.length < 10) {
//       const newField: ExtraInformationField = {
//         id: newExtraField.toLowerCase().replace(/\s+/g, '-'),
//         label: newExtraField,
//         inputType: newExtraFieldType,
//         isRequired: false,
//         isEditable: true,
//         isEnabled: true
//       };
//       const updatedExtraInfo = [...spaceData.extraInformationFields, newField];
//       onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//       setNewExtraField('');
//       setNewExtraFieldType('text');
//     }
//   };

//   const handleRemoveExtraField = (fieldId: string) => {
//     const updatedExtraInfo = spaceData.extraInformationFields.filter(field => field.id !== fieldId);
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   const handleLanguageChange = async (newLanguage: Language) => {
//     onSpaceDataChange({ language: newLanguage });
//     if (spaceData.autoTranslate) {
//       const translatedData = await translateSpaceData(spaceData, newLanguage);
//       onSpaceDataChange(translatedData);
//     }
//   };

//   const translateSpaceData = async (data: CreateSpaceInput, targetLanguage: Language) => {
//     const translatedData: Partial<CreateSpaceInput> = {};
    
//     translatedData.headerTitle = await translateText(data.headerTitle, targetLanguage);
//     translatedData.customMessage = await translateText(data.customMessage, targetLanguage);
    
//     translatedData.questions = await Promise.all(data.questions.map(async (question) => ({
//       ...question,
//       content: await translateText(question.content, targetLanguage)
//     })));

//     return translatedData;
//   };

//   return (
//     <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         {isEditing ? "Edit Space" : "Create a new Space"}
//       </h2>
//       <p className="text-gray-600 mb-6 text-center">
//         {isEditing ? "Update your space settings" : "Create a new space to collect testimonials"}   
//       </p>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="spaceName">Space name <span className="text-red-600">*</span></Label>
//           <Input
//             id="spaceName"
//             name="spaceName"
//             required
//             value={spaceData.spaceName}
//             onChange={handleInputChange}
//             placeholder="Enter space name"
//           />
//           <p className="text-sm text-gray-500">Public URL: testimonial.to/{spaceData.spaceName}</p>
//         </div>

//         <div className="w-full">
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="logo">
//             Space logo 
//             <div className="relative flex rounded-md items-start my-auto ml-2">
//               <div className="flex items-center h-5 my-auto">
//                 <Checkbox
//                   id="logoShape"
//                   checked={spaceData.logoShape}
//                   onCheckedChange={(checked) => onSpaceDataChange({ logoShape: checked as boolean })}
//                 />
//               </div>
//               <div className="ml-1 leading-5 my-auto">
//                 <Label htmlFor="logoShape" className="text-gray-600 text-sm">square?</Label>
//               </div>
//             </div>
//           </Label>
//           <div className="mt-2 flex items-center">
//             <span className={`h-12 w-12 overflow-hidden bg-gray-100 ${spaceData.logoShape ? 'rounded-lg' : 'rounded-full'}`}>
//               {logoPreview ? (
//                 <Image
//                   src={logoPreview}
//                   alt="Logo preview"
//                   width={48}
//                   height={48}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
//               )}
//             </span>
//             <span className="ml-5 rounded-md shadow-sm">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 name="logo"
//                 id="logo"
//                 onChange={handleLogoChange}
//                 className="hidden"
//               />
//               <Label
//                 htmlFor="logo"
//                 className="py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//               >
//                 Change
//               </Label>
//             </span>
//             {logoPreview && (
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
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="headerTitle">Header title <span className="text-red-600">*</span></Label>
//           <Input
//             id="headerTitle"
//             name="headerTitle"
//             required
//             value={spaceData.headerTitle}
//             onChange={handleInputChange}
//             placeholder="Enter header title"
//           />
//         </div>

//         <div>
//           <Label htmlFor="customMessage">Your custom message <span className="text-red-600">*</span></Label>
//           <Textarea
//             id="customMessage"
//             name="customMessage"
//             required
//             value={spaceData.customMessage}
//             onChange={handleInputChange}
//             placeholder="Enter your custom message"
//             rows={3}
//           />
//         </div>

//         <div>
//           <Label>Questions</Label>
//           {spaceData.questions.map((question, index) => (
//             <div key={question.id} className="flex items-center mt-2">
//               <Input
//                 value={question.content}
//                 onChange={(e) => handleQuestionChange(index, e.target.value)}
//                 maxLength={100}
//               />
//               <span className="ml-2 text-sm text-gray-500">{100 - question.content.length}/100</span>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => handleRemoveQuestion(question.id)}
//                 className="ml-2"
//               >
//                 <Trash2/>
//               </Button>
//             </div>
//           ))}
//           {spaceData.questions.length < 5 && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleAddQuestion}
//               className="mt-2"
//             >
//               Add one (up to 5)
//             </Button>
//           )}
//         </div>

//         <div>
//           <Label>Collect extra information</Label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className="w-full justify-between">
//                 Name, email, title, social link, etc.
//                 <ChevronDown className="h-4 w-4 opacity-50" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                 {defaultFields.map((field) => (
//                     <div key={field.id} className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id={field.id}
//                           checked={field.isEnabled}
//                           onCheckedChange={() => handleExtraInfoChange(field)}
//                           disabled={!field.isEditable}
//                         />
//                         <Label htmlFor={field.id}>{field.label}</Label>
//                         {!field.isEditable && <Lock className="h-4 w-4 text-gray-400" />}
//                       </div>
//                       {field.isEnabled && (
//                         <div className="flex items-center space-x-2">
//                           <Label htmlFor={`${field.id}-required`}>Required?</Label>
//                           <Switch
//                             id={`${field.id}-required`}
//                             checked={field.isRequired}
//                             onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked)}
//                             disabled={!field.isEditable}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   <Label>Create your own fields</Label>
//                   {spaceData.extraInformationFields.map((field) => {
//                     // Check if the field is a custom field (not already included)
//                     if (!['name', 'email', 'title,company', 'social link','address'].includes(field.id)) {
//                       return (
//                         <div key={field.label} className="flex items-center justify-between mt-2">
//                           <span>{field.label} ({field.inputType})</span>
//                           <div className="flex items-center space-x-2">
//                             <Label htmlFor={`${field.id}-required`}>Required?</Label>
//                             <Switch
//                               id={`${field.id}-required`}
//                               checked={field.isRequired}
//                               onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked)}
//                             />
//                             <Button size="sm" variant="ghost" onClick={() => handleRemoveExtraField(field.id)}>
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       );
//                     }
//                     return null; // Don't render anything for pre-defined fields
//                   })}
//                   <div className="flex items-center space-x-2 mt-2">
//                     <Input
//                       placeholder="Add custom field"
//                       value={newExtraField}
//                       onChange={(e) => setNewExtraField(e.target.value)}
//                     />
//                     <Select value={newExtraFieldType} onValueChange={(value) => setNewExtraFieldType(value as ExtraInformationField['inputType'])}>
//                       <SelectTrigger className="w-[100px]">
//                         <SelectValue placeholder="Type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="text">Text</SelectItem>
//                         <SelectItem value="email">Email</SelectItem>
//                         <SelectItem value="checkbox">Checkbox</SelectItem>
//                         <SelectItem value="link">Link</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <Button onClick={handleAddExtraField}>Add</Button>
//                   </div>
//                 </div>
//               </div>
//             </PopoverContent>
//           </Popover>
//         </div>

//         <div>
//           <Label htmlFor="collectionType">Collection type</Label>
//           <Select
//             value={spaceData.collectionType}
//             onValueChange={(value) => onSpaceDataChange({ collectionType: value as CollectionType })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select collection type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value={CollectionType.TEXT_AND_VIDEO}>Text and video</SelectItem>
//               <SelectItem value={CollectionType.TEXT_ONLY}>Text only</SelectItem>
//               <SelectItem value={CollectionType.VIDEO_ONLY}>Video only</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>


//         <div className='flex items-center space-x-2'>
//           <div className="flex items-center space-x-2 mr-10">
//             <Label htmlFor="collectStarRatings">Collect star ratings</Label>
//             <Switch
//               id="collectStarRatings"
//               checked={spaceData.collectStarRatings}
//               onCheckedChange={(checked) => 
//                 onSpaceDataChange({ collectStarRatings: checked })
//               }
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <Label htmlFor="theme">Choose a theme</Label>
//             <Switch
//               id="theme"
//               checked={spaceData.theme === Theme.DARK}
//               onCheckedChange={(checked) => 
//                 onSpaceDataChange({ theme: checked ? Theme.DARK : Theme.LIGHT })
//               }
//             />
//             <span>{spaceData.theme === Theme.DARK ? 'Dark' : 'Light'}</span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="language">Language</Label>
//           <Select
//             value={spaceData.language}
//             onValueChange={(value) => handleLanguageChange(value as Language )}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value={Language.ENGLISH}>English</SelectItem>
//               <SelectItem value={Language.SPANISH}>Spanish</SelectItem>
//               <SelectItem  value={Language.FRENCH}>French</SelectItem>
//               <SelectItem value={Language.GERMAN}>German</SelectItem>
//               <SelectItem value={Language.CHINESE}>Chinese</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="autoTranslate"
//             checked={spaceData.autoTranslate}
//             onCheckedChange={(checked) => 
//               onSpaceDataChange({ autoTranslate: checked as boolean })
//             }
//           />
          
//           <Label htmlFor="autoTranslate">Auto translate to other languages?</Label>
//         </div>
//       </div>
//     </div>
//   );
// }

//components/SpaceForm.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateSpaceInput, ExtraInformationField, CollectionType, Theme, Language, Question } from '@/types/space';
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { ChevronDown, Trash2, Lock, X , Plus} from 'lucide-react';
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SpaceFormProps {
  spaceData: CreateSpaceInput;
  onSpaceDataChange: (newData: Partial<CreateSpaceInput>) => void;
  isEditing?: boolean;
}

export default function SpaceForm({ spaceData, onSpaceDataChange, isEditing = false }: SpaceFormProps) { 
  const { t, i18n } = useTranslation('common');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [newExtraField, setNewExtraField] = useState('');
  const [newExtraFieldType, setNewExtraFieldType] = useState<ExtraInformationField['inputType']>('text');

  // const defaultFields = spaceData.extraInformationFields.filter(field => field.type === "default");
  // const customFields = spaceData.extraInformationFields.filter(field => field.type !== "default");

  const defaultFields = spaceData.extraInformationFields.filter(field => field.type === "defaultType");
  const customFields = spaceData.extraInformationFields.filter(field => field.type === "customType");

  console.log("ExtraInformationFields",spaceData.extraInformationFields)
  console.log("defaultFields",defaultFields)
  console.log("customFields",customFields)

  useEffect(() => {
    if (spaceData.logo instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(spaceData.logo);
    } else if (typeof spaceData.logo === 'string') {
      setLogoPreview(spaceData.logo);
    }
  }, [spaceData.logo]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSpaceDataChange({ logo: file });
    }
    e.target.value = '';
  };

  const handleUndoLogo = () => {
    onSpaceDataChange({ logo: null });
    setLogoPreview(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onSpaceDataChange({ [name]: value });
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...spaceData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], content: value };
    onSpaceDataChange({ questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    if (spaceData.questions.length < 5) {
      const newId = `q${spaceData.questions.length + 1}`;
      onSpaceDataChange({ questions: [...spaceData.questions, { id: newId, content: '' }] });
    }
  };

  const handleRemoveQuestion = (id: string) => {
    const updatedQuestions = spaceData.questions.filter(q => q.id !== id);
    onSpaceDataChange({ questions: updatedQuestions });
  };

  const handleExtraInfoChange = (field: ExtraInformationField) => {
    const updatedExtraInfo = spaceData.extraInformationFields.map(f => {
      // If toggling the field to disabled, ensure "Required" is unchecked as well
      if (f.id === field.id) {
        const isEnabled = !f.isEnabled;
        return { ...f, isEnabled, isRequired: isEnabled ? f.isRequired : false };
      }
      return f;
    });
    onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
  };
  
  const handleExtraInfoRequiredChange = (id: string, isRequired: boolean) => {
    const updatedExtraInfo = spaceData.extraInformationFields.map(field => 
      field.id === id
        // If the field is currently disabled and "Required" is being checked, enable the field
        ? { ...field, isRequired, isEnabled: isRequired || field.isEnabled }
        : field
    );
    onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
  };

  const handleAddExtraField = () => {
    if (newExtraField && customFields.length < 5) {
      const newField: ExtraInformationField = {
        id: `custom-${Date.now()}`,
        label: newExtraField,
        inputType: newExtraFieldType,
        type: "customType", // Ensure new fields are marked as customType
        isRequired: false,
        isEditable: true,
        isEnabled: true
      };
      const updatedExtraInfo = [...spaceData.extraInformationFields, newField];
      onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
      setNewExtraField('');
      setNewExtraFieldType('text');
    }
  };

  const handleRemoveExtraField = (fieldId: string) => {
    const updatedExtraInfo = spaceData.extraInformationFields.filter(field => field.id !== fieldId);
    onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
  };

  const handleCustomFieldChange = (fieldId: string, newLabel: string) => {
    const updatedFields = spaceData.extraInformationFields.map(field =>
      field.id === fieldId ? { ...field, label: newLabel } : field
    );
    onSpaceDataChange({ extraInformationFields: updatedFields });
  };


  const handleLanguageChange = (newLanguage: Language) => {
    onSpaceDataChange({ language: newLanguage });
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditing ? "Edit Space" : "Create a new Space"}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {isEditing ? "Update your space settings" : "Create a new space to collect testimonials"}   
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="spaceName">Space name <span className="text-red-600">*</span></Label>
          <Input
            id="spaceName"
            name="spaceName"
            required
            value={spaceData.spaceName}
            onChange={handleInputChange}
            placeholder="Enter space name"
          />
          <p className="text-sm text-gray-500">Public URL: {`${window.location.host}/${spaceData.spaceName}`}</p>
        </div>

        <div className="w-full">
          <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="logo">
            Space logo 
            <div className="relative flex rounded-md items-start my-auto ml-2">
              <div className="flex items-center h-5 my-auto">
                <Checkbox
                  id="logoShape"
                  checked={spaceData.logoShape}
                  onCheckedChange={(checked) => onSpaceDataChange({ logoShape: checked as boolean })}
                />
              </div>
              <div className="ml-1 leading-5 my-auto">
                <Label htmlFor="logoShape" className="text-gray-600 text-sm">square?</Label>
              </div>
            </div>
          </Label>
          <div className="mt-2 flex items-center">
            <span className={`h-12 w-12 overflow-hidden bg-gray-100 ${spaceData.logoShape ? 'rounded-lg' : 'rounded-full'}`}>
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Logo preview"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
              )}
            </span>
            <span className="ml-5 rounded-md shadow-sm">
              <Input
                type="file"
                accept="image/*"
                name="logo"
                id="logo"
                onChange={handleLogoChange}
                className="hidden"
              />
              <Label
                htmlFor="logo"
                className="py-2 px-3 bg-gray-100 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
              >
                Change
              </Label>
            </span>
            {logoPreview && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={handleUndoLogo}
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

        <div>
          <Label htmlFor="headerTitle">Header title <span className="text-red-600">*</span></Label>
          <Input
            id="headerTitle"
            name="headerTitle"
            required
            value={spaceData.headerTitle}
            onChange={handleInputChange}
            placeholder="Enter header title"
          />
        </div>

        <div>
          <Label htmlFor="customMessage">Your custom message <span className="text-red-600">*</span></Label>
          <Textarea
            id="customMessage"
            name="customMessage"
            required
            value={spaceData.customMessage}
            onChange={handleInputChange}
            placeholder="Enter your custom message"
            rows={3}
          />
        </div>

        <div>
          <Label>Questions</Label>
          {spaceData.questions.map((question, index) => (
            <div key={question.id} className="flex items-center mt-2">
              <Input
                value={question.content}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                maxLength={100}
              />
              <span className="ml-2 text-sm text-gray-500">{100 - question.content.length}/100</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveQuestion(question.id)}
                className="ml-2 bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-md"
              >
                <Trash2/>
              </Button>
            </div>
          ))}
          {spaceData.questions.length < 5 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddQuestion}
              className="mt-2"
            >
              Add one (up to 5)
            </Button>
          )}
        </div>

        <div>
      <Label>Collect extra information</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Name, email, title, social link, etc.
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              {defaultFields.map((field) => (
                <div key={field.id} className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={field.id}
                      checked={field.isEnabled}
                      onCheckedChange={() => handleExtraInfoChange(field)}
                      disabled={!field.isEditable}
                      className="ml-2"
                    />
                    <Label htmlFor={field.id}>{field.label}</Label>
                    {!field.isEditable && <Lock className="h-4 w-4 text-gray-400" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`${field.id}-required`} className="text-sm">Required?</Label>
                    <Checkbox
                      id={`${field.id}-required`}
                      checked={field.isRequired}
                      onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked as boolean)}
                      disabled={ !field.isEditable}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="mb-2 text-sm font-semibold text-gray-700">Create your own fields</div>
              <ul className="text-sm text-gray-700">
                {customFields.map((field) => (
                  <li key={field.id} className="mt-2">
                    <div className="flex flex-row">
                      <div className="flex w-full mt-1">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                          <Input
                            type="text"
                            value={field.label}
                            onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                            className="w-full max-w-[700px] pr-14 rounded-r-none border-r-0 border-gray-300 bg-white py-2"
                            maxLength={50}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">{field.label.length}/50</span>
                          </div>
                        </div>
                        <Select
                          value={field.inputType}
                          onValueChange={(value) => {
                            const updatedFields = spaceData.extraInformationFields.map(f =>
                              f.id === field.id ? { ...f, inputType: value as ExtraInformationField['inputType'] } : f
                            );
                            onSpaceDataChange({ extraInformationFields: updatedFields });
                          }}
                        >
                          <SelectTrigger className="w-[120px] rounded-none border border-gray-300 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 border-l-0 rounded-r-md bg-white">
                          <Label htmlFor={`${field.id}-required`} className="text-sm">Required?</Label>
                          <Checkbox
                            id={`${field.id}-required`}
                            checked={field.isRequired}
                            onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked as boolean)}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExtraField(field.id)}
                        className="my-auto ml-2"
                      >
                        <Trash2 className="h-5 w-5 text-gray-600 hover:text-gray-400" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-2 mt-4">
                <Input
                  placeholder="Add custom field"
                  value={newExtraField}
                  onChange={(e) => setNewExtraField(e.target.value)}
                />
                <Select 
                  value={newExtraFieldType} 
                  onValueChange={(value) => setNewExtraFieldType(value as ExtraInformationField['inputType'])}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddExtraField} disabled={customFields.length >= 5}>Add</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>


        <div>
          <Label htmlFor="collectionType">Collection type</Label>
          <Select
            value={spaceData.collectionType}
            onValueChange={(value) => onSpaceDataChange({ collectionType: value as CollectionType })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select collection type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={CollectionType.TEXT_AND_VIDEO}>Text and video</SelectItem>
              <SelectItem value={CollectionType.TEXT_ONLY}>Text only</SelectItem>
              <SelectItem value={CollectionType.VIDEO_ONLY}>Video only</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className='flex items-center space-x-2'>
          <div className="flex items-center space-x-2 mr-10">
            <Label htmlFor="collectStarRatings">Collect star ratings</Label>
            <Switch
              id="collectStarRatings"
              checked={spaceData.collectStarRatings}
              onCheckedChange={(checked) => 
                onSpaceDataChange({ collectStarRatings: checked })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="theme">Choose a theme</Label>
            <Switch
              id="theme"
              checked={spaceData.theme === Theme.DARK}
              onCheckedChange={(checked) => 
                onSpaceDataChange({ theme: checked ? Theme.DARK : Theme.LIGHT })
              }
            />
            <span>{spaceData.theme === Theme.DARK ? 'Dark' : 'Light'}</span>
          </div>
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Select
            value={spaceData.language}
            onValueChange={(value) => handleLanguageChange(value as Language)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Language.ENGLISH}>English</SelectItem>
              <SelectItem value={Language.SPANISH}>Spanish</SelectItem>
              <SelectItem value={Language.GERMAN}>German</SelectItem>
              <SelectItem value={Language.CHINESE}>Chinese</SelectItem>
              <SelectItem value={Language.FRENCH}>French</SelectItem>

              {/* <SelectItem value={Language.DUTCH}>Nederlands</SelectItem>
              <SelectItem value={Language.POLISH}>Polski</SelectItem>
              <SelectItem value={Language.NORWEGIAN}>Norwegian</SelectItem>
              <SelectItem value={Language.ROMANIAN}>Românesc</SelectItem>
              <SelectItem value={Language.RUSSIAN}>Русский</SelectItem>
              <SelectItem value={Language.PORTUGUESE_BRAZIL}>Português (Brazil)</SelectItem>
              <SelectItem value={Language.CZECH}>Česky</SelectItem>
              <SelectItem value={Language.JAPANESE}>日本語</SelectItem>
              <SelectItem value={Language.ITALIAN}>Italian</SelectItem>
              <SelectItem value={Language.SWEDISH}>Swedish</SelectItem>
              <SelectItem value={Language.FINNISH}>Suomi</SelectItem> */}
            </SelectContent>
          </Select>
        </div>


        <div className="flex items-center space-x-2">
          <Checkbox
            id="autoTranslate"
            checked={spaceData.autoTranslate}
            onCheckedChange={(checked) => 
              onSpaceDataChange({ autoTranslate: checked as boolean })
            }
          />
          
          <Label htmlFor="autoTranslate">Auto translate to other languages?</Label>
        </div>
      </div>
    </div>
  );
}