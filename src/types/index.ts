export interface MediaEntry {
  id: string;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  poster: string;
  description?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
