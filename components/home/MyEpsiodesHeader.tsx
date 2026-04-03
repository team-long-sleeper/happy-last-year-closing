import AnimatedCount from '@components/common/AnimatedCount';

interface EpisodeHeaderProps {
  count: number;
  mates?: string[];
  place?: string;
}

export default function MyEpisodesHeader({ count, place, mates }: EpisodeHeaderProps) {
  return (
    <div className="text-primary pb-2 transition-all duration-500">
      <div className={`flex flex-col w-full gap-2  px-5 z-20 pointer-events-none`}>
        <div className={` transition-all duration-250 ease-out h-full overflow-hidden `}>
          {mates && mates?.length > 0
            ? (() => {
                const lastName = mates![mates!.length - 1];
                const code = lastName[lastName.length - 1].charCodeAt(0);
                const hasBatchim = code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
                const particle = hasBatchim ? '과' : '와';
                return (
                  <span>
                    {mates!.join(', ')}
                    {particle}
                  </span>
                );
              })()
            : '내가 '}
          {place ? `${place}에서 ` : ''}
          함께한 에피소드
        </div>
        <span
          className="text-3xl font-extralight transition-all duration-500 ease-out  "
          style={{ fontSize: scrollY > 40 ? '1.6rem' : '' }}
        >
          <AnimatedCount target={count} />
        </span>
      </div>
    </div>
  );
}
