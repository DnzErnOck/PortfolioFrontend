import { PagedResponse } from "@/app/utils/PagedResponse";
import { BASE_API ,API} from "@/config/axiosInstances";
export interface SkillResponse {
  id: number;
  name: string;
  imageBase64?: string; // Optional, only if images are returned in Base64 format
  image?: File | null;
}


// Skill Servisi
export const SkillService = {
  // Get all skills (Paged)
  getAll: async (page: number = 0, size: number = 10): Promise<PagedResponse<SkillResponse>> => {
    try {
      const response = await BASE_API.get<PagedResponse<SkillResponse>>("/skills", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching skills:", error);
      throw error;
    }
  },

 
  create : async (data: {
    name: string;
    imageBase64: File | null;
    isGetNewPicture: Boolean;
  }) => {
    try {
      const response = await API.post("/skills", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating skill:", error);
      throw error;
    }
  },

  // Update a skill
  update : async (data: {
    id: number;
    name: string;
    image: File | null;
    isGetNewPicture: Boolean;
  }) => {
    try {
      console.log(data);
      
      const response = await API.put("/skills", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating skill:", error);
      throw error;
    }
  },
  

  // Get a skill by ID
  getById: async (id: number): Promise<SkillResponse> => {
    try {
      const response = await API.get<SkillResponse>(`/skills/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching skill by ID:", error);
      throw error;
    }
  },

  // Delete a skill
  delete: async (id: number): Promise<void> => {
    try {
      await API.delete(`/skills/${id}`);
    } catch (error) {
      console.error("Error deleting skill:", error);
      throw error;
    }
  },
};
