// types/testimonial.ts 
export enum TestimonialType {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO'
}

export interface Testimonial {
  id: string;
  spaceId: string;
  content: string;
  type: TestimonialType;
  rating?: number;
  attachedImages: string[]; // New field for attached images
  photo?: string;
  videoUrl?: string;
  permissionGranted: boolean;
  extraInformation: ExtraInformationItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTestimonialInput {
  spaceId: string;
  content: string;
  type: TestimonialType;
  rating?: number;
  attachedImages?: string[]; // New field for attached images
  photo?: string;
  videoUrl?: string;
  permissionGranted: boolean;
  extraInformation: ExtraInformationItem[];
}

export interface ExtraInformationItem {
  id: string;
  label: string;
  value: string | boolean;
}

// // types/testimonial.ts 
// export enum TestimonialType {
//   TEXT = 'TEXT',
//   VIDEO = 'VIDEO'
// }

// export enum Language {
//   ENGLISH = 'ENGLISH',
//   SPANISH = 'SPANISH',
//   FRENCH = 'FRENCH',
//   GERMAN = 'GERMAN',
//   CHINESE = 'CHINESE'
// }

// export interface Testimonial {
//   id: string;
//   spaceId: string;
//   content: string;
//   type: TestimonialType;
//   rating?: number;
//   attachedImages: string[]; // New field for attached images
//   photo?: string;
//   videoUrl?: string;
//   permissionGranted: boolean;
//   extraInformation: ExtraInformationItem[];
//   language: Language;
//   translations?: Record<Language, string>;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface CreateTestimonialInput {
//   spaceId: string;
//   content: string;
//   type: TestimonialType;
//   rating?: number;
//   attachedImages?: string[]; // New field for attached images
//   photo?: string;
//   videoUrl?: string;
//   permissionGranted: boolean;
//   extraInformation: ExtraInformationItem[];
//   language: Language;
// }

// export interface ExtraInformationItem {
//   id: string;
//   label: string;
//   value: string | boolean;
// }