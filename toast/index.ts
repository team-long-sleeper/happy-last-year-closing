'use client';

import { useEffect, useState } from 'react';

type ToastType = 'SUCCESS' | 'ERROR';
type Toast = { id: number; message: string; type: ToastType };

let toasts: Toast[] = [];
const listeners = new Set<(toasts: Toast[]) => void>();

const notify = () => listeners.forEach((fn) => fn(toasts));

export const toast = (message: string, type: ToastType) => {
  const id = Date.now();
  toasts = [...toasts, { id, message, type }];
  notify();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }, 3000);
};

export const useToasts = () => {
  const [state, setState] = useState<Toast[]>(toasts);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state;
};
