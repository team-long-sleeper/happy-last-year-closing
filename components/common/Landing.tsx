import ServiceTitle from '@components/title/ServiceTitle';
import React from 'react';

interface LandingProps {
  isActive?: boolean;
  children?: React.ReactNode;
}

export default function Landing({ isActive = false }: LandingProps) {
  return (
    <div
      className={`fixed w-dvw h-dvh bg-primary-diamond-gradient transform-all duration-700 ease-in-out -z-10 ${
        isActive ? 'translate-y-full' : ''
      }`}
    >
      <div
        className={`w-full flex items-center transition-[height] duration-700 ease-in-out  ${
          isActive ? 'h-23.75' : 'h-full'
        }`}
      >
        <ServiceTitle titleColor={isActive ? 'text-primary' : 'text-white'} />
      </div>
    </div>
  );
}
