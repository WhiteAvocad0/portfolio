'use client';
import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia('(pointer: coarse)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
  return window.matchMedia('(pointer: coarse)').matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useTouchDevice(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
