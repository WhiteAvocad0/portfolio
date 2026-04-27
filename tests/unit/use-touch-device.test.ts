import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTouchDevice } from '@/lib/hooks/use-touch-device';

describe('useTouchDevice', () => {
  beforeEach(() => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q: string) => ({
      matches: q.includes('coarse'),
      media: q,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList);
  });

  it('returns true when pointer is coarse', () => {
    const { result } = renderHook(() => useTouchDevice());
    expect(result.current).toBe(true);
  });
});
