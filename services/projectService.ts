import { BASE_API, API } from "@/config/axiosInstances";

export const fetchProjects = async (page: number, size: number) => {
  try {
    const response = await BASE_API.get(`/projects?page=${page}&size=${size}`);
    return response.data || []; // Eğer veri yoksa boş dizi döndür
  } catch (error) {
    console.error("Proje çekilirken bir hata oldu", error);
    return [];
  }
};

export const fetchProjectById = async (id: number) => {
  try {
    const response = await API.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Proje detayları yüklenirken hata:", error);
    throw error;
  }
};

export const createProject = async (data: {
  title: string;
  detail: string;
  projectDate: string;
  liveSiteLink: string;
  githubLink: string;
  skillIds: number[];
  image?: File | null;
}) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("detail", data.detail);
  formData.append("projectDate", data.projectDate);
  formData.append("liveSiteLink", data.liveSiteLink);
  formData.append("githubLink", data.githubLink);
  data.skillIds.forEach((id) => formData.append("skillIds", id.toString()));
  if (data.image) {
    formData.append("image", data.image);
  }

  try {
    const response = await API.post("/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Proje oluşturulurken hata:", error);
    throw error;
  }
};

export const updateProject = async (data: {
  id: number;
  title: string;
  detail: string;
  projectDate: string;
  liveSiteLink: string;
  githubLink: string;
  skillIds: number[];
  imageBase64: File | null;
  isGetNewPicture: Boolean;
}) => {
  try {
    const response = await API.put("/projects", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Proje güncellenirken hata:", error);
    throw error;
  }
};

export const deleteProject = async (id: number) => {
  try {
    const response = await API.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Proje silinirken hata:", error);
    throw error;
  }
};
