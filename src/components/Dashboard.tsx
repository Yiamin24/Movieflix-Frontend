// src/components/Dashboard.tsx
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Film,
  Tv,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { MediaEntry } from "../types";
import { EntryForm } from "./EntryForm";
import { DeleteDialog } from "./DeleteDialog";
import { ImageWithFallback } from "./image/ImageWithFallback";
import { MediaCard } from "./MediaCard";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

import {
  getAllEntries,
  addEntry as addEntryJson,
  updateEntry as updateEntryJson,
  deleteEntryById,
  withFullPosterURL,
  API_BASE_URL,
} from "../api/DashboardApi";

import {
  createEntry as createEntryMultipart,
  updateEntry as updateEntryMultipart,
} from "../api/EntryFormApi";

interface DashboardProps {
  initialData: MediaEntry[];
}

export function Dashboard({ initialData }: DashboardProps) {
  const [entries, setEntries] = useState<MediaEntry[]>(initialData);
  const [displayedEntries, setDisplayedEntries] = useState<MediaEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<MediaEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MediaEntry | undefined>();
  const [deleteEntry, setDeleteEntry] = useState<MediaEntry | undefined>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isMobile, setIsMobile] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 15;

  const refreshEntries = async () => {
    try {
      setLoading(true);
      const apiData = await getAllEntries();
      const normalized = apiData.map(withFullPosterURL);
      setEntries(normalized);
    } catch (error) {
      console.error("Error refreshing entries:", error);
      toast.error("Failed to refresh entries from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let filtered = entries;
    if (searchQuery) {
      filtered = filtered.filter(
        (entry) =>
          (entry.title || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (entry.director || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (entry.location || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter((entry) =>
        ((entry.type || "") as string)
          .toLowerCase()
          .includes(typeFilter.toLowerCase())
      );
    }
    setFilteredEntries(filtered);
    setPage(1);
  }, [entries, searchQuery, typeFilter]);

  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedEntries(filteredEntries.slice(0, endIndex));
  }, [filteredEntries, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (obsEntries) => {
        if (
          obsEntries[0].isIntersecting &&
          displayedEntries.length < filteredEntries.length
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [displayedEntries.length, filteredEntries.length]);

  /* ✅ Cloudinary-aware normalization */
  const normalizeEntry = (e: any): MediaEntry => {
    try {
      return withFullPosterURL(e);
    } catch {
      const posterPath = e.poster ?? e.posterPath;
      let poster = "/placeholder-image.png";

      if (posterPath && typeof posterPath === "string") {
        if (
          posterPath.startsWith("http") ||
          posterPath.includes("res.cloudinary.com")
        ) {
          poster = posterPath;
        } else if (posterPath.startsWith("/")) {
          poster = `${API_BASE_URL}${posterPath}`;
        } else {
          poster = `${API_BASE_URL}/uploads/${posterPath}`;
        }
      }

      return { ...e, poster } as MediaEntry;
    }
  };

  const handleAddEntry = async (
    data: Omit<MediaEntry, "id" | "createdAt">,
    posterFile?: File | null
  ) => {
    try {
      setLoading(true);
      let created;
      if (posterFile) {
        created = await createEntryMultipart(data, posterFile);
      } else {
        created = await addEntryJson(data);
      }
      const normalized = normalizeEntry(created);
      setShowForm(false);
      toast.success(`"${data.title}" added successfully!`);
      await refreshEntries();
    } catch (error) {
      console.error("Add entry failed:", error);
      toast.error("Failed to add entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditEntry = async (
    data: Omit<MediaEntry, "id" | "createdAt">,
    posterFile?: File | null
  ) => {
    if (!editingEntry) return;
    try {
      setLoading(true);
      let updated;
      if (posterFile) {
        updated = await updateEntryMultipart(
          editingEntry.id.toString(),
          data,
          posterFile
        );
      } else {
        updated = await updateEntryJson(editingEntry.id.toString(), data);
      }
      const normalized = normalizeEntry(updated);
      setEditingEntry(undefined);
      toast.success(`"${data.title}" updated successfully!`);
      await refreshEntries();
    } catch (error) {
      console.error("Edit entry failed:", error);
      toast.error("Failed to update entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async () => {
    if (deleteEntry) {
      try {
        setLoading(true);
        await deleteEntryById(deleteEntry.id);
        toast.success(`"${deleteEntry.title}" deleted successfully.`);
        setDeleteEntry(undefined);
        await refreshEntries();
      } catch (error) {
        console.error("Delete entry failed:", error);
        toast.error("Failed to delete entry.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-full overflow-y-auto pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-[1600px]">
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1>My Collection</h1>
              <p className="text-muted-foreground mt-1">
                Manage your favorite movies and TV shows
              </p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90 gap-2 w-full lg:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add New Entry
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, director, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-input-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="movie">Movies</SelectItem>
                <SelectItem value="tv">TV Shows</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("table")}
                className="hidden md:flex"
                title="Table View"
              >
                <TableIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="hidden md:flex"
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Grid or Table View */}
        {viewMode === "grid" || isMobile ? (
          <div
            className="overflow-auto"
            style={{ height: "calc(100vh - 440px)", minHeight: "300px" }}
          >
            <div className="grid grid-cols-1 gap-4">
              {displayedEntries.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center text-muted-foreground">
                  {searchQuery || typeFilter !== "all"
                    ? "No entries found matching your filters"
                    : "No entries yet. Add your first movie or TV show!"}
                </div>
              ) : (
                displayedEntries.map((entry) => (
                  <MediaCard
                    key={entry.id}
                    entry={entry}
                    onEdit={setEditingEntry}
                    onDelete={setDeleteEntry}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div
            ref={tableContainerRef}
            className="bg-card border border-border rounded-lg overflow-hidden"
            style={{ height: "calc(100vh - 440px)", minHeight: "300px" }}
          >
            <div className="overflow-auto h-full custom-scrollbar">
              <table className="w-full" style={{ minWidth: "1200px" }}>
                <thead className="bg-muted/50 border-b border-border sticky top-0 z-10">
                  <tr>
                    <th className="text-left p-3">Poster</th>
                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Director</th>
                    <th className="text-left p-3">Budget</th>
                    <th className="text-left p-3">Location</th>
                    <th className="text-left p-3">Duration</th>
                    <th className="text-left p-3">Year</th>
                    <th className="text-left p-3 sticky right-0 bg-muted/50">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEntries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center p-12 text-muted-foreground"
                      >
                        {searchQuery || typeFilter !== "all"
                          ? "No entries found matching your filters"
                          : "No entries yet. Add your first movie or TV show!"}
                      </td>
                    </tr>
                  ) : (
                    displayedEntries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-3">
                          <ImageWithFallback
                            src={
                              entry.poster?.includes("res.cloudinary.com")
                                ? entry.poster
                                : entry.poster?.startsWith("http")
                                ? entry.poster
                                : `${API_BASE_URL}${entry.poster}`
                            }
                            alt={entry.title}
                            className="w-14 h-20 object-cover rounded"
                          />
                        </td>
                        <td className="p-3">
                          <div className="max-w-[250px]">
                            <p className="truncate">{entry.title}</p>
                            {entry.details && (
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {entry.details}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={
                              ((entry.type || "") as string)
                                .toLowerCase()
                                .includes("movie")
                                ? "default"
                                : "secondary"
                            }
                            className="whitespace-nowrap"
                          >
                            {entry.type}
                          </Badge>
                        </td>
                        <td className="p-3">{entry.director}</td>
                        <td className="p-3 whitespace-nowrap">
                          {entry.budget}
                        </td>
                        <td className="p-3">{entry.location}</td>
                        <td className="p-3 whitespace-nowrap">
                          {(entry as any).durationMin}
                        </td>
                        <td className="p-3 whitespace-nowrap">{entry.year}</td>
                        <td className="p-3 sticky right-0 bg-card border-l border-border">
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setEditingEntry(entry)}
                              className="h-8 w-8"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setDeleteEntry(entry)}
                              className="h-8 w-8 hover:text-destructive"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <EntryForm
          onSubmit={handleAddEntry}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingEntry && (
        <EntryForm
          entry={editingEntry}
          onSubmit={(data, posterFile) =>
            handleEditEntry(data, posterFile ?? undefined)
          }
          onCancel={() => setEditingEntry(undefined)}
        />
      )}

      {deleteEntry && (
        <DeleteDialog
          open={!!deleteEntry}
          title={deleteEntry.title}
          onConfirm={handleDeleteEntry}
          onCancel={() => setDeleteEntry(undefined)}
        />
      )}
    </div>
  );
}
