'use client';

import { useState } from 'react';
import CoversGrid from '@/components/CoversGrid';
import CoverFilters from '@/components/CoverFilters';

export default function Covers() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent relative">
          Guitar Covers
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full"></div>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore my collection of guitar covers, from Metallica, to blues, to dreamy ambient soundscapes.
        </p>
      </section>

      {/* Filter Section */}
      <section className="max-w-6xl mx-auto">
        <CoverFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        {/* Covers Grid */}
        <CoversGrid 
          channelId={process.env.YOUTUBE_CHANNEL_ID || "UC293HFEJqlqxTVNUkKg1xSw"} 
          activeFilter={activeFilter}
        />
      </section>
    </div>
  );
} 