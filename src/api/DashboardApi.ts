// src/api/DashboardApi.ts
import { authAxios } from "./AuthToken";
import { MediaEntry } from "../types";

export let API_BASE_URL = "http://localhost:4000/api";

if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else if (
  typeof process !== "undefined" &&
  process.env?.REACT_APP_API_BASE_URL
) {
  API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

/* ✅ Ensure full poster URL */
export const withFullPosterURL = (entry: MediaEntry): MediaEntry => {
  const posterPath = (entry as any).poster ?? (entry as any).posterPath;

  const base = API_BASE_URL.replace(/\/api$/, "");
  const resolved =
    posterPath && typeof posterPath === "string"
      ? posterPath.startsWith("http")
        ? posterPath
        : posterPath.startsWith("/")
        ? `${base}${posterPath}`
        : `${base}/${posterPath}`
      : "/placeholder-image.png";

  return { ...entry, poster: resolved };
};

/* ✅ Fetch all entries */
export const getAllEntries = async (): Promise<MediaEntry[]> => {
  const response = await authAxios.get(`${API_BASE_URL}/entries`);
  return response.data.map(withFullPosterURL);
};

/* ✅ Add new entry (JSON only) */
export const addEntry = async (
  entry: Omit<MediaEntry, "id" | "createdAt">
): Promise<MediaEntry> => {
  const response = await authAxios.post(`${API_BASE_URL}/entries`, entry);
  return withFullPosterURL(response.data);
};

/* ✅ Update entry */
export const updateEntry = async (
  id: string,
  entry: Omit<MediaEntry, "id" | "createdAt">
): Promise<MediaEntry> => {
  const response = await authAxios.put(`${API_BASE_URL}/entries/${id}`, entry);
  return withFullPosterURL(response.data);
};

/* ✅ Delete entry */
export const deleteEntryById = async (id: string): Promise<void> => {
  await authAxios.delete(`${API_BASE_URL}/entries/${id}`);
};
