import ServiceTitle from '@components/title/ServiceTitle';

interface LandingProps {
  isMounted: boolean;
  onTransitionEndFn?: () => void;
}

export default function Landing({ isMounted, onTransitionEndFn }: LandingProps) {
  return (
    <div className="relative">
      <div
        className={`fixed w-dvw h-dvh bg-primary-diamond-gradient transition-all duration-700 ease-in-out z-50 ${
          isMounted ? '-translate-y-full' : ''
        }`}
        onTransitionEnd={onTransitionEndFn}
      />
      <div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-full transition-all duration-500 ease-in-out [&_div]:transition-all [&_div]:duration-500 [&_div]:ease-in-out z-100 ${isMounted ? 'top-22 [&_div]:text-primary!' : '[&_div]:text-white!'} `}
      >
        <ServiceTitle />
      </div>
    </div>
  );
}
