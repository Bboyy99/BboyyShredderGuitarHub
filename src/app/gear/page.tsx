import GearGallery from '@/components/GearGallery';
import { gearSections } from '@/data/gear';

export default function Gear() {
  return (
    <GearGallery 
      sections={gearSections} 
      channelId={process.env.YOUTUBE_CHANNEL_ID || "UC293HFEJqlqxTVNUkKg1xSw"} 
    />
  );
} 