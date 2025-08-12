'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getChannelVideosPage, YouTubeVideo } from '@/lib/youtube';

interface CoversGridProps {
  channelId: string;
  activeFilter?: string;
}

export default function CoversGrid({ channelId, activeFilter = 'all' }: CoversGridProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch first page
  useEffect(() => {
    let isCancelled = false;
    async function fetchFirstPage() {
      try {
        setLoading(true);
        setError(null);
        const { videos: firstVideos, nextPageToken: token } = await getChannelVideosPage(channelId, 12);
        if (!isCancelled) {
          setVideos(firstVideos);
          setNextPageToken(token);
        }
      } catch (err) {
        if (!isCancelled) setError('Failed to load covers');
        console.error('Error fetching videos:', err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    fetchFirstPage();
    return () => {
      isCancelled = true;
    };
  }, [channelId]);

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    if (!nextPageToken) return; // nothing more to fetch

    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isFetchingMore && nextPageToken) {
          try {
            setIsFetchingMore(true);
            const { videos: more, nextPageToken: token } = await getChannelVideosPage(channelId, 12, nextPageToken);
            setVideos((prev) => [...prev, ...more]);
            setNextPageToken(token);
          } catch (e) {
            console.error('Error fetching more videos:', e);
          } finally {
            setIsFetchingMore(false);
          }
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [channelId, nextPageToken, isFetchingMore]);

  const formatCount = (count: number) => {
    const n = Number(count);
    if (!Number.isFinite(n)) return '0';

    if (n < 1000) {
      return new Intl.NumberFormat('en-US').format(n);
    }

    if (n < 1_000_000) {
      const thousands = n / 1000;
      const rounded = Math.round(thousands * 10) / 10;
      return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}K`;
    }

    const millions = n / 1_000_000;
    const rounded = Math.round(millions * 10) / 10;
    return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}M`;
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      if (activeFilter === 'all') return true;
      const title = video.title.toLowerCase();

      if (activeFilter === 'metallica') {
        const metallicaKeywords = [
          'metallica', 'james hetfield', 'lars ulrich', 'kirk hammett', 'robert trujillo', 'cliff burton', 'jason newsted',
          'ride the lightning', 'master of puppets', 'and justice for all', 'black album',
          'kill em all', 'reload', 'load', 'st anger', 'death magnetic', 'hardwired',
          'creeping death', 'fade to black', 'for whom the bell tolls', 'one', 'nothing else matters',
          'enter sandman', 'sad but true', 'the unforgiven', 'wherever i may roam',
          'battery', 'master of puppets', 'welcome home', 'disposable heroes', 'leper messiah',
          'orion', 'damage inc', 'blackened', 'and justice for all', 'eye of the beholder',
          'one', 'the shortest straw', 'harvester of sorrow', 'the frayed ends of sanity',
          'to live is to die', 'dyers eve', 'fuel', 'the memory remains', 'devil\'s dance',
          'the unforgiven ii', 'king nothing', 'hero of the day', 'bleeding me', 'cure',
          'poor twisted me', 'wasting my hate', 'mama said', 'thorn within', 'ronnie',
          'the outlaw torn', 'fixxxer', 'frantic', 'st anger', 'some kind of monster',
          'dirty window', 'invisible kid', 'my world', 'shoot me again', 'sweet amber',
          'the unnamed feeling', 'purify', 'all within my hands', 'that was just your life',
          'the end of the line', 'broken beat and scarred', 'the day that never comes',
          'all nightmare long', 'cyanide', 'the unforgiven iii', 'the judas kiss',
          'suicide and redemption', 'my apocalypse', 'hardwired', 'atlas rise', 'moth into flame',
          'dream no more', 'halo on fire', 'confusion', 'manunkind', 'here comes revenge',
          'am i savage', 'murder one', 'spit out the bone'
        ];
        return metallicaKeywords.some((keyword) => title.includes(keyword));
      }

      if (activeFilter === 'blues') {
        const bluesKeywords = [
          'blues', 'srv', 'stevie ray vaughan', 'hendrix', 'jimi hendrix', 'bb king',
          'albert king', 'freddie king', 'buddy guy', 'eric clapton', 'cream',
          'pride and joy', 'little wing', 'voodoo child', 'red house', 'born under a bad sign',
          'the thrill is gone', 'every day i have the blues', 'rock me baby',
          'pride and joy', 'texas flood', 'lenny', 'mary had a little lamb', 'cold shot',
          'couldn\'t stand the weather', 'tin pan alley', 'love struck baby', 'dirty pool',
          'life by the drop', 'wall of denial', 'crossfire', 'tightrope', 'leave my girl alone',
          'superstition', 'higher ground', 'purple haze', 'fire', 'foxy lady', 'manic depression',
          'wind cries mary', 'bold as love', 'castles made of sand', 'little miss lover',
          'if 6 was 9', 'up from the skies', 'crosstown traffic', 'wait until tomorrow',
          'ain\'t no telling', 'little wing', 'third stone from the sun', 'you got me floatin\'',
          'castles made of sand', 'she\'s so fine', 'one rainy wish', 'little miss lover',
          'bold as love', 'exp', 'up from the skies', 'south saturn delta', 'pali gap',
          'drifting', 'ezy ryder', 'night bird flying', 'my friend', 'straight ahead',
          'earth blues', 'valleys of neptune', 'bleeding heart', 'hear my train a comin\'',
          'mojo man', 'villanova junction', 'stepping stone', 'izabella', 'easy blues',
          'country blues', 'beginnings', 'jam 292', 'lover man', 'cherokee mist'
        ];
        return bluesKeywords.some((keyword) => title.includes(keyword));
      }

      if (activeFilter === 'original') {
        const originalKeywords = [
          'original', 'composition', 'my song', 'my own', 'self written', 'my music',
          'original song', 'original composition', 'my original', 'self composed',
          'original piece', 'my creation', 'original work', 'my writing', 'original music'
        ];
        return originalKeywords.some((keyword) => title.includes(keyword));
      }

      return true;
    });
  }, [videos, activeFilter]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden">
            <div className="aspect-video bg-gray-700 animate-pulse"></div>
            <div className="p-6 space-y-3">
              <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">{error}</p>
      </div>
    );
  }

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No covers found for this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden transform transition-all duration-300 hover:scale-105 group">
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3 line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400 font-medium tracking-wide">
                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  {typeof video.viewCount === 'number' && video.viewCount >= 0 && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      <span>{formatCount(video.viewCount)}</span>
                    </div>
                  )}
                  {typeof video.likeCount === 'number' && video.likeCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{formatCount(video.likeCount)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-400">
                  <span className="text-gray-300">{video.description.substring(0, 100)}...</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all text-center"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={sentinelRef} className="h-10 flex items-center justify-center mt-8">
        {isFetchingMore ? (
          <span className="text-gray-400 text-sm">Loading more…</span>
        ) : nextPageToken ? (
          <span className="text-gray-500 text-xs">Scroll to load more</span>
        ) : (
          <span className="text-gray-500 text-xs">End of results</span>
        )}
      </div>
    </>
  );
} 