import { BASE_API } from "@/config/axiosInstances";

export const CourseService = {
  async fetchCourses(): Promise<any[]> {
    try {
      const response = await BASE_API.get("/courses");
      return response.data;
    } catch (error) {
      console.error("Kurslar çekilirken hata oluştu:", error);
      return [];
    }
  },

  async getCourseById(courseId: number): Promise<any> {
    try {
      const response = await BASE_API.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Kurs bilgisi alınırken hata oluştu:", error);
      throw new Error("Failed to fetch the course information.");
    }
  },

  async createCourse(courseData: any): Promise<void> {
    try {
      await BASE_API.post("/courses", courseData);
    } catch (error) {
      console.error("Kurs oluşturulurken hata oluştu:", error);
      throw new Error("Failed to create the course.");
    }
  },

  async updateCourse(courseId: number, courseData: any): Promise<void> {
    try {
      await BASE_API.put(`/courses/${courseId}`, courseData);
    } catch (error) {
      console.error("Kurs güncellenirken hata oluştu:", error);
      throw new Error("Failed to update the course.");
    }
  },

  async deleteCourse(courseId: number): Promise<void> {
    try {
      await BASE_API.delete(`/courses/${courseId}`);
    } catch (error) {
      console.error("Kurs silinirken hata oluştu:", error);
      throw new Error("Failed to delete the course.");
    }
  },
};
