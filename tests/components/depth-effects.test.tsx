import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DepthEffects } from '@/components/effects/depth-effects';

describe('DepthEffects', () => {
  it('mounts without throwing and renders nothing', () => {
    const { container } = render(<DepthEffects />);
    expect(container.firstChild).toBeNull();
  });

  it('cleans up cleanly on unmount', () => {
    const { unmount } = render(<DepthEffects />);
    expect(() => unmount()).not.toThrow();
  });
});
