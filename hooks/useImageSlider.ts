// hooks/useImageSlider.ts
import { MouseEvent, TouchEvent, useRef, useState } from 'react';

export function useImageSlider(
  length: number,
  currentIndex: number,
  setCurrentIndex: (i: number) => void,
) {
  const SWIPE_THRESHOLD = 50;
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number>(0);
  const mouseStartX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleSwipeEnd = () => {
    if (dragOffset < -SWIPE_THRESHOLD && currentIndex !== length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (dragOffset > SWIPE_THRESHOLD && currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
    setDragOffset(0);
  };

  const onTouchStart = (e: TouchEvent) => {
    if (length === 1) return;
    touchStartX.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const onTouchMove = (e: TouchEvent) => {
    const diff = e.touches[0].clientX - touchStartX.current;
    if (currentIndex === 0 && diff > 0) return;
    setDragOffset(diff);
  };

  const onTouchEnd = () => handleSwipeEnd();

  const onMouseDown = (e: MouseEvent) => {
    if (length === 1) return;
    mouseStartX.current = e.clientX;
    isDragging.current = true;
    setDragOffset(0);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - mouseStartX.current;
    if (currentIndex === 0 && diff > 0) return;
    setDragOffset(diff);
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    handleSwipeEnd();
  };

  return {
    dragOffset,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
    },
  };
}
