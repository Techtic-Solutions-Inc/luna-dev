import axios from "axios";
import { getToken } from "../../hooks/useAuth";
import { rejectSession } from "../apiRequest";

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

function handleUnauthorized(url: string | undefined, method: string | undefined): void {
  const isLogin = url === "/api/auth/login" && method?.toLowerCase() === "post";
  if (!isLogin) {
    rejectSession();
  }
}

apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      handleUnauthorized(response.config.url, response.config.method);
    }
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      handleUnauthorized(error.config?.url, error.config?.method);
    }
    return Promise.reject(error);
  },
);

export async function fetchData(endpoint: string) {
  const response = await apiClient.get(endpoint);
  return response.data;
}
