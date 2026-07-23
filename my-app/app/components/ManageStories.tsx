"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  MapPin,
  Trash2,
  Edit2,
  Search,
  RefreshCw,
  Image as ImageIcon,
  AlertTriangle,
  X,
  Plus,
} from "lucide-react";
import type { Story } from "@/lib/seedStories";
import { compressAndConvertToDataUrl } from "@/lib/imageUtils";

export default function ManageStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmStory, setConfirmStory] = useState<Story | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDate, setEditDate] = useState("");
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stories");
      if (res.ok) {
        const data = (await res.json()) as Story[];
        setStories(data);
      } else {
        setMessage({ type: "error", text: "Failed to fetch stories." });
      }
    } catch {
      setMessage({ type: "error", text: "Error loading stories from server." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const openEditModal = (story: Story) => {
    setEditingStory(story);
    setEditTitle(story.title);
    setEditCaption(story.caption);
    setEditLocation(story.location);
    setEditDate("");
    setExistingGallery([...story.gallery]);
    setNewImageFiles([]);
    setNewImagePreviews([]);
  };

  const closeEditModal = () => {
    setEditingStory(null);
    newImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setNewImagePreviews([]);
    setNewImageFiles([]);
  };

  const handleNewFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const images = Array.from(selectedFiles).filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) return;

    setNewImageFiles((prev) => [...prev, ...images]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...images.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeExistingPhoto = (index: number) => {
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewPhoto = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    if (existingGallery.length === 0 && newImageFiles.length === 0) {
      setMessage({
        type: "error",
        text: "Story must have at least one photo.",
      });
      return;
    }

    setIsUpdating(true);
    setMessage(null);

    try {
      const newImagesDataUrls = await Promise.all(
        newImageFiles.map((file) => compressAndConvertToDataUrl(file))
      );

      const res = await fetch("/api/stories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingStory.id,
          title: editTitle,
          caption: editCaption,
          location: editLocation,
          date: editDate,
          existingGallery,
          newImages: newImagesDataUrls,
        }),
      });

      if (!res.ok) {
        const errData = (await res.json()) as { error?: string };
        throw new Error(errData.error || "Failed to update story.");
      }

      const updatedStory = (await res.json()) as Story;

      setStories((prev) =>
        prev.map((s) => (s.id === updatedStory.id ? updatedStory : s))
      );

      setMessage({
        type: "success",
        text: `Story "${updatedStory.title}" updated successfully!`,
      });

      closeEditModal();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update story.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (story: Story) => {
    setDeletingId(story.id);
    setMessage(null);
    try {
      const res = await fetch(`/api/stories?id=${encodeURIComponent(story.id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStories((prev) => prev.filter((s) => s.id !== story.id));
        setMessage({
          type: "success",
          text: `Story "${story.title}" removed successfully!`,
        });
      } else {
        const errorData = (await res.json()) as { error?: string };
        throw new Error(errorData.error || "Failed to delete story.");
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete story.",
      });
    } finally {
      setDeletingId(null);
      setConfirmStory(null);
    }
  };

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header controls & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stories by title, location, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-200 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="button"
          onClick={fetchStories}
          className="flex items-center justify-center gap-2 bg-white border border-purple-200 text-purple-700 hover:bg-purple-100 font-bold px-4 py-3 rounded-xl transition duration-200 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Notification message */}
      {message && (
        <div
          className={`p-4 rounded-2xl font-medium flex items-center justify-between transition ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <span>{message.text}</span>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="text-sm font-bold opacity-75 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Stories Count */}
      <div className="flex justify-between items-center text-sm font-bold text-gray-600 px-1">
        <span>
          Showing {filteredStories.length} of {stories.length} stories
        </span>
      </div>

      {/* Stories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-80 bg-purple-100/60 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="text-center py-16 bg-purple-50/40 rounded-3xl border border-dashed border-purple-200">
          <p className="text-xl font-bold text-gray-700 mb-2">No stories found</p>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchQuery
              ? `No stories match "${searchQuery}". Try a different keyword.`
              : "There are currently no active stories."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-purple-100 shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{story.gallery.length} photos</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center text-xs font-bold text-purple-600 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {story.date}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {story.location}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {story.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {story.caption}
                  </p>
                </div>
              </div>

              {/* Actions Footer (Edit & Delete side by side) */}
              <div className="p-5 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => openEditModal(story)}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white font-bold py-2.5 px-4 rounded-2xl transition duration-200 text-sm shadow-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmStory(story)}
                  disabled={deletingId === story.id}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold py-2.5 px-4 rounded-2xl transition duration-200 text-sm shadow-sm disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>
                    {deletingId === story.id ? "Deleting..." : "Delete"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Story Modal */}
      {editingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto my-8">
            <div className="flex justify-between items-center border-b border-purple-100 pb-4">
              <div>
                <h3 className="text-2xl font-extrabold text-purple-600">
                  Edit Story
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">
                  Update title, caption, location, date, or photos.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-2xl border border-purple-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full rounded-2xl border border-purple-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Caption
                </label>
                <textarea
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-purple-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Event Date (leave blank to keep existing date: {editingStory.date})
                </label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full md:w-auto rounded-2xl border border-purple-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Existing & New Gallery Photos */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Manage Photos
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                  {existingGallery.map((imgUrl, index) => (
                    <div
                      key={imgUrl}
                      className="relative rounded-xl overflow-hidden shadow-sm h-24 border border-purple-100 group"
                    >
                      <img
                        src={imgUrl}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingPhoto(index)}
                        className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {newImagePreviews.map((preview, index) => (
                    <div
                      key={preview}
                      className="relative rounded-xl overflow-hidden shadow-sm h-24 border border-purple-300 ring-2 ring-purple-400 group"
                    >
                      <img
                        src={preview}
                        alt={`New ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewPhoto(index)}
                        className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-24 rounded-xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center gap-1 text-purple-600 hover:bg-purple-50 transition"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-xs font-bold">Add Photos</span>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleNewFiles(e.target.files)}
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-purple-100">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 rounded-2xl transition shadow-lg shadow-purple-500/30 disabled:opacity-50"
                >
                  {isUpdating ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-gray-900">
                Delete Story?
              </h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-bold text-gray-900">
                  "{confirmStory.title}"
                </span>
                ? This will remove it from the home page section immediately.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmStory(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmStory)}
                disabled={deletingId === confirmStory.id}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-2xl transition shadow-lg shadow-red-500/30 disabled:opacity-50"
              >
                {deletingId === confirmStory.id ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
