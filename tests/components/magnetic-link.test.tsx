import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MagneticLink } from '@/components/navigation/magnetic-link';

describe('MagneticLink', () => {
  it('renders an anchor with href and content', () => {
    render(<MagneticLink href="https://example.com">click me</MagneticLink>);
    const link = screen.getByRole('link', { name: 'click me' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('passes through className', () => {
    render(
      <MagneticLink href="#" className="font-mono">
        x
      </MagneticLink>
    );
    expect(screen.getByRole('link')).toHaveClass('font-mono');
  });
});
