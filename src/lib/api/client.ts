import axios from "axios";
import { getToken } from "../../hooks/useAuth";
import { rejectSession } from "../apiRequest";

const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";

export const apiClient = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
  validateStatus: (status) => status >= 200 && status < 300,
});

function normalizeRequestPath(url: string | undefined, configBaseURL?: string): string {
  if (!url) {
    return "";
  }
  let path = url.split("?")[0] ?? "";
  const base = (configBaseURL ?? baseURL).replace(/\/+$/, "");
  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return path;
}

function isLoginRequest(url: string | undefined, method: string | undefined, configBaseURL?: string): boolean {
  const path = normalizeRequestPath(url, configBaseURL);
  return path === "/api/auth/login" && method?.toLowerCase() === "post";
}

apiClient.interceptors.request.use((config) => {
  if (!isLoginRequest(config.url, config.method, config.baseURL)) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (!isLoginRequest(error.config?.url, error.config?.method, error.config?.baseURL)) {
        rejectSession();
      }
    }
    return Promise.reject(error);
  },
);

export async function fetchData(endpoint: string) {
  const response = await apiClient.get(endpoint);
  return response.data;
}
