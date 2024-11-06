//lib/api.ts
import { CreateSpaceInput,DashboardData, Space, ExtraSettings } from "@/types/space";
import { CreateTestimonialInput, Testimonial } from "@/types/testimonial";

export async function getUploadUrl(file: File, uploadType: 'logo' | 'attachment' | 'photo'| 'thankYouImage' | 'openGraphImage'): Promise<{ uploadUrl: string; fileUrl: string }> {
  const response = await fetch(`/api/get-signed-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}&uploadType=${uploadType}`);

  if (!response.ok) {
    throw new Error('Failed to get upload URL');
  }

  return response.json();
}

export async function uploadFile(file: File, uploadType: 'logo' | 'attachment' | 'photo' | 'thankYouImage' | 'openGraphImage'): Promise<string> {
  const { uploadUrl, fileUrl } = await getUploadUrl(file, uploadType);

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload file');
  }

  return fileUrl;
}

export async function createSpace(input: CreateSpaceInput & ExtraSettings): Promise<Space> {

  let logoUrl = input.logo;
  let thankYouImageUrl = input.thankYouImage;
  let openGraphImageUrl = input.openGraphImage;


  if (input.logo instanceof File) {
    logoUrl = await uploadFile(input.logo, 'logo');
  }

  if (input.thankYouImage instanceof File) {
    thankYouImageUrl = await uploadFile(input.thankYouImage, 'thankYouImage');
  }

  if (input.openGraphImage instanceof File) {
    openGraphImageUrl = await uploadFile(input.openGraphImage, 'openGraphImage');
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const response = await fetch('/api/spaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      ...input, 
      logo: logoUrl, 
      thankYouImage: thankYouImageUrl, 
      openGraphImage: openGraphImageUrl ,
      origin , 
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create space");
  }

  const data = await response.json();
  if (!data.newSpace || !data.newSpace.id || !data.newSpace.shareableLink) {
    throw new Error("Invalid response from server");
  }

  return data.newSpace;
}

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}



export async function getSpace(spaceId: string): Promise<Space> {
  const response = await fetch(`/api/spaces/${spaceId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch space");
  }

  const data = await response.json();

  return data;
}

export async function createTestimonial(
  input: CreateTestimonialInput
): Promise<Testimonial> {
  console.log("create testimonial", input);
  const response = await fetch("/api/testimonials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData);
    throw new Error(errorData.message || "Failed to create testimonial");
  }

  return response.json();
}

export async function getSignedUrl(
  videoName: string,
  videoType: string,
  spaceId: string
): Promise<string> {
  const response = await fetch("/api/signed-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoName, videoType, spaceId }),
  });

  if (!response.ok) {
    throw new Error("Failed to get signed URL");
  }

  const { url } = await response.json();
  return url;
}


export async function updateSpace(spaceId: string, input: Partial<CreateSpaceInput & ExtraSettings>): Promise<Space> {
  let logoUrl = input.logo;
  let thankYouImageUrl = input.thankYouImage;
  let openGraphImageUrl = input.openGraphImage;

  if (input.logo instanceof File) {
    try {
      const { uploadUrl, fileUrl } = await getUploadUrl(input.logo, 'logo');
      await uploadFileToS3(uploadUrl, input.logo);
      logoUrl = fileUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  }

  if (input.thankYouImage instanceof File) {
    try {
      const { uploadUrl, fileUrl } = await getUploadUrl(input.thankYouImage, 'thankYouImage');
      await uploadFileToS3(uploadUrl, input.thankYouImage);
      thankYouImageUrl = fileUrl;
    } catch (error) {
      console.error('Error uploading thank you image:', error);
      throw error;
    }
  }

  if (input.openGraphImage instanceof File) {
    try {
      const { uploadUrl, fileUrl } = await getUploadUrl(input.openGraphImage, 'openGraphImage');
      await uploadFileToS3(uploadUrl, input.openGraphImage);
      openGraphImageUrl = fileUrl;
    } catch (error) {
      console.error('Error uploading open graph image:', error);
      throw error;
    }
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const response = await fetch(`/api/spaces/${spaceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      ...input, 
      logo: logoUrl, 
      thankYouImage: thankYouImageUrl, 
      openGraphImage: openGraphImageUrl,
      origin,
      }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update space");
  }

  const data = await response.json();
  if (!data.updatedSpace || !data.updatedSpace.id) {
    throw new Error("Invalid response from server");
  }

  return data.updatedSpace;
}

export async function uploadFileToS3(uploadUrl: string, file: File): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to S3');
  }
}

//================demo

// export async function uploadPhoto(file: File,spaceId: string): Promise<string> {
//   const formData = new FormData();
//   formData.append("photo", file);
//   formData.append("spaceId", spaceId); // Add the spaceId to the FormData

//   const response = await fetch("/api/upload-photo", {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to upload photo");
//   }

//   const { photoUrl } = await response.json();
//   return photoUrl;
// }