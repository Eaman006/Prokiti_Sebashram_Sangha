"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ThumbsUp,
  X,
} from "lucide-react";
import type { Story } from "@/lib/seedStories";

interface StoryPostModalProps {
  story: Story;
  onClose: () => void;
}

const StoryPostModal = ({ story, onClose }: StoryPostModalProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === story.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? story.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-hidden"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button always visible */}
        <header className="sticky top-0 z-20 flex items-center justify-between p-3.5 sm:p-4 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border-2 border-purple-200 shadow-sm">
              <Image
                src="/brand.png"
                alt="Prokriti Sebashram Sangha"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 leading-tight text-sm sm:text-base truncate">
                Prokriti Sebashram Sangha
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="shrink-0 text-purple-600" />
                  <span>{story.date}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 min-w-0">
                  <MapPin size={13} className="shrink-0 text-purple-600" />
                  <span className="truncate max-w-[130px] sm:max-w-[200px]">
                    {story.location}
                  </span>
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 bg-gray-100 hover:bg-purple-100 active:scale-95 rounded-full text-gray-700 hover:text-purple-700 transition-all shrink-0 cursor-pointer shadow-sm"
            aria-label="Close post"
          >
            <X size={20} />
          </button>
        </header>

        {/* Inner Scrollable Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <div className="px-4 py-3 sm:px-5 sm:py-4">
            <h4 className="font-bold text-base sm:text-xl text-gray-900 mb-1.5 leading-snug">
              {story.title}
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {story.caption}
            </p>
          </div>

          <div className="relative bg-gray-900/5">
            {story.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-white/90 hover:bg-purple-600 hover:text-white text-gray-800 rounded-full shadow-lg transition-all z-10 focus:outline-none active:scale-90"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-white/90 hover:bg-purple-600 hover:text-white text-gray-800 rounded-full shadow-lg transition-all z-10 focus:outline-none active:scale-90"
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <div className="flex items-center justify-center w-full min-h-[200px] max-h-[350px] sm:max-h-[440px] overflow-hidden bg-black/5">
              <img
                src={story.gallery[currentPhotoIndex]}
                alt={`${story.title} - photo ${currentPhotoIndex + 1}`}
                className="w-full max-h-[350px] sm:max-h-[440px] object-contain"
              />
            </div>

            {story.gallery.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                {currentPhotoIndex + 1} / {story.gallery.length}
              </div>
            )}
          </div>

          {story.gallery.length > 1 && (
            <div className="flex gap-2.5 px-4 py-3 sm:px-5 overflow-x-auto custom-scrollbar bg-gray-50/50 border-t border-gray-100">
              {story.gallery.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentPhotoIndex === idx
                      ? "border-purple-600 ring-2 ring-purple-600/30 scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <footer className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 inline-flex items-center justify-center shrink-0 shadow-sm">
                  <ThumbsUp size={11} className="text-white" />
                </span>
                <span className="font-medium text-gray-700">
                  Community support
                </span>
              </span>
              <span className="font-medium">
                {story.gallery.length} photo
                {story.gallery.length > 1 ? "s" : ""}
              </span>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default StoryPostModal;
