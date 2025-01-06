import { BASE_API } from "@/config/axiosInstances";


export const fetchAuth = async (): Promise<any> => {
  try {
    const response = await BASE_API.post(`/auth/createSecretPass`);
    return response.data;
  } catch (error) {
    console.error("Şifre alınırken hata oluştu:", error);
    throw error;
  }
};
