'use client';

import { useState } from 'react';

interface TitleProps {
  titleColor: 'text-primary' | 'text-white';
  bounce?: boolean;
}

interface WordStyle {
  text: string;
  rotate: number;
  translateY: number;
}

const INITIAL_WORDS: WordStyle[] = [
  { text: 'happy', rotate: -10, translateY: -16 },
  { text: 'last', rotate: 0, translateY: 0 },
  { text: 'year', rotate: 4, translateY: 12 },
  { text: 'closing', rotate: -6, translateY: 0 },
  { text: '!', rotate: 10, translateY: 12 },
];

function randomize(): WordStyle[] {
  return INITIAL_WORDS.map((word) => ({
    ...word,
    rotate: Math.round(Math.random() * 30 - 15),
    translateY: Math.round(Math.random() * 28 - 16),
  }));
}

export default function ServiceTitle({ titleColor, bounce }: TitleProps) {
  const [words, setWords] = useState<WordStyle[]>(INITIAL_WORDS);
  const shuffle = () => setWords(randomize());

  return (
    <div
      className="mx-auto fixed -translate-x-1/2 left-1/2 z-50 w-fit"
      id="service-title"
      onClick={shuffle}
      onTouchStart={shuffle}
    >
      <div
        className={`px-5 flex gap-1 justify-between whitespace-nowrap ${titleColor} text-en-36 font-extralight`}
      >
        {words.map(({ text, rotate, translateY }, i) => (
          <div
            key={text}
            className={`w-full transition-transform duration-300 ease-in-out group-hover:animate-[pop-bounce_0.4s_ease-in-out] ${bounce ? 'animate-[pop-bounce_0.4s_ease-in-out]' : ''}`}
            style={{
              rotate: `${rotate}deg`,
              translate: `0 ${translateY}px`,
              animationDelay: `${i * 100}ms`,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
