import { NextRequest, NextResponse } from 'next/server';
import { getVideoByTitle } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');
  const channelId = searchParams.get('channelId') || process.env.YOUTUBE_CHANNEL_ID || 'UC293HFEJqlqxTVNUkKg1xSw';

  if (!title) {
    return NextResponse.json(
      { error: 'Title parameter is required' },
      { status: 400 }
    );
  }

  try {
    const video = await getVideoByTitle(channelId, title);
    
    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error fetching video by title:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

