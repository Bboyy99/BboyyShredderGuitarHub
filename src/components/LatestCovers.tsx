'use client';

import { useState, useEffect } from 'react';
import { getLatestVideos, YouTubeVideo } from '@/lib/youtube';
import Image from 'next/image';

interface LatestCoversProps {
  channelId: string;
  maxResults?: number;
}

export default function LatestCovers({ channelId, maxResults = 6 }: LatestCoversProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const latestVideos = await getLatestVideos(channelId, maxResults);
        setVideos(latestVideos);
      } catch (err) {
        setError('Failed to load latest covers');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [channelId, maxResults]);

  if (loading) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
        <h3 className="text-xl font-semibold mb-4 text-blue-400">Latest Covers</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-16 h-12 bg-gray-700 rounded animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
        <h3 className="text-xl font-semibold mb-4 text-blue-400">Latest Covers</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">Latest Covers</h3>
      <div className="space-y-3">
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200 group"
          >
            <div className="relative w-16 h-12 flex-shrink-0">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="64px"
                className="rounded object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200 rounded"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-200 group-hover:text-blue-400 transition-colors duration-200 truncate">
                {video.title}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs text-gray-400 font-medium tracking-wide truncate">
                  {new Date(video.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 