export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  videoUrl: string;
  viewCount?: number;
  likeCount?: number;
}

export interface YouTubeChannelStats {
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  channelTitle: string;
}

export interface YouTubeVideosPage {
  videos: YouTubeVideo[];
  nextPageToken?: string;
}

export async function getLatestVideos(channelId: string, maxResults: number = 6): Promise<YouTubeVideo[]> {
  try {
    // You'll need to get a YouTube API key from Google Cloud Console
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    console.log('API Key found:', !!apiKey);
    console.log('Channel ID:', channelId);
    
    if (!apiKey) {
      console.warn('YouTube API key not found. Using fallback data.');
      return getFallbackVideos();
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Get video IDs for fetching statistics
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    
    // Fetch video statistics
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`
    );

    let videoStats: any = {};
    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      statsData.items.forEach((item: any) => {
        videoStats[item.id] = {
          viewCount: parseInt(item.statistics.viewCount, 10) || 0,
          likeCount: parseInt(item.statistics.likeCount, 10) || 0
        };
      });
    }
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      viewCount: videoStats[item.id.videoId]?.viewCount,
      likeCount: videoStats[item.id.videoId]?.likeCount
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return getFallbackVideos();
  }
}

export async function getChannelStats(channelId: string): Promise<YouTubeChannelStats | null> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      console.warn('YouTube API key not found. Cannot fetch channel stats.');
      return null;
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      return {
        subscriberCount: parseInt(channel.statistics.subscriberCount) || 0,
        videoCount: parseInt(channel.statistics.videoCount) || 0,
        viewCount: parseInt(channel.statistics.viewCount) || 0,
        channelTitle: channel.snippet.title
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return null;
  }
}

export async function getChannelVideosPage(
  channelId: string,
  maxResults: number = 12,
  pageToken?: string
): Promise<YouTubeVideosPage> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return { videos: getFallbackVideos(), nextPageToken: undefined };
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('channelId', channelId);
    url.searchParams.set('order', 'date');
    url.searchParams.set('type', 'video');
    url.searchParams.set('maxResults', String(maxResults));
    url.searchParams.set('key', apiKey);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    const items: any[] = data.items ?? [];
    const videoIds = items.map((item) => item.id.videoId).filter(Boolean);

    let videoStats: Record<string, { viewCount: number; likeCount: number }> = {};
    if (videoIds.length > 0) {
      const statsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
      statsUrl.searchParams.set('part', 'statistics');
      statsUrl.searchParams.set('id', videoIds.join(','));
      statsUrl.searchParams.set('key', apiKey);
      const statsRes = await fetch(statsUrl.toString());
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        (statsData.items ?? []).forEach((it: any) => {
          videoStats[it.id] = {
            viewCount: parseInt(it.statistics.viewCount, 10) || 0,
            likeCount: parseInt(it.statistics.likeCount, 10) || 0,
          };
        });
      }
    }

    const videos: YouTubeVideo[] = items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      viewCount: videoStats[item.id.videoId]?.viewCount,
      likeCount: videoStats[item.id.videoId]?.likeCount,
    }));

    return { videos, nextPageToken: data.nextPageToken };
  } catch (error) {
    console.error('Error fetching paged YouTube videos:', error);
    return { videos: getFallbackVideos(), nextPageToken: undefined };
  }
}

export async function getVideosByIds(videoIds: string[]): Promise<YouTubeVideo[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey || videoIds.length === 0) return [];

    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'snippet,statistics');
    url.searchParams.set('id', videoIds.join(','));
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);

    const data = await res.json();
    return (data.items ?? []).map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
      viewCount: parseInt(item.statistics?.viewCount, 10) || 0,
      likeCount: parseInt(item.statistics?.likeCount, 10) || 0,
    }));
  } catch (e) {
    console.error('Error fetching videos by IDs:', e);
    return [];
  }
}

function getFallbackVideos(): YouTubeVideo[] {
  return [
    {
      id: 'kS0qU76oQHs',
      title: 'Metallica - Creeping Death Cover',
      description: 'Full guitar cover of Metallica\'s Creeping Death',
      thumbnail: 'https://img.youtube.com/vi/kS0qU76oQHs/mqdefault.jpg',
      publishedAt: '2024-01-15T10:00:00Z',
      channelTitle: 'Your Channel Name',
      videoUrl: 'https://www.youtube.com/watch?v=kS0qU76oQHs'
      // No viewCount or likeCount - let them be undefined
    }
  ];
} 