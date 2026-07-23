'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, ChevronRight, ChevronDown, Image as ImageIcon } from 'lucide-react';
import type { Story } from '@/lib/seedStories';
import StoryPostModal from './StoryPostModal';

export default function EventGallery() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories');
        if (response.ok) {
          const data = (await response.json()) as Story[];
          setStories(data);
        }
      } catch (error) {
        console.error('Failed to load stories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const openModal = (story: Story) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };

  return (
    <section className="py-16 bg-gray-50 w-full overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c084fc; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9333ea; 
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c084fc #f3f4f6;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Stories from the <span className="text-purple-600">Ground</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Witness our impact in action. Click any story to view the full post with caption and location.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center text-purple-600 font-medium">
            <span className="mr-2">Scroll to explore</span>
            <ChevronRight className="hidden md:block animate-pulse" />
            <ChevronDown className="block md:hidden animate-pulse" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-w-[320px] h-[380px] md:h-[450px] rounded-3xl bg-purple-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:pb-6 pt-4 md:snap-x md:snap-mandatory custom-scrollbar">
            {stories.map((story) => (
              <button
                key={story.id}
                type="button"
                onClick={() => openModal(story)}
                className="relative w-full md:w-auto md:min-w-[400px] h-[380px] md:h-[450px] rounded-3xl overflow-hidden md:snap-center cursor-pointer group shadow-lg md:flex-shrink-0 text-left"
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent transition-opacity duration-300 group-hover:from-purple-900/90" />

                <div className="absolute bottom-0 w-full p-6 text-white transform transition-transform duration-300">
                  <div className="flex items-center space-x-2 text-sm text-purple-200 mb-3">
                    <Calendar size={16} />
                    <span>{story.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                    {story.caption}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <MapPin size={16} />
                      <span>{story.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      <ImageIcon size={14} />
                      <span>{story.gallery.length}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedStory && (
        <StoryPostModal story={selectedStory} onClose={closeModal} />
      )}
    </section>
  );
}
