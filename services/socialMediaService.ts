import { PagedResponse } from "@/app/utils/PagedResponse";
import { BASE_API, API } from "@/config/axiosInstances";

export interface SocialMediaResponse {
  id: number;
  name: string;
  link: string;
  imageBase64?: string; // Optional, only if images are returned in Base64 format
  image?: File | null; // For sending files
}

// Social Media Servisi
export const SocialMediaService = {
  // Get all social media (Paged)
  getAll: async (page: number = 0, size: number = 10): Promise<PagedResponse<SocialMediaResponse>> => {
    try {
      const response = await BASE_API.get<PagedResponse<SocialMediaResponse>>("/socialMedias", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching social media links:", error);
      throw error;
    }
  },

  // Create a new social media
  create: async (data: {
    name: string;
    link: string;
    imageBase64?: string; // Base64 string for the image
  }): Promise<void> => {
    try {
      const response = await API.post("/socialMedias", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating social media:", error);
      throw error;
    }
  },

  // Update a social media
  update: async (data: {
    id: number;
    name: string;
    link: string;
    imageBase64?: string; // Base64 string for the image
    isGetNewPicture: boolean;
  }): Promise<void> => {
    try {
      const response = await API.put("/socialMedias", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating social media:", error);
      throw error;
    }
  },

  // Get a social media by ID
  getById: async (id: number): Promise<SocialMediaResponse> => {
    try {
      const response = await API.get<SocialMediaResponse>(`/socialMedias/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching social media by ID:", error);
      throw error;
    }
  },

  // Delete a social media
  delete: async (id: number): Promise<void> => {
    try {
      await API.delete(`/socialMedias/${id}`);
    } catch (error) {
      console.error("Error deleting social media:", error);
      throw error;
    }
  },
};
