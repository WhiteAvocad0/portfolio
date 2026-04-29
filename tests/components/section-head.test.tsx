import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHead, sectionHeadingId } from '@/components/sections/section-head';

describe('SectionHead', () => {
  it('renders the numeral and label for a section key', () => {
    render(<SectionHead section="trail" />);
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('Trail')).toBeInTheDocument();
  });

  it('renders children in the title slot', () => {
    render(
      <SectionHead section="about">
        <h2 id={sectionHeadingId('about')}>
          Code that ships, <em>quietly.</em>
        </h2>
      </SectionHead>
    );
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(/Code that ships/);
    expect(h2.id).toBe('about-heading');
  });

  it('omits the title slot but stays well-structured when no children are passed', () => {
    const { container } = render(<SectionHead section="contact" />);
    expect(container.querySelector('.head')).toBeTruthy();
    expect(screen.queryByRole('heading')).toBeNull();
  });
});
