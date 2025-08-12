'use client';

import { useState, useEffect } from 'react';
import { getLatestVideos, YouTubeVideo } from '@/lib/youtube';

interface FeaturedVideoProps {
  channelId: string;
}

export default function FeaturedVideo({ channelId }: FeaturedVideoProps) {
  const [featuredVideo, setFeaturedVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedVideo() {
      try {
        setLoading(true);
        // Fetch 10 videos and pick a random one
        const videos = await getLatestVideos(channelId, 10);
        if (videos.length > 0) {
          const randomIndex = Math.floor(Math.random() * videos.length);
          setFeaturedVideo(videos[randomIndex]);
        }
      } catch (err) {
        console.error('Error fetching featured video:', err);
        // Fallback to the first video if random fails
        const videos = await getLatestVideos(channelId, 1);
        if (videos.length > 0) {
          setFeaturedVideo(videos[0]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedVideo();
  }, [channelId]);

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02]">
        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <div className="aspect-w-16 aspect-h-9 relative z-10">
            <div className="w-full h-[500px] rounded-xl shadow-xl bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredVideo) {
    return (
      <section className="max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02]">
        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <div className="aspect-w-16 aspect-h-9 relative z-10">
            <iframe
              className="w-full h-[500px] rounded-xl shadow-xl"
              src="https://www.youtube.com/embed/kS0qU76oQHs"
              title="Latest Guitar Cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto transform transition-all duration-300 hover:scale-[1.02]">
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-blue-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
        <div className="aspect-w-16 aspect-h-9 relative z-10">
          <iframe
            className="w-full h-[500px] rounded-xl shadow-xl"
            src={`https://www.youtube.com/embed/${featuredVideo.id}`}
            title={featuredVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">{featuredVideo.title}</h3>
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-400 font-medium tracking-wide">
                {new Date(featuredVideo.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 