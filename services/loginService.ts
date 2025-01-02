import axios from "axios";
import { BASE_URL } from "@/config/config";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginUser = async (loginData: LoginRequest): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Giriş sırasında hata oluştu:", error);
    return null;
  }
};
