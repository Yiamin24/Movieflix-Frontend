import axios from "axios";

const TOKEN_KEY = "auth_token";

export const setAuthToken = (token: string) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getAuthHeaders = (isFormData = false) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {};

  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  return { headers };
};

let baseURL = "http://localhost:4000/api";

if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) {
  baseURL = import.meta.env.VITE_API_BASE_URL;
} else if (
  typeof process !== "undefined" &&
  process.env?.REACT_APP_API_BASE_URL
) {
  baseURL = process.env.REACT_APP_API_BASE_URL;
}

export const authAxios = axios.create({ baseURL });

authAxios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
