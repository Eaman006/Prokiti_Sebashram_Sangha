"use client";

import { useRef, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import type { Story } from "@/lib/seedStories";

const StoryUploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) return;

    setFiles((prev) => [...prev, ...imageFiles]);
    setPreviews((prev) => [
      ...prev,
      ...imageFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const resetForm = () => {
    setTitle("");
    setCaption("");
    setLocation("");
    setDate("");
    setFiles([]);
    previews.forEach((preview) => URL.revokeObjectURL(preview));
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("location", location);
      if (date) formData.append("date", date);
      files.forEach((file) => formData.append("images", file));

      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as Story | { error: string };

      if (!response.ok) {
        throw new Error("error" in data ? data.error : "Upload failed.");
      }

      resetForm();
      setMessage({
        type: "success",
        text: "Story posted successfully! It will appear in Stories from the Ground on the home page.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Upload failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-black mb-2">
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. School outreach program"
            className="w-full rounded-2xl border border-purple-200 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-bold text-black mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Coastal Zone, South 24 Pgs"
            className="w-full rounded-2xl border border-purple-200 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="caption" className="block text-sm font-bold text-black mb-2">
          Caption
        </label>
        <textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write the story caption that visitors will see on the post..."
          rows={4}
          className="w-full rounded-2xl border border-purple-200 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-bold text-black mb-2">
          Event Date (optional)
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full md:w-auto rounded-2xl border border-purple-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-purple-200 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center gap-4 bg-purple-50/50 hover:border-purple-400 transition duration-300 cursor-pointer"
      >
        <div className="bg-purple-600 text-white p-4 rounded-2xl shadow-purple-400 shadow-lg">
          <MdCloudUpload className="text-4xl" />
        </div>
        <p className="text-black font-bold text-lg">Drag and drop photos here</p>
        <p className="text-gray-500 text-sm">or click to browse from your device</p>
        <button
          type="button"
          className="bg-purple-600 py-2 px-6 font-bold rounded-2xl text-white hover:bg-purple-800 transition duration-300 shadow-purple-400 shadow-lg"
        >
          Choose Photos
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={preview} className="relative rounded-xl overflow-hidden shadow-md">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover" />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {message && (
        <div
          className={`rounded-2xl px-4 py-3 font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || files.length === 0}
        className="bg-purple-600 py-3 px-8 font-bold rounded-2xl text-white hover:bg-purple-800 transition duration-300 shadow-purple-400 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Posting..." : "Post to Stories from the Ground"}
      </button>
    </form>
  );
};

export default StoryUploadForm;
