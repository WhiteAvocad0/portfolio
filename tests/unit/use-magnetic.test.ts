import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useMagnetic } from '@/lib/hooks/use-magnetic';

describe('useMagnetic', () => {
  it('returns x and y motion values', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useMagnetic(ref);
    });
    expect(result.current.x).toBeDefined();
    expect(result.current.y).toBeDefined();
    expect(typeof result.current.x.get).toBe('function');
  });
});
