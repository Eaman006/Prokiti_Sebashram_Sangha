'use client';

import React, { useState } from 'react';
// I added ChevronDown to the imports for the mobile indicator
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, ChevronDown, Image as ImageIcon } from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  coverImage: string;
  gallery: string[];
}

const events: EventData[] = [
  {
    id: '1',
    title: 'School',
    date: 'January 15, 2024',
    location: 'Coastal Zone, South 24 Pgs',
    coverImage: '/s1.jpeg',
    gallery: [
      '/s1.jpeg',
      '/s2.jpeg',
      '/s3.jpeg',
      '/s4.jpeg',
      '/s5.jpeg',
      '/s6.jpeg',
      '/s7.jpeg',
      '/s8.jpeg',
      
    ]
  },
  {
    id: '2',
    title: 'Conscious program among the tribals',
    date: 'March 10, 2024',
    location: 'Urban Hub, Kolkata',
    coverImage: '/c1.jpeg',
    gallery: [
      '/c1.jpeg',
      '/c2.jpeg',
      '/c3.jpeg',
      
    ]
  },
  {
    id: '3',
    title: 'Program among Minority people',
    date: 'April 22, 2024',
    location: 'Rural District, Bankura',
    coverImage: '/m1.jpeg',
    gallery: [
      '/m1.jpeg',
      '/m2.jpeg',
      
    ]
  },
  {
    id: '4',
    title: 'Learning Drawing',
    date: 'April 22, 2024',
    location: 'Rural District, Bankura',
    coverImage: '/d1.jpeg',
    gallery: [
      '/d1.jpeg',
      '/d2.jpeg',
      
    ]
  },
  {
    id: '5',
    title: 'Seba garments',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: '6',
    title: 'Seba food',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: '7',
    title: 'Socio religious Cultural program',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: '8',
    title: 'Program on women',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: '9',
    title: 'Birthday celebration of Hari Chand Thakur',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: '10',
    title: 'Baha parab/ spring festival',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: '11',
    title: 'পাথরে নয় গাছে জল',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: '12',
    title: 'Save constitution',
    date: 'December 05, 2023',
    location: 'Uttar Panchpota',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    ]
  },

];

export default function EventGallery() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openModal = (event: EventData) => {
    setSelectedEvent(event);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'unset';
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) => (prev === selectedEvent.gallery.length - 1 ? 0 : prev + 1));
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) => (prev === 0 ? selectedEvent.gallery.length - 1 : prev - 1));
    }
  };

  return (
    <section className="py-16 bg-gray-50 w-full overflow-hidden">
      
      {/* Custom Styles for the Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Custom scrollbar for the main gallery */
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

        /* Thinner custom scrollbar for modal thumbnails */
        .thumb-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .thumb-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .thumb-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280; 
          border-radius: 4px;
        }
        .thumb-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6b7280 transparent;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Stories from the <span className="text-purple-600">Ground</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Witness our impact in action. Click any event to swipe through photos from our grassroots programs.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center text-purple-600 font-medium">
            <span className="mr-2">Scroll to explore</span>
            <ChevronRight className="hidden md:block animate-pulse" />
            <ChevronDown className="block md:hidden animate-pulse" />
          </div>
        </div>

        {/* ADDED 'custom-scrollbar' class, removed style hiding logic */}
        <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:pb-6 pt-4 md:snap-x md:snap-mandatory custom-scrollbar">
          {events.map((event) => (
            <div 
              key={event.id}
              onClick={() => openModal(event)}
              className="relative w-full md:w-auto md:min-w-[400px] h-[380px] md:h-[450px] rounded-3xl overflow-hidden md:snap-center cursor-pointer group shadow-lg md:flex-shrink-0"
            >
              <img 
                src={event.coverImage} 
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent transition-opacity duration-300 group-hover:from-purple-900/90" />
              
              <div className="absolute bottom-0 w-full p-6 text-white transform transition-transform duration-300">
                <div className="flex items-center space-x-2 text-sm text-purple-200 mb-3">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 leading-tight">
                  {event.title}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                    <ImageIcon size={14} />
                    <span>{event.gallery.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity">
          
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-purple-600 rounded-full text-white transition-colors z-50"
          >
            <X size={28} />
          </button>

          <div className="w-full max-w-5xl px-4 flex flex-col items-center">
            
            <div className="text-center text-white mb-6 mt-12 md:mt-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedEvent.title}</h3>
              <p className="text-purple-300 flex items-center justify-center gap-2 text-sm md:text-base">
                <Calendar size={18} /> {selectedEvent.date} | <MapPin size={18} /> {selectedEvent.location}
              </p>
            </div>

            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900 flex items-center justify-center">
              
              <button 
                onClick={prevPhoto}
                className="absolute left-2 md:left-4 p-2 md:p-3 bg-black/50 hover:bg-purple-600 text-white rounded-full backdrop-blur-md transition-all z-10"
              >
                <ChevronLeft size={24} />
              </button>

              <img 
                src={selectedEvent.gallery[currentPhotoIndex]} 
                alt={`Gallery image ${currentPhotoIndex + 1}`}
                className="w-full h-full object-contain"
              />

              <button 
                onClick={nextPhoto}
                className="absolute right-2 md:right-4 p-2 md:p-3 bg-black/50 hover:bg-purple-600 text-white rounded-full backdrop-blur-md transition-all z-10"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full backdrop-blur-md">
                {currentPhotoIndex + 1} / {selectedEvent.gallery.length}
              </div>
            </div>

            {/* ADDED 'thumb-scrollbar' class for the thumbnail track */}
            <div className="flex gap-3 mt-6 overflow-x-auto max-w-full pb-4 px-2 thumb-scrollbar">
              {selectedEvent.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden border-2 transition-all ${
                    currentPhotoIndex === idx ? 'border-purple-500 scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}