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
  ENGLISH = 'en',
  SPANISH = 'es',
  FRENCH = 'fr',
  GERMAN = 'de',
  CHINESE = 'zh'
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
  shareableLink: string | null;
  videoTestimonialsCount: number;
  textTestimonialsCount: number;
  apiKey: string;
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

  // New fields for dashboard
  tagsDisplayOnWall: boolean;
  tags: Tag[];

  wallOfLoveSettings?: WallOfLoveSettings
}

export interface Tag {
  id: string;               // Unique identifier for the tag
  name: string;             // Name of the tag
  displayOnWall: boolean;   // Determines if the tag is displayed on the wall
  isActive: boolean;        // Determines if the tag is active
  position: number;         // Position/order of the tag
  spaceId: string;          // ID of the associated space
  createdAt: string;        // Timestamp for when the tag was created
  updatedAt: string;        // Timestamp for the last update
}

export interface WallOfLoveSettings {
  // id: string
  // spaceId: string
  coverImage?: string
  coverImageDarkness: number
  topBannerText: string
  topBannerTextColor: string
  topBannerButtonText: string
  topBannerButtonColor: string
  showBorder: boolean
  borderRadius: string
  borderColor: string
  borderThickness: number
  // ... other fields
}

export interface ExtraSettings {
  maxVideoDuration: number;
  maxTextCharacters: number | null;
  videoButtonText: string;
  textButtonText: string;
  consentDisplay: string;
  consentStatement: string;
  textSubmissionTitle: string;
  videoSubmissionTitle: string;
  questionLabel: string;
  affiliateLink: string | null;
  thirdPartyReviewPlatform: string | null;
  thirdPartyReviewLink: string | null;
  autoPopulateWallOfLove: boolean;
  disableVideoForIphone: boolean;
  allowSearchEngineIndexing: boolean;
  customButtonColorRV: string;  
  customButtonColorST: string;
  openGraphTitle: string | null;
  openGraphDescription: string | null;
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
  type: 'defaultType' | 'customType';
  isRequired: boolean;
  isEditable: boolean;
  isEnabled: boolean;
}

export interface ShareableSpaceInfo {
  spaceName: string;
  spaceId: string;
}


// This function can be simplified or potentially removed
export function mapLanguageCodeToEnum(code?: string): Language {
  if (!code) {
    return Language.ENGLISH; // Default language
  }
  const languageEntry = Object.entries(Language).find(([_, value]) => value === code);
  if (languageEntry) {
    return languageEntry[0] as Language;
  }
  throw new Error(`Unsupported language code: ${code}`);
}

// // Add this reverse mapping function
// export function mapLanguageEnumToCode(lang: Language): string {
//   return lang.toLowerCase();
// }

// Mapping object to allow safe lookup
const LanguageCodes: { [key in Language]: string } = {
  [Language.ENGLISH]: 'en',
  [Language.SPANISH]: 'es',
  [Language.FRENCH]: 'fr',
  [Language.GERMAN]: 'de',
  [Language.CHINESE]: 'zh'
};

// export function mapLanguageEnumToCode(lang: Language): string {
//   return LanguageCodes[lang];
// }

// Function that accepts a string representation like "FRENCH"
export function mapStringToLanguageCode(languageKey: string): string | undefined {
  // Convert the string to uppercase and check if it's a valid key
  const enumKey = languageKey.toUpperCase() as keyof typeof Language;
  const langEnumValue = Language[enumKey];

  // Return the corresponding language code if it exists
  return langEnumValue ? LanguageCodes[langEnumValue] : undefined;
}


