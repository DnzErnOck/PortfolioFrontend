import axios from "axios";
import { BASE_API, API } from "@/config/axiosInstances";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginUser = async (loginData: LoginRequest): Promise<LoginResponse | null> => {
  try {
    const response = await BASE_API.post(`/auth/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Giriş sırasında hata oluştu:", error);
    return null;
  }
};
