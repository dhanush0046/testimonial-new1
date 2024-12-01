//lib/dashboardApi.ts
import prisma from '@/lib/prisma'
import { CreateSpaceInput, DashboardData, Space,WallOfLoveSettings, ExtraSettings, Language, mapLanguageCodeToEnum } from "@/types/space";
import { CreateTestimonialInput, Testimonial } from "@/types/testimonial";

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}

export async function getTestimonials(spaceId: string): Promise<Testimonial[]> {
  const response = await fetch(`/api/get-testimonials?spaceId=${spaceId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }
  return response.json();
}

export async function getTestimonial(testimonialId: string): Promise<Testimonial> {
  // Replace this with your actual API call
  const response = await fetch(`/api/testimonials/${testimonialId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonial');
  }
  return response.json();
}

export async function likeTestimonial(id: string): Promise<Testimonial> {
  const response = await fetch(`/api/testimonial/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to update testimonial');
  }
  return response.json();
}

export async function archiveTestimonial(id: string): Promise<Testimonial> {
  const response = await fetch(`/api/testimonial/archive`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to archive testimonial');
  }
  return response.json();
}

export async function highlightTestimonial(id: string): Promise<Testimonial> {
  const response = await fetch(`/api/testimonial/highlight`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to highlight testimonial');
  }
  return response.json();
}

export async function deleteTestimonial(id: string): Promise<Testimonial> {
  const response = await fetch(`/api/testimonial/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete testimonial');
  }
  return response.json();
}

export async function updateTestimonialTags(id: string, tags: string[]): Promise<Testimonial> {
  const response = await fetch(`/api/testimonial/update-tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, tags }),
  });
  if (!response.ok) {
    throw new Error('Failed to update testimonial tags');
  }
  return response.json();
}

export async function fetchTestimonialTags(testimonialId: string): Promise<string[]> {
  try {
    const response = await fetch(`/api/testimonial/${testimonialId}/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch testimonial tags');
    }

    const data = await response.json();
    return data.tags;
  } catch (error) {
    console.error('Error fetching testimonial tags:', error);
    throw error;
  }
}

export async function deleteSpace(spaceId: string): Promise<void> {
  const response = await fetch(`/api/spaces/${spaceId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete space');
  }
}

//===========================================
//lib/dashboardApi.ts -- tags
export interface Tag {
  id: string;
  name: string;
  displayOnWall: boolean;
  isActive: boolean;
  position: number;
}

export async function fetchTags(spaceId: string): Promise<Tag[]> {
  const response = await fetch(`/api/spaces/${spaceId}/tags`);
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  return response.json();
}

export async function fetchSpace(spaceId: string): Promise<Space> {
  const response = await fetch(`/api/spaces/${spaceId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch space');
  }
  return response.json();
}

export async function updateTagsDisplayOnWall(spaceId: string, tagsDisplayOnWall: boolean): Promise<void> {
  const response = await fetch(`/api/spaces/${spaceId}/tags-display`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ tagsDisplayOnWall }),
  });
  if (!response.ok) {
    throw new Error('Failed to update tags display on wall');
  }
}

export async function createTag(spaceId: string, name: string, position: number): Promise<Tag> {
  const response = await fetch(`/api/spaces/${spaceId}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, position })
  });
  if (!response.ok) {
    throw new Error('Failed to create tag');
  }
  return response.json();
}

export async function deleteTag(spaceId: string, tagId: string): Promise<void> {
  const response = await fetch(`/api/spaces/${spaceId}/tags/${tagId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete tag');
  }
}

export async function updateTag(spaceId: string, tagId: string, updates: Partial<Tag>): Promise<Tag> {
  const response = await fetch(`/api/spaces/${spaceId}/tags/${tagId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) {
    throw new Error('Failed to update tag');
  }
  return response.json();
}

export async function reorderTags(spaceId: string, tags: Tag[]): Promise<void> {
  const response = await fetch(`/api/spaces/${spaceId}/tags`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags })
  });
  if (!response.ok) {
    throw new Error('Failed to reorder tags');
  }
}

//===========================================

interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
}

export async function generateApiKey(spaceId: string): Promise<ApiKey> {
  const response = await fetch(`/api/spaces/${spaceId}/api-key`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to generate API key');
  }
  const data = await response.json();
  return data.apiKey;
}

export async function getApiKeys(spaceId: string): Promise<ApiKey[]> {
  const response = await fetch(`/api/spaces/${spaceId}/api-key`);
  if (!response.ok) {
    throw new Error('Failed to fetch API keys');
  }
  const data = await response.json();
  return data.apiKeys;
}

export async function deleteApiKey(spaceId: string, apiKeyId: string): Promise<void> {
  const response = await fetch(`/api/spaces/${spaceId}/api-key?apiKeyId=${apiKeyId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete API key');
  }
}

//===========================================
// export async function generateApiKey(spaceId: string): Promise<string> {
//   const response = await fetch(`/api/spaces/${spaceId}/api-key`, {
//     method: 'POST',
//   });
//   if (!response.ok) {
//     throw new Error('Failed to generate API key');
//   }
//   const data = await response.json();
//   return data.apiKey;
// }

// export async function getApiKeys(spaceId: string): Promise<{ id: string; createdAt: string }[]> {
//   const response = await fetch(`/api/spaces/${spaceId}/api-key`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch API keys');
//   }
//   const data = await response.json();
//   return data.apiKeys;
// }

// export async function deleteApiKey(spaceId: string, apiKeyId: string): Promise<void> {
//   const response = await fetch(`/api/spaces/${spaceId}/api-key?apiKeyId=${apiKeyId}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     throw new Error('Failed to delete API key');
//   }
// }