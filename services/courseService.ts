import { PagedResponse } from "@/app/utils/PagedResponse";
import { BASE_API, API } from "@/config/axiosInstances";

// Course Response Interface
export interface CourseResponse {
  id: number;
  name: string;
  instructor: string;
  detail: string;
  date: string;
}

// Course Create Request Interface
export interface CreateCourseRequest {
  name: string;
  instructor: string;
  detail: string;
  date: string;
}

// Course Update Request Interface
export interface UpdateCourseRequest {
  id: number;
  name: string;
  instructor: string;
  detail: string;
  date: string;
}

// Course Service
export const CourseService = {
  // Get all courses (Paged)
  getAll: async (page: number = 0, size: number = 10): Promise<PagedResponse<CourseResponse>> => {
    try {
      const response = await BASE_API.get<PagedResponse<CourseResponse>>("/courses", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  // Get a course by ID
  getById: async (id: number): Promise<CourseResponse> => {
    try {
      const response = await API.get<CourseResponse>(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      throw error;
    }
  },

  // Create a new course
  create: async (data: CreateCourseRequest): Promise<void> => {
    try {
      const response = await API.post("/courses", data);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  // Update an existing course
  update: async (data: UpdateCourseRequest): Promise<void> => {
    try {
      const response = await API.put("/courses", data);
      return response.data;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  // Delete a course
  delete: async (id: number): Promise<void> => {
    try {
      await API.delete(`/courses/${id}`);
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },
};
