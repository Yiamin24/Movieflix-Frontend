import axios from "axios";
import { getAuthToken, baseURL } from "./AuthToken";

const ENTRIES_URL = `${baseURL}/entries`;

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "multipart/form-data",
    },
  };
};

export const createEntry = async (entryData: any, posterFile?: File) => {
  const formData = new FormData();
  for (const key in entryData) {
    formData.append(key, entryData[key]);
  }
  if (posterFile) formData.append("poster", posterFile);

  const response = await axios.post(ENTRIES_URL, formData, getAuthHeaders());
  return response.data;
};

export const updateEntry = async (id: string, entryData: any, posterFile?: File) => {
  const formData = new FormData();
  for (const key in entryData) {
    formData.append(key, entryData[key]);
  }
  if (posterFile) formData.append("poster", posterFile);

  const response = await axios.put(`${ENTRIES_URL}/${id}`, formData, getAuthHeaders());
  return response.data;
};
