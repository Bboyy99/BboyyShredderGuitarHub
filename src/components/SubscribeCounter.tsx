'use client';

import { useState, useEffect } from 'react';
import { getChannelStats, YouTubeChannelStats } from '@/lib/youtube';

interface SubscribeCounterProps {
  channelId: string;
}

export default function SubscribeCounter({ channelId }: SubscribeCounterProps) {
  const [channelStats, setChannelStats] = useState<YouTubeChannelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChannelStats() {
      try {
        setLoading(true);
        const stats = await getChannelStats(channelId);
        setChannelStats(stats);
      } catch (err) {
        console.error('Error fetching channel stats:', err);
        setError('Failed to load channel stats');
      } finally {
        setLoading(false);
      }
    }

    fetchChannelStats();
  }, [channelId]);

  const formatSubscriberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 transform transition-all duration-300 hover:scale-105">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4 text-blue-400">Join the Journey! 🎸</h3>
        
        {loading ? (
          <div className="space-y-3">
            <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Join the community!</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-3xl font-bold text-blue-400">1.2K</div>
              <div className="text-sm text-gray-400 font-medium">subscribers</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="text-3xl font-bold text-blue-400">
                {formatSubscriberCount(channelStats?.subscriberCount || 0)}
              </div>
              <div className="text-sm text-gray-400 font-medium">subscribers</div>
            </div>
            
            <div className="text-sm text-gray-300 leading-relaxed">
              <p className="mb-3">
                <span className="text-blue-400 font-semibold">🔥 Join the BboyyShredder community! 🔥</span>
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Get notified when I drop new content
              </p>
              {channelStats && (
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-400 font-medium">{formatViewCount(channelStats.viewCount)}</span>
                    <span>views</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-400 font-medium">{channelStats.videoCount}</span>
                    <span>videos</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <a
                href={`https://www.youtube.com/channel/${channelId}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Subscribe Now</span>
              </a>
            </div>

            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live notifications</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Exclusive content</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 