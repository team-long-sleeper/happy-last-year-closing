import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import { toast } from '@/toast';
import { CloseIcon, DeleteIcon } from '@assets/icons';
import Icon from '@components/common/Icon';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function EpisodeImagesContainer() {
  const { pictures, setPictures, setDeletedPictureId } = useEpisodeDataStore();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const [isMouseDragging, setIsMouseDragging] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isOverTrash, setIsOverTrash] = useState<boolean>(false);

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trashRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageSize = 106;

  const resetDragState = () => {
    setIsDragging(false);
    setIsMouseDragging(false);
    setDragIndex(null);
    setDragOverIndex(null);
    setTouchPos(null);
    setIsOverTrash(false);
  };

  const isOverTrashZone = (x: number, y: number) => {
    if (!trashRef.current) return false;
    const rect = trashRef.current.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const onMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const onMouseLeave = () => {
    setHoverIndex(null);
  };

  const deleteImage = (name?: string, id?: number) => {
    if (!pictures) return;

    if (id) {
      setDeletedPictureId(id);
      return setPictures(pictures.filter((pic) => pic.id !== id));
    } else if (name) {
      return setPictures(pictures.filter((pic) => pic.name !== name));
    }
  };

  const onMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setDragIndex(index);
    setIsMouseDragging(true);
    setTouchPos({ x: e.clientX, y: e.clientY });
  };

  const onTouchStart = (index: number) => {
    longPressTimer.current = setTimeout(() => {
      setDragIndex(index);
      setIsDragging(true);
      navigator.vibrate?.(50);
    }, 200);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const onTouchEnd = () => {
    if (!pictures) return;
    cancelLongPress();

    if (isDragging && dragIndex !== null && isOverTrash) {
      const target = pictures[dragIndex];
      deleteImage(target.name, target.id);
      navigator.vibrate?.(80);
      toast('사진이 삭제되었어요.', 'SUCCESS');
      resetDragState();
      return;
    }

    if (isDragging && dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      const updated = [...pictures];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(dragOverIndex, 0, moved);
      setPictures(updated.map((img, i) => ({ ...img, order: i + 1 })));
    }

    resetDragState();
  };

  const onClickDeleteImage = (index: number) => {
    if (!pictures) return;

    const target = pictures[index];
    deleteImage(target.name, target.id);
    toast('사진이 삭제되었어요.', 'SUCCESS');
    resetDragState();
    return;
  };

  useEffect(() => {
    if (!isMouseDragging || !pictures) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTouchPos({ x: e.clientX, y: e.clientY });
      setIsOverTrash(isOverTrashZone(e.clientX, e.clientY));

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const item = el?.closest('[data-drag-index]');
      if (item) {
        setDragOverIndex(Number(item.getAttribute('data-drag-index')));
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
        const updated = [...pictures];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(dragOverIndex, 0, moved);
        setPictures(updated.map((img, i) => ({ ...img, order: i + 1 })));
      }

      resetDragState();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDragging, dragIndex, dragOverIndex, pictures]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) {
        cancelLongPress();
        return;
      }
      e.preventDefault();
      const touch = e.touches[0];
      setTouchPos({ x: touch.clientX, y: touch.clientY });
      setIsOverTrash(isOverTrashZone(touch.clientX, touch.clientY));

      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const item = el?.closest('[data-drag-index]');
      if (item) {
        setDragOverIndex(Number(item.getAttribute('data-drag-index')));
      }
    };

    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', handleTouchMove);
  }, [isDragging]);

  useEffect(() => {
    if (isMouseDragging) {
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = '';
    }
  }, [isMouseDragging]);

  if (pictures)
    return (
      <div ref={containerRef} className="contents">
        {pictures.map((image, index) => {
          const isGrabbed = (isDragging || isMouseDragging) && dragIndex === index;
          const isTarget = dragOverIndex === index && dragIndex !== index;

          let translateX = '0px';
          if ((isDragging || isMouseDragging) && dragIndex !== null && dragOverIndex !== null) {
            const from = dragIndex;
            const to = dragOverIndex;
            if (from < to && index > from && index <= to) translateX = '-112px';
            if (from > to && index >= to && index < from) translateX = '112px';
          }

          return (
            <div
              key={image.id ?? index}
              data-drag-index={index}
              onMouseDown={(e) => onMouseDown(index, e)}
              onTouchStart={() => onTouchStart(index)}
              onTouchEnd={onTouchEnd}
              onTouchCancel={onTouchEnd}
              onContextMenu={(e) => e.preventDefault()}
              style={{ transform: `translateX(${translateX})` }}
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={onMouseLeave}
              className={`shrink-0 transition-all duration-200  select-none cursor-grab ${
                isGrabbed ? 'opacity-0' : ''
              } ${isTarget ? 'ring-2 ring-primary' : ''}  `}
            >
              <div className="bg-primary text-white leading-tight size-5 flex items-center justify-center absolute top-0 left-0 text-xs ">
                {index + 1}
              </div>

              {hoverIndex === index ? (
                <div
                  className="bg-primary absolute top-0 right-0 size-5 flex justify-center items-center cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => onClickDeleteImage(index)}
                >
                  <Icon icon={CloseIcon} iconColor="white" size="s" />
                </div>
              ) : null}

              <Image
                width={imageSize}
                height={imageSize}
                src={image.url}
                className="size-26.5 object-cover border border-primary"
                sizes="106px"
                loading="eager"
                alt={image.name ?? `${image.id}`}
              />
            </div>
          );
        })}

        {/* 터치 포인트 따라다니는 고스트 이미지 */}
        {(isDragging || isMouseDragging) && touchPos && dragIndex !== null && (
          <div
            className={`fixed pointer-events-none z-50 opacity-90 scale-105 shadow-xl ${isOverTrash ? 'opacity-40 scale-75 grayscale' : 'opacity-90 scale-105'}`}
            style={{
              left: touchPos?.x - imageSize / 2,
              top: touchPos?.y - imageSize / 2,
            }}
          >
            <Image
              width={imageSize}
              height={imageSize}
              src={pictures[dragIndex].url}
              className="size-26.5 object-cover border border-primary"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
              alt=""
            />
          </div>
        )}

        {isDragging && (
          <div
            ref={trashRef}
            className={`fixed  left-1/2 -translate-x-1/2 bottom-20 h-20 w-20 z-50 rounded-full shadow-lg transition-all duration-200  flex flex-col items-center justify-center gap-1 ${isOverTrash ? 'scale-125 border-primary border-2 bg-primary' : 'bg-white border-2 border-text-default'}`}
          >
            <Icon icon={DeleteIcon} iconColor={isOverTrash ? 'white' : 'default'} />
          </div>
        )}
      </div>
    );
}
