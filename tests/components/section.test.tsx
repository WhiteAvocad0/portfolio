import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from '@/components/layout/section';

describe('Section', () => {
  it('renders heading, numeral, and body content', () => {
    render(
      <Section number="01" title="About" id="about">
        <p>some body content</p>
      </Section>
    );
    const section = screen.getByRole('region', { name: /about/i });
    expect(section).toHaveAttribute('id', 'about');
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument();
    expect(screen.getByText('some body content')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });
});
