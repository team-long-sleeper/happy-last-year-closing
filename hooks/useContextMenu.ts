import { EpisodeType } from '@type/episode.types';
import { MouseEvent, TouchEvent, useRef, useState } from 'react';

export function useContextMenu() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedEpisode, setSelected] = useState<EpisodeType>();
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (x: number, y: number) => setPosition({ x, y });
  const close = () => setPosition(null);

  // PC 우클릭
  const onContextMenu = (e: MouseEvent, episode: EpisodeType) => {
    e.preventDefault();
    console.log(episode);
    setSelected(episode);
    open(e.clientX, e.clientY);
  };

  const clearTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const onTouchStart = (e: TouchEvent, episode: EpisodeType) => {
    const { clientX, clientY } = e.touches[0];
    setSelected(episode);
    longPressTimer.current = setTimeout(() => open(clientX, clientY), 500);
  };

  const onTouchMove = () => clearTimer();
  const onTouchEnd = () => clearTimer();

  const getHandlers = (episode: EpisodeType) => ({
    onContextMenu: (e: MouseEvent) => onContextMenu(e, episode),
    onTouchStart: (e: TouchEvent) => onTouchStart(e, episode),
    onTouchMove,
    onTouchEnd,
  });

  return {
    isOpen: !!position,
    position,
    close,
    getHandlers,
    selectedEpisode,
  };
}
