import axios from 'axios';
import { BASE_URL } from "@/config/config";



export const fetchProjects = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/projects?page=${page}&size=${size}`);
    console.log("API yanıtı:", response.data);
    return response.data || []; // Eğer veri yoksa boş dizi döndür
  } catch (error) {
    console.error("Proje çekilirken bir hata oldu", error);
    return [];
  }
};
