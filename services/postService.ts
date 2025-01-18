import { PagedResponse } from "@/app/utils/PagedResponse";
import { BASE_API, API } from "@/config/axiosInstances";

// Post Response Interface
export interface PostResponse {
  id: number;
  title: string;
  elements: PostContent[];
  isActive: boolean;
}

// Post Content Interface
export interface PostContent {
  id?: number;
  contentType: string; // TEXT, IMAGE, etc.
  content: string;     // Text or file name for images
  imageBase64?: string; // Base64 encoded image
  isGetNewPicture?: boolean;
}

// Post Servisi
export const PostService = {
  /**
   * Postları sayfalama ile getir
   * @param page Sayfa numarası (default: 0)
   * @param size Sayfa boyutu (default: 10)
   */
  getAll: async (
    page: number = 0,
    size: number = 10,
    search: string = "",
    sort: string = ""
  ): Promise<PagedResponse<PostResponse>> => {
    try {
      const response = await BASE_API.get<PagedResponse<PostResponse>>("/posts", {
        params: { page, size, search, sort },
      });
      console.log("response", response.data);
  
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  

  /**
   * Yeni bir post oluştur
   * @param formData FormData ile gönderilen post verileri
   */
  create: async (formData: FormData) => {
    try {
      const response = await API.post<PostResponse>("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  /**
   * Postu güncelle
   * @param formData FormData ile gönderilen güncellenmiş post verileri
   */
  update: async (formData: FormData): Promise<PostResponse> => {
    try {
      const response = await API.put<PostResponse>("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  },

  /**
   * Post detayını getir
   * @param id Post ID
   */
  getById: async (id: number): Promise<PostResponse> => {
    try {
      const response = await API.get<PostResponse>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw error;
    }
  },

  /**
   * Postu sil
   * @param id Silinecek post ID
   */
  delete: async (id: number): Promise<void> => {
    try {
      await API.delete(`/posts/${id}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },
};
