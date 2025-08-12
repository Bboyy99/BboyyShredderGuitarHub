import GearGallery from '@/components/GearGallery';
import { gearSections } from '@/data/gear';

export default function Gear() {
  return (
    <GearGallery 
      sections={gearSections} 
    />
  );
} 