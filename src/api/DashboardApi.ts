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

export const withFullPosterURL = (entry: MediaEntry): MediaEntry => {
  const posterPath = (entry as any).poster ?? (entry as any).posterPath;

  const resolved =
    posterPath && typeof posterPath === "string"
      ? posterPath.startsWith("http")
        ? posterPath
        : posterPath.startsWith("/")
        ? `${API_BASE_URL.replace(/\/api$/, "")}${posterPath}`
        : `${API_BASE_URL.replace(/\/api$/, "")}/${posterPath}`
      : "/placeholder-image.png";

  return {
    ...entry,
    poster: resolved,
  };
};

export const getAllEntries = async (): Promise<MediaEntry[]> => {
  const response = await authAxios.get("/entries");
  return response.data.map(withFullPosterURL);
};

export const addEntry = async (
  entry: Omit<MediaEntry, "id" | "createdAt">
): Promise<MediaEntry> => {
  const response = await authAxios.post("/entries", entry);
  return withFullPosterURL(response.data);
};

export const updateEntry = async (
  id: string,
  entry: Omit<MediaEntry, "id" | "createdAt">
): Promise<MediaEntry> => {
  const response = await authAxios.put(`/entries/${id}`, entry);
  return withFullPosterURL(response.data);
};

export const deleteEntryById = async (id: string): Promise<void> => {
  await authAxios.delete(`/entries/${id}`);
};
