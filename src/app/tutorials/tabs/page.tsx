'use client';

import { useState, useEffect } from 'react';
import { YouTubeVideo } from '@/lib/youtube';

export default function TabsPage() {
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  const videoTitle = 'Metallica Acoustic Medley II';

  useEffect(() => {
    async function fetchVideo() {
      try {
        setLoading(true);
        const response = await fetch(`/api/video-by-title?title=${encodeURIComponent(videoTitle)}`);
        if (response.ok) {
          const foundVideo = await response.json();
          setVideo(foundVideo);
        } else {
          console.error('Error fetching video:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [videoTitle]);

  const handleDownload = () => {
    // Link to the zip file in the public folder
    const link = document.createElement('a');
    link.href = '/tabs/metallica-acoustic-medley-ii-tabs.zip';
    link.download = 'Metallica-Acoustic-Medley-II-Tabs.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent relative">
            🎼 Guitar Tabs
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full"></div>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Download free PDF guitar tabs - <span className="text-blue-400 font-semibold">the ones below are free!</span>
          </p>
        </section>

        {/* Video Section */}
        <section className="mb-12">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
              {videoTitle}
            </h2>
            
            {loading ? (
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading video...</p>
                </div>
              </div>
            ) : video ? (
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Video not found. Please check the video title.</p>
              </div>
            )}

            {/* Download Section */}
            <div className="mt-8 text-center">
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  📥 Download Free Tabs
                </h3>
                <p className="text-gray-300 mb-6">
                  Get a free tab package from this medley! Includes PDF tabs for all 3 songs:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 max-w-md mx-auto">
                  <li>Unforgiven II - Full guitar tab</li>
                  <li>Bleeding Me - Full guitar tab</li>
                  <li>Fade To Black - Full guitar tab</li>
                </ul>
                <button
                  onClick={handleDownload}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                >
                  <span>📥</span>
                  <span>Download Tabs (ZIP)</span>
                </button>
                <p className="text-gray-400 text-sm mt-4">
                  Free download - No signup required!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-gray-900/50 rounded-xl border border-blue-500/20 p-6 mb-12">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📝 About These Tabs</h3>
          <div className="space-y-4 text-gray-300">
            <p className="mt-4 text-gray-200">
              <span className="text-blue-400 font-semibold">These tabs are free as a special gift to my viewers!</span> These were the first tabs I ever made, and I wanted to give back to all of you who care so much about my music that you&apos;d take the time to download and learn my tabs. Your support means the world to me, and this is my way of saying thank you.
            </p>
            <p className="mt-4">
              Feel free to use these tabs for learning and practice. If you share them, please credit me!
            </p>
          </div>
        </section>

        {/* More Tabs Coming Soon */}
        <section className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30 p-8 text-center">
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">
            More Tabs Coming Soon!
          </h3>
          <p className="text-gray-300 text-lg">
            Stay tuned for more tab releases in the future. Keep practicing and keep rocking! 🎸
          </p>
        </section>
      </div>
    </div>
  );
}

