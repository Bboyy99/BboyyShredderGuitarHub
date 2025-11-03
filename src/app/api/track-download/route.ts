import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'data', 'download-counter.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read current count
function getCount(): number {
  try {
    ensureDataDir();
    if (fs.existsSync(COUNTER_FILE)) {
      const data = fs.readFileSync(COUNTER_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.count || 0;
    }
  } catch (error) {
    console.error('Error reading counter:', error);
  }
  return 0;
}

// Write count
function setCount(count: number): void {
  try {
    ensureDataDir();
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count, lastUpdated: new Date().toISOString() }), 'utf-8');
  } catch (error) {
    console.error('Error writing counter:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentCount = getCount();
    const newCount = currentCount + 1;
    setCount(newCount);
    
    return NextResponse.json({ 
      success: true, 
      count: newCount 
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    return NextResponse.json(
      { error: 'Failed to track download' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = getCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting download count:', error);
    return NextResponse.json(
      { error: 'Failed to get download count' },
      { status: 500 }
    );
  }
}

