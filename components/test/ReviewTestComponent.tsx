'use client';

import { useEffect, useState } from 'react';

// 테스트용 컴포넌트 — Claude Review 파이프라인 동작 확인 목적
// 의도적으로 리뷰 포인트 포함

type Episode = {
  id: number;
  title: string;
  date: string;
};

// any 타입 사용 (타입 약화)
async function fetchEpisodes(userId: any) {
  const res = await fetch(`/api/episodes?userId=${userId}`);
  return res.json();
}

export default function ReviewTestComponent({ userId }: { userId: number }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  // derived state를 useState로 관리 (불필요한 state)
  const [count, setCount] = useState(0);

  // useEffect로 파생 state 동기화 — derived state anti-pattern
  useEffect(() => {
    setCount(episodes.length);
  }, [episodes]);

  // 의존성 배열 누락
  useEffect(() => {
    setLoading(true);
    fetchEpisodes(userId).then((data) => {
      setEpisodes(data);
      setLoading(false);
    });
  }, []);

  // useCallback 없는 핸들러 (매 렌더마다 재생성)
  const handleDelete = (id: number) => {
    setEpisodes(episodes.filter((ep) => ep.id !== id));
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div>
      <h2>에피소드 목록 ({count}개)</h2>
      <ul>
        {episodes.map((ep) => (
          // key로 index 대신 id 사용하고 있으나, handleDelete가 매 렌더마다 재생성됨
          <li key={ep.id}>
            <span>{ep.title}</span>
            <button onClick={() => handleDelete(ep.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
