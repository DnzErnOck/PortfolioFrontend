import axios, { AxiosInstance } from "axios";

// Tokenlı API
export const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Interceptor for API
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response, // Başarılı yanıtları aynen döndür
  (error) => {
    if (error.response?.status === 401) {
      // Eğer hata 401 Unauthorized ise
      alert("Oturumunuz sona erdi. Lütfen tekrar giriş yapın.");
      localStorage.removeItem("token"); // Token'ı temizle
      window.location.href = "/auth"; // Giriş sayfasına yönlendir
    }
    return Promise.reject(error); // Diğer hataları döndür
  }
);

// Tokensız API
export const BASE_API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// BASE_API üzerinde herhangi bir authorization veya response handling yok!
