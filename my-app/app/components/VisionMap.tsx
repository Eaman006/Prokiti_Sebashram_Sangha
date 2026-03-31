'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, BookOpen, Heart, Leaf, Shield } from 'lucide-react';

interface RegionData {
  id: string;
  name: string;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  top: string; // Y-axis position on the map
  left: string; // X-axis position on the map
}

const mapData: RegionData[] = [
  {
    id: 'south-24',
    name: 'South 24 Parganas',
    category: 'Administration',
    title: 'NGO Headquarters',
    description: 'Registered office at Uttar Panchpota. The central hub for administering public charitable, educational, and cultural purposes across the state.',
    icon: Shield,
    top: '80%', // Bottom right near the delta
    left: '65%',
  },
  {
    id: 'urban-edu',
    name: 'Kolkata & Urban Hubs',
    category: 'Education',
    title: 'Advanced Learning Centers',
    description: 'Working toward Deemed University status, alongside establishing Engineering, ITI, and Teacher Training colleges for underprivileged youth.',
    icon: BookOpen,
    top: '70%', // Just above South 24 Parganas
    left: '60%',
  },
  {
    id: 'rural-agri',
    name: 'Western Rural Districts',
    category: 'Agriculture',
    title: 'Sustainable Self-Reliance',
    description: 'Establishing bio-fertilizer plants, mushroom production labs, and promoting organic farming to turn individuals into self-sufficient entrepreneurs.',
    icon: Leaf,
    top: '60%', // Middle left bulge (Bankura/Purulia area)
    left: '25%',
  },
  {
    id: 'north-health',
    name: 'Northern Bengal',
    category: 'Healthcare',
    title: 'Accessible Healthcare & Relief',
    description: 'Running charitable hospitals, maternity homes, and providing disaster relief and mobile health clinics to remote populations.',
    icon: Heart,
    top: '20%', // Top narrow neck (Siliguri/Darjeeling area)
    left: '55%',
  },
];

export default function VisionMap() {
  const [activeRegion, setActiveRegion] = useState<RegionData>(mapData[0]);

  return (
    <section className="py-16 bg-white w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Our Vision <span className="text-purple-600">Map</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Hover over the pins to explore how Prokriti Sebashram Sangha is transforming lives across West Bengal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-purple-50 rounded-3xl p-8 lg:p-12 shadow-inner border border-purple-100">
        
        {/* LEFT SIDE: The Map & Pins */}
        <div className="lg:col-span-6 relative flex justify-center items-center min-h-[500px]">
          {/* Your downloaded SVG as the background image */}
          <div className="relative w-full max-w-[350px] aspect-[2/3]">
            <Image 
              src="/west-bengal-map.svg" 
              alt="Map of West Bengal" 
              fill
              className="object-contain opacity-40 drop-shadow-md"
            />
            
            {/* Interactive Pins Overlay */}
            {mapData.map((region) => (
              <div
                key={region.id}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: region.top, left: region.left }}
                onMouseEnter={() => setActiveRegion(region)}
              >
                {/* The glowing pulse effect */}
                <span className="absolute -inset-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-50 group-hover:animate-ping transition-opacity duration-300"></span>
                
                {/* The actual pin dot */}
                <div className={`relative h-5 w-5 rounded-full border-2 border-white shadow-lg transition-transform duration-300 ${
                  activeRegion.id === region.id ? 'bg-purple-600 scale-125' : 'bg-purple-300 group-hover:bg-purple-500 group-hover:scale-110'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Dynamic Info Card */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-purple-600 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                  <activeRegion.icon size={32} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                    {activeRegion.category}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {activeRegion.name}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800">
                  {activeRegion.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {activeRegion.description}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button className="flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                <MapPin className="mr-2" size={18} />
                Explore {activeRegion.category} Programs
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}