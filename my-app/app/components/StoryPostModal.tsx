"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Share2,
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
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-gray-100 hover:bg-purple-100 rounded-full text-gray-700 transition-colors"
          aria-label="Close post"
        >
          <X size={20} />
        </button>

        <header className="flex items-start gap-3 p-4 pb-3 border-b border-gray-100">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-purple-200">
            <Image src="/brand.png" alt="Prokriti Sebashram Sangha" fill className="object-cover" />
          </div>
          <div className="min-w-0 pr-8">
            <h3 className="font-bold text-gray-900 leading-tight">
              Prokriti Sebashram Sangha
            </h3>
            <p className="text-sm text-gray-500 flex flex-wrap items-center gap-1 mt-1">
              <Calendar size={14} className="shrink-0" />
              <span>{story.date}</span>
              <span>·</span>
              <MapPin size={14} className="shrink-0" />
              <span>{story.location}</span>
            </p>
          </div>
        </header>

        <div className="px-4 py-3">
          <h4 className="font-bold text-lg text-gray-900 mb-1">{story.title}</h4>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{story.caption}</p>
        </div>

        <div className="relative bg-gray-100">
          {story.gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-purple-600 hover:text-white text-gray-800 rounded-full shadow-md transition-all z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-purple-600 hover:text-white text-gray-800 rounded-full shadow-md transition-all z-10"
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <img
            src={story.gallery[currentPhotoIndex]}
            alt={`${story.title} - photo ${currentPhotoIndex + 1}`}
            className="w-full max-h-[420px] object-contain bg-gray-900/5"
          />

          {story.gallery.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {currentPhotoIndex + 1} / {story.gallery.length}
            </div>
          )}
        </div>

        {story.gallery.length > 1 && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto">
            {story.gallery.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setCurrentPhotoIndex(idx)}
                className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentPhotoIndex === idx
                    ? "border-purple-500 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <footer className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-purple-600 inline-flex items-center justify-center">
                <ThumbsUp size={12} className="text-white" />
              </span>
              Community support
            </span>
            <span>{story.gallery.length} photo{story.gallery.length > 1 ? "s" : ""}</span>
          </div>

          
        </footer>
      </article>
    </div>
  );
};

export default StoryPostModal;
