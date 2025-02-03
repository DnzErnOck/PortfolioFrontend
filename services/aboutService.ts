import { BASE_API, API } from "@/config/axiosInstances";

export const AboutService = {
  /**
   * Fetch all About records.
   * @returns {Promise<any>} List of About records or null if an error occurs.
   */
  async getAll(): Promise<any> {
    try {
      const response = await BASE_API.get(`/about`);
      return response.data;
    } catch (error) {
      console.error("Error fetching About data:", error);
      return null;
    }
  },

  /**
   * Fetch a single About record by ID.
   * @param {number} aboutId - The ID of the About record to fetch.
   * @returns {Promise<any>} The About record or null if an error occurs.
   */
  async getById(aboutId: number): Promise<any> {
    try {
      const response = await BASE_API.get(`/about/${aboutId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching About data:", error);
      return null;
    }
  },

  /**
   * Create a new About record.
   * @param {any} aboutData - The About data to create.
   * @returns {Promise<boolean>} True if creation succeeds, otherwise false.
   */
  async createAbout(aboutData: any): Promise<boolean> {
    try {
      await API.post(`/about`, aboutData);
      return true;
    } catch (error) {
      console.error("Error creating About data:", error);
      return false;
    }
  },

  /**
   * Update an existing About record.
   * @param {any} aboutData - The About data to update.
   * @returns {Promise<boolean>} True if the update succeeds, otherwise false.
   */
  async updateAbout(aboutData: any): Promise<boolean> {
    try {
      await API.put(`/about`, aboutData);
      return true;
    } catch (error) {
      console.error("Error updating About data:", error);
      return false;
    }
  },

  /**
   * Delete an About record by ID.
   * @param {number} aboutId - The ID of the About record to delete.
   * @returns {Promise<boolean>} True if deletion succeeds, otherwise false.
   */
  async deleteAbout(aboutId: number): Promise<boolean> {
    try {
      await API.delete(`/about/${aboutId}`);
      return true;
    } catch (error) {
      console.error("Error deleting About data:", error);
      return false;
    }
  },
};
