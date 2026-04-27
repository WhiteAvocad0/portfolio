import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/hero/hero-section';

describe('HeroSection', () => {
  it('renders the candidate name as the page h1', () => {
    render(<HeroSection />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Jeremy Woon');
  });

  it('renders the timezone footer text', () => {
    render(<HeroSection />);
    expect(screen.getByText(/KL · GMT\+8/)).toBeInTheDocument();
  });

  it('renders the section number marker', () => {
    render(<HeroSection />);
    expect(screen.getByText('01 / 08')).toBeInTheDocument();
  });
});
