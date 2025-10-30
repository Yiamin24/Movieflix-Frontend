import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { ImageWithFallback } from "./image/ImageWithFallback";
import { MediaEntry } from "../types";

interface EntryFormProps {
  entry?: MediaEntry;
  onSubmit: (data: Omit<MediaEntry, "id" | "createdAt">, posterFile?: File | null) => void;
  onCancel: () => void;
}

export function EntryForm({ entry, onSubmit, onCancel }: EntryFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "MOVIE" as "MOVIE" | "TV_SHOW",
    director: "",
    budget: "",
    location: "",
    durationMin: "",
    year: "",
    posterPath: "",
    details: "",
  });

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (entry) {
      const possiblePoster =
        (entry as any).posterPath || entry.poster || (entry as any).posterUrl || "";

      setFormData({
        title: entry.title || "",
        type: (entry.type as any) || "MOVIE",
        director: entry.director || "",
        budget: entry.budget || "",
        location: entry.location || "",
        durationMin: (entry as any).durationMin || "",
        year: entry.year?.toString() || "",
        posterPath: possiblePoster,
        details: (entry as any).details || "",
      });

      if (possiblePoster) {
        if (possiblePoster.startsWith("http")) setImagePreview(possiblePoster);
        else if (possiblePoster.startsWith("/")) setImagePreview(`http://localhost:4000${possiblePoster}`);
        else setImagePreview(`http://localhost:4000/${possiblePoster}`);
      } else setImagePreview("");
    }
  }, [entry]);

  // ✅ Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPosterFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, posterPath: "" });
  };

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        type: formData.type,
        director: formData.director || undefined,
        budget: formData.budget || undefined,
        location: formData.location || undefined,
        durationMin: formData.durationMin || undefined,
        year: formData.year ? Number(formData.year) : undefined,
        details: formData.details || undefined,
      };

      onSubmit(payload as any, posterFile);
    } catch (err) {
      console.error("❌ Error preparing entry:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2>{entry ? "Edit Entry" : "Add New Entry"}</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "title", label: "Title", placeholder: "Enter title" },
              { id: "director", label: "Director", placeholder: "Enter director name" },
              { id: "budget", label: "Budget", placeholder: "e.g., $160M or $3M/episode" },
              { id: "location", label: "Location", placeholder: "Filming location" },
              { id: "durationMin", label: "Duration", placeholder: "e.g., 120 mins" },
              { id: "year", label: "Year", placeholder: "e.g., 2010" },
            ].map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  value={(formData as any)[f.id]}
                  onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                  placeholder={f.placeholder}
                  className="bg-input-background"
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "MOVIE" | "TV_SHOW") => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MOVIE">Movie</SelectItem>
                  <SelectItem value="TV_SHOW">TV Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Poster Upload */}
          <div className="space-y-3 border border-border rounded-lg p-4 bg-muted/20">
            <Label>Poster Image</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 gap-2"
                >
                  <Upload className="h-4 w-4" /> Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label htmlFor="poster-url" className="text-sm text-muted-foreground">
                  Or paste image URL
                </Label>
                <Input
                  id="poster-url"
                  value={formData.posterPath}
                  onChange={(e) => {
                    setPosterFile(null);
                    setFormData({ ...formData, posterPath: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://..."
                  className="bg-input-background"
                />
              </div>

              <div className="flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden border border-border">
                    <ImageWithFallback src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No image selected</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Brief details about the entry"
              rows={3}
              className="bg-input-background resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : entry ? "Update" : "Add"} Entry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
