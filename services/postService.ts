import { BASE_API, API } from "@/config/axiosInstances";

export interface Post {
  id?: number;
  title: string;
  content: string;
  image?: File | null;
}

export interface PaginatedPosts {
  content: Post[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const PostService = {
  /**
   * Yeni bir post oluştur
   * @param formData FormData ile gönderilen post verisi (ör: başlık, içerik, resim)
   */
  async createPost(formData: FormData): Promise<Post> {
    try {
      const response = await API.post<Post>("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  /**
   * Postları sayfalama ile getir
   * @param page Sayfa numarası (default: 0)
   * @param size Sayfa boyutu (default: 10)
   * @param search Arama terimi (optional)
   * @param sort Sıralama kriteri (optional)
   */
  async fetchPosts(
    page: number = 0,
    size: number = 10,
    search: string = "",
    sort: string = ""
  ): Promise<PaginatedPosts> {
    try {
      const response = await BASE_API.get<PaginatedPosts>("/posts", {
        params: {
          page,
          size,
          search,
          sort,
        },
      });
      return response.data; // Backend'in döndüğü sayfalama bilgilerini döndür
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  /**
   * Post detayını getir
   * @param id Post ID
   */
  async getPostById(id: number): Promise<Post> {
    try {
      const response = await BASE_API.get<Post>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw error;
    }
  },

  /**
   * Post güncelle
   * @param id Güncellenecek post ID
   * @param formData FormData ile güncellenmiş post verisi
   */
  async updatePost(id: number, formData: FormData): Promise<Post> {
    try {
      const response = await API.put<Post>(`/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  },

  /**
   * Post sil
   * @param id Silinecek post ID
   */
  async deletePost(id: number): Promise<void> {
    try {
      await API.delete(`/posts/${id}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },
};
