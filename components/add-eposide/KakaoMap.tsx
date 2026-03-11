'use client';

import { KakaoPlaceResponse } from '@/types/place.types';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface KakaoMapProps {
  place: KakaoPlaceResponse;
}

export default function KakaoMap({ place }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [location] = useState<{ x: number; y: number }>({ x: place.x, y: place.y });

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };

    function initMap() {
      if (!containerRef.current) return;

      const center = new window.kakao.maps.LatLng(location.y, location.x);

      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 3,
      });

      const marker = new window.kakao.maps.Marker({
        position: center,
      });

      marker.setMap(map);

      window.kakao.maps.event.addListener(marker, 'click', function () {
        // 마커 위에 인포윈도우를 표시합니다
        window.open(`${place.place_url}`, '_blank');
      });
    }
  }, [place, location]);

  return <div ref={containerRef} className="w-full h-full" />;
}
