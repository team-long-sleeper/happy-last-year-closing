'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}
export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// 쿼리클라이언트를 const가 아니라 state로 정의하는 이유?
// -> component lifecycle
