import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LineReveal } from '@/components/layout/line-reveal';

describe('LineReveal', () => {
  it('renders each line as a separate element', () => {
    render(<LineReveal lines={['line one', 'line two']} />);
    expect(screen.getByText('line one')).toBeInTheDocument();
    expect(screen.getByText('line two')).toBeInTheDocument();
  });

  it('applies provided className to the wrapper', () => {
    const { container } = render(
      <LineReveal lines={['x']} className="text-2xl" />
    );
    expect(container.firstChild).toHaveClass('text-2xl');
  });
});
