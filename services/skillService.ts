import { BASE_API } from "@/config/axiosInstances";

export const SkillService = {
  /**
   * Get all skills.
   * @returns {Promise<any[]>} Array of skills or an empty array if an error occurs.
   */
  async getSkills(): Promise<any[]> {
    try {
      const response = await BASE_API.get("/skills");
      return response.data;
    } catch (error) {
      console.error("Skiller alınırken hata oluştu:", error);
      return [];
    }
  },

  /**
   * Get a skill by its ID.
   * @param {number} id - The ID of the skill.
   * @returns {Promise<any | null>} The skill object or null if an error occurs.
   */
  async getSkillById(id: number): Promise<any | null> {
    try {
      const response = await BASE_API.get(`/skills/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching skill by ID ${id}:`, error);
      return null;
    }
  },
};
