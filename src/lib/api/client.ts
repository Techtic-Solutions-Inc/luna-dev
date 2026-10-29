import axios from "axios";
import { getToken } from "../../hooks/useAuth";

const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";

export const apiClient = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const isLogin = config.url === "/api/auth/login" && config.method?.toLowerCase() === "post";
  if (!isLogin) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export async function fetchData(endpoint: string) {
  const response = await apiClient.get(endpoint);
  return response.data;
}
