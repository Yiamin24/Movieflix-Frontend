// src/api/DashboardApi.ts
import { authAxios } from "./AuthToken";
import { MediaEntry } from "../types";

/* -------------------------------------------------------------------------- */
/* ✅ API Base URL Detection (Works for Local + Render + Vercel)              */
/* -------------------------------------------------------------------------- */
export let API_BASE_URL = "http://localhost:4000/api";

if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else if (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE_URL) {
  API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

/* -------------------------------------------------------------------------- */
/* ✅ Helper: Normalize Poster URL (Cloudinary or Local)                      */
/* -------------------------------------------------------------------------- */
export const withFullPosterURL = (entry: MediaEntry): MediaEntry => {
  const posterPath = (entry as any).poster ?? (entry as any).posterPath;

  if (!posterPath) {
    return { ...entry, poster: "/placeholder-image.png" };
  }

  // If it's already a Cloudinary or remote URL, return as is
  if (posterPath.startsWith("http")) {
    return { ...entry, poster: posterPath };
  }

  // Otherwise assume it's a local upload
  const base = API_BASE_URL.replace(/\/api$/, "");
  const normalized =
    posterPath.startsWith("/")
      ? `${base}${posterPath}`
      : `${base}/uploads/${posterPath}`;

  return { ...entry, poster: normalized };
};

/* -------------------------------------------------------------------------- */
/* ✅ Fetch All Entries                                                       */
/* -------------------------------------------------------------------------- */
export const getAllEntries = async (): Promise<MediaEntry[]> => {
  const response = await authAxios.get(`${API_BASE_URL}/entries`);
  return response.data.map(withFullPosterURL);
};

/* -------------------------------------------------------------------------- */
/* ✅ Add New Entry (FormData Supported)                                      */
/* -------------------------------------------------------------------------- */
export const addEntry = async (
  entry: FormData
): Promise<MediaEntry> => {
  const response = await authAxios.post(`${API_BASE_URL}/entries`, entry, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return withFullPosterURL(response.data);
};

/* -------------------------------------------------------------------------- */
/* ✅ Update Entry                                                            */
/* -------------------------------------------------------------------------- */
export const updateEntry = async (
  id: string,
  entry: FormData
): Promise<MediaEntry> => {
  const response = await authAxios.put(`${API_BASE_URL}/entries/${id}`, entry, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return withFullPosterURL(response.data);
};

/* -------------------------------------------------------------------------- */
/* ✅ Delete Entry                                                            */
/* -------------------------------------------------------------------------- */
export const deleteEntryById = async (id: string): Promise<void> => {
  await authAxios.delete(`${API_BASE_URL}/entries/${id}`);
};
