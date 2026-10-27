import axios, { type AxiosRequestConfig } from "axios";
import { clearReadPayloads } from "@/components/luna-figma/figmaDisplay";
import {
  clearSession,
  getStoredToken,
  notifyUnauthorized,
} from "@/lib/auth/session";

export { getApiErrorMessage } from "./getApiErrorMessage";

function apiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
  if (typeof raw !== "string") {
    return "";
  }
  return raw.replace(/\/+$/, "");
}

export const apiClient = axios.create({
  baseURL: apiBaseUrl(),
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearSession();
      clearReadPayloads();
      notifyUnauthorized();
    }
    return Promise.reject(error);
  },
);

export async function fetchData<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(path, config);
  return response.data;
}

export async function postData<T>(
  path: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.post<T>(path, body, config);
  return response.data;
}
