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

// Tokensız API
export const BASE_API: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
