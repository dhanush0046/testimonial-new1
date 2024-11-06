//components/SpaceForm.tsx
// import React, { useState } from 'react';
// import { CreateSpaceInput, ExtraInformationField } from '@/types/space';
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Switch } from "@/components/ui/switch"
// import { ChevronDown, Trash2 } from 'lucide-react';

// interface SpaceFormProps {
//   spaceData: CreateSpaceInput;
//   onSpaceDataChange: (newData: Partial<CreateSpaceInput>) => void;
// }

// export default function SpaceForm({ spaceData, onSpaceDataChange }: SpaceFormProps) {
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [newExtraField, setNewExtraField] = useState('');
//   const [newExtraFieldType, setNewExtraFieldType] = useState<ExtraInformationField['type']>('text');

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     onSpaceDataChange({ [name]: value });
//   };

//   const handleQuestionChange = (index: number, value: string) => {
//     const updatedQuestions = [...spaceData.questions];
//     updatedQuestions[index] = value;
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleAddQuestion = () => {
//     if (spaceData.questions.length < 5) {
//       onSpaceDataChange({ questions: [...spaceData.questions, ''] });
//     }
//   };

//   const handleRemoveQuestion = (index: number) => {
//     const updatedQuestions = spaceData.questions.filter((_, i) => i !== index);
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setLogoFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         onSpaceDataChange({ logo: reader.result as string });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleExtraInfoChange = (field: ExtraInformationField) => {
//     let updatedExtraInfo = [...spaceData.extraInformationFields];
//     const existingFieldIndex = updatedExtraInfo.findIndex(f => f.name === field.name);
//     if (existingFieldIndex === -1) {
//       updatedExtraInfo.push(field);
//     } else {
//       updatedExtraInfo.splice(existingFieldIndex, 1);
//     }
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   const handleExtraInfoRequiredChange = (name: string, required: boolean) => {
//     const updatedExtraInfo = spaceData.extraInformationFields.map(field => 
//       field.name === name ? { ...field, required } : field
//     );
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   const handleAddExtraField = () => {
//     if (newExtraField) {
//       const newField: ExtraInformationField = {
//         name: newExtraField,
//         required: false,
//         type: newExtraFieldType
//       };
//       const updatedExtraInfo = [...spaceData.extraInformationFields, newField];
//       onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//       setNewExtraField('');
//       setNewExtraFieldType('text');
//     }
//   };

//   const handleRemoveExtraField = (fieldName: string) => {
//     const updatedExtraInfo = spaceData.extraInformationFields.filter(field => field.name !== fieldName);
//     onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
//   };

//   return (
//     <div className="bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md rounded-lg p-6 animate-fadeIn">
//       <h2 className="text-2xl font-bold mb-6">Edit Space</h2>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="spaceName">Space name</Label>
//           <Input
//             id="spaceName"
//             name="spaceName"
//             value={spaceData.spaceName}
//             onChange={handleInputChange}
//             placeholder="Enter space name"
//           />
//           <p className="text-sm text-gray-500">Public URL: testimonial.to/{spaceData.spaceName}</p>
//         </div>

//         <div>
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="logo">
//             Update the logo
//             <div className="relative flex rounded-md items-start my-auto ml-2">
//               <div className="flex items-center h-5 my-auto">
//                 <Checkbox
//                   id="logoSquare"
//                   checked={spaceData.logoSquare}
//                   onCheckedChange={(checked) => onSpaceDataChange({ logoSquare: checked as boolean })}
//                 />
//               </div>
//               <div className="ml-1 leading-5 my-auto">
//                 <Label htmlFor="logoSquare" className="text-gray-600 text-sm">square?</Label>
//               </div>
//             </div>
//           </Label>
//           <div className="mt-2 flex items-center">
//             <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
//               {spaceData.logo ? (
//                 <img src={spaceData.logo} alt="Logo preview" className="h-full w-full object-cover" />
//               ) : (
//                 <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
//               )}
//             </span>
//             <span className="ml-5 rounded-md shadow-sm">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 id="logo"
//                 name="logo"
//                 onChange={handleLogoChange}
//                 className="hidden"
//               />
//               <Label
//                 htmlFor="logo"
//                 className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
//               >
//                 Change
//               </Label>
//             </span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="headerTitle">Header title</Label>
//           <Input
//             id="headerTitle"
//             name="headerTitle"
//             value={spaceData.headerTitle}
//             onChange={handleInputChange}
//             placeholder="Enter header title"
//           />
//         </div>

//         <div>
//           <Label htmlFor="customMessage">Your custom message</Label>
//           <Textarea
//             id="customMessage"
//             name="customMessage"
//             value={spaceData.customMessage}
//             onChange={handleInputChange}
//             placeholder="Enter your custom message"
//             rows={3}
//           />
//         </div>

//         <div>
//           <Label>Questions</Label>
//           {spaceData.questions.map((question, index) => (
//             <div key={index} className="flex items-center mt-2">
//               <Input
//                 value={question}
//                 onChange={(e) => handleQuestionChange(index, e.target.value)}
//                 maxLength={100}
//               />
//               <span className="ml-2 text-sm text-gray-500">{100 - question.length}/100</span>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => handleRemoveQuestion(index)}
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
//           <Label className="text-lg font-semibold">Collect extra information</Label>
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
//                   {['Name', 'Email', 'Title, company', 'Social link', 'Address'].map((field) => (
//                     <div key={field} className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id={field}
//                           checked={spaceData.extraInformationFields.some(f => f.name === field)}
//                           onCheckedChange={(checked) => handleExtraInfoChange({ name: field, required: false, type: field === 'Email' ? 'email' : 'text' })}
//                         />
//                         <Label htmlFor={field}>{field}</Label>
//                       </div>
//                       {spaceData.extraInformationFields.some(f => f.name === field) && (
//                         <div className="flex items-center space-x-2">
//                           <Label htmlFor={`${field}-required`}>Required?</Label>
//                           <Switch
//                             id={`${field}-required`}
//                             checked={spaceData.extraInformationFields.find(f => f.name === field)?.required}
//                             onCheckedChange={(checked) => handleExtraInfoRequiredChange(field, checked)}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   <Label>Create your own fields</Label>
//                   {spaceData.extraInformationFields.filter(field => !['Name', 'Email', 'Title, company', 'Social link', 'Address'].includes(field.name)).map((field) => (
//                     <div key={field.name} className="flex items-center justify-between mt-2">
//                       <span>{field.name} ({field.type})</span>
//                       <div className="flex items-center space-x-2">
//                         <Label htmlFor={`${field.name}-required`}>Required?</Label>
//                         <Switch
//                           id={`${field.name}-required`}
//                           checked={field.required}
//                           onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.name, checked)}
//                         />
//                         <Trash2 
//                           className="h-4 w-4 cursor-pointer text-red-500" 
//                           onClick={() => handleRemoveExtraField(field.name)}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                   <div className="flex items-center space-x-2 mt-2">
//                     <Input
//                       placeholder="Add custom field"
//                       value={newExtraField}
//                       onChange={(e) => setNewExtraField(e.target.value)}
//                     />
//                     <Select value={newExtraFieldType} onValueChange={(value) => setNewExtraFieldType(value as ExtraInformationField['type'])}>
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
//             onValueChange={(value) => onSpaceDataChange({ collectionType: value })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select collection type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Text and video">Text and video</SelectItem>
//               <SelectItem value="Text only">Text only</SelectItem>
//               <SelectItem value="Video only">Video only</SelectItem>
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
//               checked={spaceData.theme === 'dark'}
//               onCheckedChange={(checked) => 
//                 onSpaceDataChange({ theme: checked ? 'dark' : 'light' })
//               }
//             />
//             <span>{spaceData.theme === 'dark' ? 'Dark' : 'Light'}</span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="customButtonColor">Custom button color</Label>
//           <Input
//             type="color"
//             id="customButtonColor"
//             name="customButtonColor"
//             value={spaceData.customButtonColor}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="language">Language</Label>
//           <Select
//             value={spaceData.language}
//             onValueChange={(value) => onSpaceDataChange({ language: value })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select language" 
//               />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="English">English</SelectItem>
//               <SelectItem value="Spanish">Spanish</SelectItem>
//               <SelectItem value="French">French</SelectItem>
//               <SelectItem value="German">German</SelectItem>
//               <SelectItem value="Italian">Italian</SelectItem>
//               <SelectItem value="Portuguese">Portuguese</SelectItem>
//               <SelectItem value="Dutch">Dutch</SelectItem>
//               <SelectItem value="Russian">Russian</SelectItem>
//               <SelectItem value="Chinese">Chinese</SelectItem>
//               <SelectItem value="Japanese">Japanese</SelectItem>
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
// import React, { useState } from 'react';
// import { CreateSpaceInput, ExtraInformationField } from '@/types/space';
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Switch } from "@/components/ui/switch"
// import { ChevronDown, Trash2, Lock } from 'lucide-react';

// interface SpaceFormProps {
//   spaceData: CreateSpaceInput;
//   onSpaceDataChange: (newData: Partial<CreateSpaceInput>) => void;
// }

// export default function SpaceForm({ spaceData, onSpaceDataChange }: SpaceFormProps) {
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [newExtraField, setNewExtraField] = useState('');
//   const [newExtraFieldType, setNewExtraFieldType] = useState<ExtraInformationField['inputType']>('text');

//   const defaultFields = spaceData.extraInformationFields.filter(field => !field.isEditable || field.isEditable);
//   const customFields = spaceData.extraInformationFields.filter(field => field.isEditable);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     onSpaceDataChange({ [name]: value });
//   };

//   const handleQuestionChange = (index: number, value: string) => {
//     const updatedQuestions = [...spaceData.questions];
//     updatedQuestions[index] = value;
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleAddQuestion = () => {
//     if (spaceData.questions.length < 5) {
//       onSpaceDataChange({ questions: [...spaceData.questions, ''] });
//     }
//   };

//   const handleRemoveQuestion = (index: number) => {
//     const updatedQuestions = spaceData.questions.filter((_, i) => i !== index);
//     onSpaceDataChange({ questions: updatedQuestions });
//   };

//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setLogoFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         onSpaceDataChange({ logo: reader.result as string });
//       };
//       reader.readAsDataURL(file);
//     }
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
//       <h2 className="text-2xl font-bold mb-6">Edit Space</h2>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="spaceName">Space name</Label>
//           <Input
//             id="spaceName"
//             name="spaceName"
//             value={spaceData.spaceName}
//             onChange={handleInputChange}
//             placeholder="Enter space name"
//           />
//           <p className="text-sm text-gray-500">Public URL: testimonial.to/{spaceData.spaceName}</p>
//         </div>

//         <div>
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="logo">
//             Update the logo
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
//             <span className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
//               {spaceData.logo ? (
//                 <img src={spaceData.logo} alt="Logo preview" className="h-full w-full object-cover" />
//               ) : (
//                 <span className="flex items-center justify-center h-full w-full text-gray-400"></span>
//               )}
//             </span>
//             <span className="ml-5 rounded-md shadow-sm">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 id="logo"
//                 name="logo"
//                 onChange={handleLogoChange}
//                 className="hidden"
//               />
//               <Label
//                 htmlFor="logo"
//                 className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium bg-gray-50 text-gray-600 hover:text-gray-700 focus:outline-none cursor-pointer" // focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out 
//               >
//                 Change
//               </Label>
//             </span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="headerTitle">Header title</Label>
//           <Input
//             id="headerTitle"
//             name="headerTitle"
//             value={spaceData.headerTitle}
//             onChange={handleInputChange}
//             placeholder="Enter header title"
//           />
//         </div>

//         <div>
//           <Label htmlFor="customMessage">Your custom message</Label>
//           <Textarea
//             id="customMessage"
//             name="customMessage"
//             value={spaceData.customMessage}
//             onChange={handleInputChange}
//             placeholder="Enter your custom message"
//             rows={3}
//           />
//         </div>

//         <div>
//           <Label>Questions</Label>
//           {spaceData.questions.map((question, index) => (
//             <div key={index} className="flex items-center mt-2">
//               <Input
//                 value={question}
//                 onChange={(e) => handleQuestionChange(index, e.target.value)}
//                 maxLength={100}
//               />
//               <span className="ml-2 text-sm text-gray-500">{100 - question.length}/100</span>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => handleRemoveQuestion(index)}
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
//           <Label className="text-lg font-semibold">Collect extra information</Label>
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
//             onValueChange={(value) => onSpaceDataChange({ collectionType: value })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select collection type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Text and video">Text and video</SelectItem>
//               <SelectItem value="Text only">Text only</SelectItem>
//               <SelectItem value="Video only">Video only</SelectItem>
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
//               checked={spaceData.theme === 'dark'}
//               onCheckedChange={(checked) => 
//                 onSpaceDataChange({ theme: checked ? 'dark' : 'light' })
//               }
//             />
//             <span>{spaceData.theme === 'dark' ? 'Dark' : 'Light'}</span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="customButtonColor">Custom button color</Label>
//           <Input
//             type="color"
//             id="customButtonColor"
//             name="customButtonColor"
//             value={spaceData.customButtonColor}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="language">Language</Label>
//           <Select
//             value={spaceData.language}
//             onValueChange={(value) => onSpaceDataChange({ language: value })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="English">English</SelectItem>
//               <SelectItem value="Spanish">Spanish</SelectItem>
//               <SelectItem value="French">French</SelectItem>
//               <SelectItem value="German">German</SelectItem>
//               <SelectItem value="Italian">Italian</SelectItem>
//               <SelectItem value="Portuguese">Portuguese</SelectItem>
//               <SelectItem value="Dutch">Dutch</SelectItem>
//               <SelectItem value="Russian">Russian</SelectItem>
//               <SelectItem value="Chinese">Chinese</SelectItem>
//               <SelectItem value="Japanese">Japanese</SelectItem>
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
// import React, { useState } from 'react';
// import { CreateSpaceInput, ExtraInformationField, CollectionType, Theme, Language, Question } from '@/types/space';
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Switch } from "@/components/ui/switch"
// import { ChevronDown, Trash2, Lock } from 'lucide-react';
// import Image from "next/image";

// interface SpaceFormProps {
//   spaceData: CreateSpaceInput;
//   onSpaceDataChange: (newData: Partial<CreateSpaceInput>) => void;
// }

// export default function SpaceForm({ spaceData, onSpaceDataChange }: SpaceFormProps) {
//   const [logoPreview, setLogoPreview] = useState<string | null>(null);
//   const [newExtraField, setNewExtraField] = useState('');
//   const [newExtraFieldType, setNewExtraFieldType] = useState<ExtraInformationField['inputType']>('text');

//   const defaultFields = spaceData.extraInformationFields.filter(field => !field.isEditable || field.isEditable);
//   const customFields = spaceData.extraInformationFields.filter(field => field.isEditable);

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

//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onSpaceDataChange({ logo: file });
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogoPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
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
//       <h2 className="text-2xl font-bold mb-6">Edit Space</h2>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="spaceName">Space name</Label>
//           <Input
//             id="spaceName"
//             name="spaceName"
//             value={spaceData.spaceName}
//             onChange={handleInputChange}
//             placeholder="Enter space name"
//           />
//           <p className="text-sm text-gray-500">Public URL: testimonial.to/{spaceData.spaceName}</p>
//         </div>

//         <div>
//           <Label className="flex flex-row text-gray-700 text-sm font-medium mb-1" htmlFor="logo">
//             Update the logo
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
//             <span className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
//               {logoPreview ? (
//                 <Image 
//                   src={logoPreview} 
//                   alt="Logo preview" 
//                   width={100}
//                   height={100}
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
//                 id="logo"
//                 name="logo"
//                 onChange={handleLogoChange}
//                 className="hidden"
//               />
//               <Label
//                 htmlFor="logo"
//                 className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium bg-gray-50 text-gray-600 hover:text-gray-700 focus:outline-none cursor-pointer"
//               >
//                 Change
//               </Label>
//             </span>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="headerTitle">Header title</Label>
//           <Input
//             id="headerTitle"
//             name="headerTitle"
//             value={spaceData.headerTitle}
//             onChange={handleInputChange}
//             placeholder="Enter header title"
//           />
//         </div>

//         <div>
//           <Label htmlFor="customMessage">Your custom message</Label>
//           <Textarea
//             id="customMessage"
//             name="customMessage"
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
//           <Label className="text-lg font-semibold">Collect extra information</Label>
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
//           <Label htmlFor="customButtonColor">Custom button color</Label>
//           <Input
//             type="color"
//             id="customButtonColor"
//             name="customButtonColor"
//             value={spaceData.customButtonColor}
//             onChange={handleInputChange}
//           />
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


//components/SpaceForm.tsx
import React, { useState, useEffect } from 'react';
import { CreateSpaceInput, ExtraInformationField, CollectionType, Theme, Language, Question } from '@/types/space';
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { ChevronDown, Trash2, Lock, X } from 'lucide-react';
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SpaceFormProps {
  spaceData: CreateSpaceInput;
  onSpaceDataChange: (newData: Partial<CreateSpaceInput>) => void;
  isEditing?: boolean;
}

export default function SpaceForm({ spaceData, onSpaceDataChange, isEditing = false }: SpaceFormProps) { 
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [newExtraField, setNewExtraField] = useState('');
  const [newExtraFieldType, setNewExtraFieldType] = useState<ExtraInformationField['inputType']>('text');

  const defaultFields = spaceData.extraInformationFields.filter(field => !field.isEditable || field.isEditable);
  const customFields = spaceData.extraInformationFields.filter(field => field.isEditable);

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
    let updatedExtraInfo = [...spaceData.extraInformationFields];
    const existingFieldIndex = updatedExtraInfo.findIndex(f => f.id === field.id);
    if (existingFieldIndex === -1) {
      updatedExtraInfo.push(field);
    } else {
      updatedExtraInfo[existingFieldIndex] = { ...updatedExtraInfo[existingFieldIndex], isEnabled: !updatedExtraInfo[existingFieldIndex].isEnabled };
    }
    onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
  };

  const handleExtraInfoRequiredChange = (id: string, isRequired: boolean) => {
    const updatedExtraInfo = spaceData.extraInformationFields.map(field => 
      field.id === id ? { ...field, isRequired } : field
    );
    onSpaceDataChange({ extraInformationFields: updatedExtraInfo });
  };

  const handleAddExtraField = () => {
    if (newExtraField && customFields.length < 10) {
      const newField: ExtraInformationField = {
        id: newExtraField.toLowerCase().replace(/\s+/g, '-'),
        label: newExtraField,
        inputType: newExtraFieldType,
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
          <p className="text-sm text-gray-500">Public URL: testimonial.to/{spaceData.spaceName}</p>
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
                className="ml-2"
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
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                {defaultFields.map((field) => (
                    <div key={field.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={field.id}
                          checked={field.isEnabled}
                          onCheckedChange={() => handleExtraInfoChange(field)}
                          disabled={!field.isEditable}
                        />
                        <Label htmlFor={field.id}>{field.label}</Label>
                        {!field.isEditable && <Lock className="h-4 w-4 text-gray-400" />}
                      </div>
                      {field.isEnabled && (
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`${field.id}-required`}>Required?</Label>
                          <Switch
                            id={`${field.id}-required`}
                            checked={field.isRequired}
                            onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked)}
                            disabled={!field.isEditable}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <Label>Create your own fields</Label>
                  {spaceData.extraInformationFields.map((field) => {
                    // Check if the field is a custom field (not already included)
                    if (!['name', 'email', 'title,company', 'social link','address'].includes(field.id)) {
                      return (
                        <div key={field.label} className="flex items-center justify-between mt-2">
                          <span>{field.label} ({field.inputType})</span>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`${field.id}-required`}>Required?</Label>
                            <Switch
                              id={`${field.id}-required`}
                              checked={field.isRequired}
                              onCheckedChange={(checked) => handleExtraInfoRequiredChange(field.id, checked)}
                            />
                            <Button size="sm" variant="ghost" onClick={() => handleRemoveExtraField(field.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    }
                    return null; // Don't render anything for pre-defined fields
                  })}
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      placeholder="Add custom field"
                      value={newExtraField}
                      onChange={(e) => setNewExtraField(e.target.value)}
                    />
                    <Select value={newExtraFieldType} onValueChange={(value) => setNewExtraFieldType(value as ExtraInformationField['inputType'])}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddExtraField}>Add</Button>
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
            onValueChange={(value) => onSpaceDataChange({ language: value as Language })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Language.ENGLISH}>English</SelectItem>
              <SelectItem value={Language.SPANISH}>Spanish</SelectItem>
              <SelectItem  value={Language.FRENCH}>French</SelectItem>
              <SelectItem value={Language.GERMAN}>German</SelectItem>
              <SelectItem value={Language.CHINESE}>Chinese</SelectItem>
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