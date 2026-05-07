import { Mate } from '@/types/mates.types';
import MateProfile from './MateProfile';

interface MatesListProps {
  mates: Map<string, Mate>;
  onToggleMate?: (mate: Mate) => void;
}
export default function MatesProfileList({ mates, onToggleMate }: MatesListProps) {
  if (mates.size === 0) {
    return <div className="border-2 border-dashed border-primary size-17 rounded-full mb-9" />;
  } else
    return (
      <div className="flex gap-2 overflow-x-scroll">
        {Array.from(mates.values()).map((mate) => (
          <div className="relative" key={mate.name}>
            <MateProfile mate={mate} onToggleMate={onToggleMate} />
          </div>
        ))}
      </div>
    );
}
