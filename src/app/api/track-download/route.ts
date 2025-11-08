import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'data', 'download-counter.json');
const COUNTER_KEY = 'tabs:metallica-acoustic-medley-ii:download-count';

const hasKvConfig = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const isVercel = Boolean(process.env.VERCEL);

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function getCountFromFile(): number {
  try {
    ensureDataDir();
    if (fs.existsSync(COUNTER_FILE)) {
      const data = fs.readFileSync(COUNTER_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return typeof parsed.count === 'number' ? parsed.count : 0;
    }
  } catch (error) {
    console.error('Error reading counter from file:', error);
  }
  return 0;
}

function setCountInFile(count: number): void {
  try {
    ensureDataDir();
    fs.writeFileSync(
      COUNTER_FILE,
      JSON.stringify({ count, lastUpdated: new Date().toISOString() }),
      'utf-8'
    );
  } catch (error) {
    console.error('Error writing counter to file:', error);
  }
}

async function getCount(): Promise<number> {
  if (hasKvConfig) {
    try {
      const value = await kv.get<number>(COUNTER_KEY);
      return typeof value === 'number' ? value : 0;
    } catch (error) {
      console.error('Error reading counter from KV:', error);
      throw error;
    }
  }

  if (isVercel) {
    throw new Error('Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.');
  }

  return getCountFromFile();
}

async function incrementCount(): Promise<number> {
  if (hasKvConfig) {
    try {
      const newCount = await kv.incr(COUNTER_KEY);
      return Number(newCount);
    } catch (error) {
      console.error('Error incrementing counter in KV:', error);
      throw error;
    }
  }

  if (isVercel) {
    throw new Error('Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.');
  }

  const currentCount = getCountFromFile();
  const newCount = currentCount + 1;
  setCountInFile(newCount);
  return newCount;
}

export async function POST() {
  try {
    const newCount = await incrementCount();
    return NextResponse.json({
      success: true,
      count: newCount,
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    return NextResponse.json(
      {
        error:
          'Failed to track download. Ensure Vercel KV is configured in production or use local fallback in development.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await getCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting download count:', error);
    return NextResponse.json(
      {
        error:
          'Failed to get download count. Ensure Vercel KV is configured in production or use local fallback in development.',
      },
      { status: 500 }
    );
  }
}

