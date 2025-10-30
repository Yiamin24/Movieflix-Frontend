import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MediaEntry } from "../types";
import { ImageWithFallback } from "./image/ImageWithFallback";

interface MediaCardProps {
  entry: MediaEntry;
  onEdit: (entry: MediaEntry) => void;
  onDelete: (entry: MediaEntry) => void;
}

export function MediaCard({ entry, onEdit, onDelete }: MediaCardProps) {
  const API_BASE_URL = "http://localhost:4000";

  
  const imageUrl = entry.poster
    ? entry.poster.startsWith("http")
      ? entry.poster
      : `${API_BASE_URL}${entry.poster.startsWith("/") ? entry.poster : "/" + entry.poster}`
    : "/placeholder-image.png";

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
      <div className="flex gap-4 p-4">
        <ImageWithFallback
          src={imageUrl}
          alt={entry.title}
          className="w-24 h-32 object-cover rounded flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="truncate mb-1">{entry.title}</h3>
              <Badge
                variant={entry.type === "Movie" ? "default" : "secondary"}
                className="mb-2"
              >
                {entry.type}
              </Badge>
            </div>

            <div className="flex gap-1 flex-shrink-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(entry)}
                className="h-8 w-8"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(entry)}
                className="h-8 w-8 hover:text-destructive"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              <span className="text-foreground">Director:</span> {entry.director}
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground">Budget:</span> {entry.budget}
            </p>
            <p className="text-muted-foreground">
              <span className="text-foreground">Location:</span> {entry.location}
            </p>

            <div className="flex gap-4">
              <p className="text-muted-foreground">
                <span className="text-foreground">Duration:</span> {entry.duration}
              </p>
              <p className="text-muted-foreground">
                <span className="text-foreground">Year:</span> {entry.year}
              </p>
            </div>

            {entry.description && (
              <p className="text-muted-foreground text-xs line-clamp-2 mt-2">
                {entry.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
