'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GearSection, GearItem } from '@/data/gear';
import { getVideosByIds, YouTubeVideo } from '@/lib/youtube';
import React from 'react';

interface GearGalleryProps {
  sections: GearSection[];
}

interface GearModalProps {
  gear: GearItem;
  isOpen: boolean;
  onClose: () => void;
}

function GearModal({ gear, isOpen, onClose }: GearModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredVideos, setFeaturedVideos] = useState<YouTubeVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Auto-start slideshow

  // Auto-play slideshow effect
  React.useEffect(() => {
    if (!isOpen || gear.images.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === gear.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen, gear.images.length, isAutoPlaying]);

  // Reset to first image and start auto-play when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsAutoPlaying(true);
    }
  }, [isOpen]);

  // Load featured videos when modal opens
  React.useEffect(() => {
    if (isOpen && gear.featuredVideoIds && gear.featuredVideoIds.length > 0) {
      setLoadingVideos(true);
      getVideosByIds(gear.featuredVideoIds)
        .then(videos => {
          setFeaturedVideos(videos);
        })
        .catch(error => {
          console.error('Error loading featured videos:', error);
          setFeaturedVideos([]);
        })
        .finally(() => {
          setLoadingVideos(false);
        });
    } else {
      setFeaturedVideos([]);
    }
  }, [isOpen, gear.featuredVideoIds]);

  if (!isOpen) return null;

  const nextImage = () => {
    setIsAutoPlaying(false); // Stop auto-play when manually navigating
    setCurrentImageIndex((prev) => 
      prev === gear.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setIsAutoPlaying(false); // Stop auto-play when manually navigating
    setCurrentImageIndex((prev) => 
      prev === 0 ? gear.images.length - 1 : prev - 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setIsAutoPlaying(false); // Stop auto-play when manually selecting
    setCurrentImageIndex(index);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border border-blue-500/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-400">{gear.name}</h2>
              {gear.subtitle && (
                <p className="text-gray-400 mt-1">{gear.subtitle}</p>
              )}
            </div>
            <div className="flex items-center">
              {gear.featured && (
                <span className="inline-block px-3 py-1 text-sm font-medium text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 rounded-full shadow-lg shadow-cyan-500/25 animate-pulse">
                  {gear.featured}
                </span>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 text-2xl ml-4"
              >
                ×
              </button>
            </div>
          </div>

          {/* Image Slideshow */}
          {gear.images.length > 0 ? (
            <div className="relative mb-6">
              <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden border border-turquoise-500/30">
                <div className="relative w-full h-full">
                  {gear.images.map((image, index) => (
                    <Image
                      key={image}
                      src={image}
                      alt={`${gear.name} - Image ${index + 1}`}
                      fill
                      className={`object-contain transition-all duration-700 ease-in-out ${
                        index === currentImageIndex 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-95'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {gear.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-turquoise-600 bg-opacity-80 text-white p-2 rounded-full hover:bg-turquoise-500 transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-turquoise-600 bg-opacity-80 text-white p-2 rounded-full hover:bg-turquoise-500 transition-colors"
                  >
                    ›
                  </button>
                  
                  {/* Image indicators */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {gear.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleIndicatorClick(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-turquoise-500 shadow-lg shadow-turquoise-500/50 scale-110' 
                            : 'bg-gray-600 hover:bg-gray-500 hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-96 bg-gray-800 rounded-lg flex items-center justify-center mb-6 border border-gray-700">
              <p className="text-gray-500">No photos available yet</p>
            </div>
          )}

          {/* Story */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Story</h3>
            <p className="text-gray-300 leading-relaxed">{gear.story}</p>
          </div>

          {/* Specs */}
          {gear.specs && gear.specs.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Specifications</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {gear.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Featured Videos */}
          {gear.featuredVideoIds && gear.featuredVideoIds.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Featured In</h3>
              {loadingVideos ? (
                <div className="text-gray-400">Loading videos...</div>
              ) : featuredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredVideos.map((video) => (
                    <a
                      key={video.id}
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group-hover:border-turquoise-500/50 transition-colors">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <p className="text-sm text-gray-300 mt-2 group-hover:text-turquoise-400 transition-colors">
                        {video.title}
                      </p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No featured videos found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GearCard({ gear, onClick }: { gear: GearItem; onClick: () => void }) {
  const hasImages = gear.images.length > 0;

  return (
    <div
      onClick={onClick}
      className="bg-gray-900/70 border border-blue-500/20 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden hover:border-turquoise-500/30"
    >
      <div className="relative h-48 bg-gray-800">
        {hasImages ? (
          <Image
            src={gear.images[0]}
            alt={gear.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl text-gray-600 mb-2">
                {gear.type === 'electric' || gear.type === 'acoustic' ? '🎸' : 
                 gear.type === 'amplifier' ? '🔊' : 
                 gear.type === 'software' ? '💻' : '🎵'}
              </div>
              <p className="text-gray-500 text-sm">No photo yet</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-blue-400">{gear.name}</h3>
          {gear.featured && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="inline-block px-2 py-1 text-xs font-medium text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 rounded-full shadow-md shadow-cyan-500/25 animate-pulse hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Featured
            </button>
          )}
        </div>
        {gear.subtitle && (
          <p className="text-sm text-gray-400 mb-2">{gear.subtitle}</p>
        )}
        <p className="text-sm text-gray-300 mb-2">{gear.story}</p>
      </div>
    </div>
  );
}

export default function GearGallery({ sections }: GearGalleryProps) {
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGearClick = (gear: GearItem) => {
    setSelectedGear(gear);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGear(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          My Gear Collection
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Over the years, I&apos;ve collected a few good tools for myself. 
          Here they lie, along with the story behind each one.
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.id} className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-2">{section.title}</h2>
            {section.subtitle && (
              <p className="text-lg text-gray-400">{section.subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((gear) => (
              <GearCard
                key={gear.slug}
                gear={gear}
                onClick={() => handleGearClick(gear)}
              />
            ))}
          </div>
        </section>
      ))}

      {selectedGear && (
        <GearModal
          gear={selectedGear}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
