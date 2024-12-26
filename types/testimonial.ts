// types/testimonial.ts 
export enum TestimonialType {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO'
}

// export enum Language {
//   ENGLISH = 'ENGLISH',
//   SPANISH = 'SPANISH',
//   FRENCH = 'FRENCH',
//   GERMAN = 'GERMAN',
//   CHINESE = 'CHINESE'
// }

export interface Testimonial {
  id: string;
  spaceId: string;
  content: string;
  type: TestimonialType;
  rating?: number;
  attachedImages: string[]; // New field for attached images
  photo?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: number;
  trimmedStartTime?: number;
  trimmedEndTime?: number;
  permissionGranted: boolean;
  extraInformation: ExtraInformationItem[];
  companyLink?: string;
  companyLogo?: string;
  readMoreLink?: string;
  excerpt?: string;
  internalComments?: string;
  isLiked: boolean;
  isHighlighted: boolean;
  isArchived: boolean;
  isSpam: boolean;
  tags: string[];
  // language: Language;
  // translations?: Record<Language, string>;
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
  videoDuration?: number;
}

export interface ExtraInformationItem {
  id: string;
  label: string;
  value: string | boolean;
}