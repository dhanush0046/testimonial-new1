// // types/space.ts
// export enum CollectionType {
//   TEXT_ONLY = 'TEXT_ONLY',
//   VIDEO_ONLY = 'VIDEO_ONLY',
//   TEXT_AND_VIDEO = 'TEXT_AND_VIDEO'
// }

// export enum Theme {
//   LIGHT = 'LIGHT',
//   DARK = 'DARK'
// }

// export enum Language {
//   ENGLISH = 'ENGLISH',
//   SPANISH = 'SPANISH',
//   FRENCH = 'FRENCH',
//   GERMAN = 'GERMAN',
//   CHINESE = 'CHINESE'
// }

// export interface Space {
//   id: string;
//   spaceName: string;
//   headerTitle: string;
//   customMessage: string;
//   logo: string | null;
//   logoShape: boolean;
//   collectionType: CollectionType;
//   collectStarRatings: boolean;
//   theme: Theme;
//   customButtonColor: string;
//   language: Language;
//   autoTranslate: boolean;
//   questions: Question[];
//   extraInformationFields: ExtraInformationField[];
//   shareableLink: string;
//   videoTestimonialsCount: number;
//   textTestimonialsCount: number;
//   createdAt: Date;
//   updatedAt: Date;

//   // New fields for thank you page
//   thankYouImage: string | null;
//   thankYouTitle: string;
//   thankYouMessage: string;
//   allowSocialShare: boolean;
//   redirectUrl: string | null;
//   autoReward: boolean;
//   hideImage: boolean | null;
// }

// export interface DashboardData {
//   spaces: Space[];
//   totalVideos: number;
//   totalSpaces: number;
//   currentPlan: string;
// }

// export interface CreateSpaceInput {
//   spaceName: string;
//   headerTitle: string;
//   customMessage: string;
//   questions: Question[];
//   logo: File| string | null;
//   logoShape: boolean;
//   collectionType: CollectionType;
//   collectStarRatings: boolean;
//   theme: Theme;
//   customButtonColor: string;
//   language: Language;
//   autoTranslate: boolean;
//   extraInformationFields: ExtraInformationField[];
//   shareableLink: string | null;
//     // New fields for thank you page
//   thankYouImage:File | string | null;
//   thankYouTitle: string;
//   thankYouMessage: string;
//   allowSocialShare: boolean;
//   redirectUrl: string | null;
//   autoReward: boolean;
//   hideImage: boolean | null;
// }

// export interface Question {
//   id: string;
//   content: string;
// }

// export interface ExtraInformationField {
//   id: string;
//   label: string;
//   inputType: 'text' | 'email' | 'link' | 'checkbox';
//   isRequired: boolean;
//   isEditable: boolean;
//   isEnabled: boolean;
// }

// export interface ShareableSpaceInfo {
//   spaceName: string;
//   spaceId: string;
// }


// types/space.ts
export enum CollectionType {
  TEXT_ONLY = 'TEXT_ONLY',
  VIDEO_ONLY = 'VIDEO_ONLY',
  TEXT_AND_VIDEO = 'TEXT_AND_VIDEO'
}

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK'
}

export enum Language {
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  GERMAN = 'GERMAN',
  CHINESE = 'CHINESE'
}

export interface Space extends ExtraSettings {
  id: string;
  spaceName: string;
  headerTitle: string;
  customMessage: string;
  logo: string | null;
  logoShape: boolean;
  collectionType: CollectionType;
  collectStarRatings: boolean;
  theme: Theme;
  language: Language;
  autoTranslate: boolean;
  questions: Question[];
  extraInformationFields: ExtraInformationField[];
  shareableLink: string;
  videoTestimonialsCount: number;
  textTestimonialsCount: number;
  createdAt: Date;
  updatedAt: Date;

  // New fields for thank you page
  thankYouImage: string | null;
  thankYouTitle: string;
  thankYouMessage: string;
  allowSocialShare: boolean;
  redirectUrl: string | null;
  autoReward: boolean;
  hideImage: boolean | null;
}

export interface ExtraSettings {
  maxVideoDuration: number;
  maxTextCharacters: number;
  videoButtonText: string;
  textButtonText: string;
  consentDisplay: 'required' | 'optional' | 'hidden';
  consentStatement: string;
  textSubmissionTitle: string;
  questionLabel: string;
  affiliateLink: string;
  thirdPartyReviewPlatform: string;
  thirdPartyReviewLink: string;
  autoPopulateWallOfLove: boolean;
  disableVideoForIphone: boolean;
  allowSearchEngineIndexing: boolean;
  customButtonColorRV: string;  
  customButtonColorST: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: File| string | null;
}

export interface DashboardData {
  spaces: Space[];
  totalVideos: number;
  totalSpaces: number;
  currentPlan: string;
}

export interface CreateSpaceInput extends ExtraSettings {
  spaceName: string;
  headerTitle: string;
  customMessage: string;
  questions: Question[];
  logo: File| string | null;
  logoShape: boolean;
  collectionType: CollectionType;
  collectStarRatings: boolean;
  theme: Theme;
  language: Language;
  autoTranslate: boolean;
  extraInformationFields: ExtraInformationField[];
  shareableLink: string | null;
    // New fields for thank you page
  thankYouImage:File | string | null;
  thankYouTitle: string;
  thankYouMessage: string;
  allowSocialShare: boolean;
  redirectUrl: string | null;
  autoReward: boolean;
  hideImage: boolean | null;
}

export interface Question {
  id: string;
  content: string;
}

export interface ExtraInformationField {
  id: string;
  label: string;
  inputType: 'text' | 'email' | 'link' | 'checkbox';
  isRequired: boolean;
  isEditable: boolean;
  isEnabled: boolean;
}

export interface ShareableSpaceInfo {
  spaceName: string;
  spaceId: string;
}
