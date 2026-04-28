import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/hero/hero-section';

describe('HeroSection', () => {
  it('renders the candidate name as the page h1', () => {
    render(<HeroSection />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Jeremy/);
    expect(h1).toHaveTextContent(/Woon/);
  });

  it('renders the at-a-glance id-card with status, location, and email', () => {
    render(<HeroSection />);
    expect(screen.getByLabelText(/at a glance/i)).toBeInTheDocument();
    expect(screen.getByText(/Open · Sept 2026/)).toBeInTheDocument();
    expect(screen.getByText(/Kuala Lumpur, MY/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hello@jeremywoon\.dev/ })).toBeInTheDocument();
  });

  it('renders the swipe-highlighted role keyword', () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector('.swipe')).toHaveTextContent('software');
  });

  it('renders the avatar placeholder image', () => {
    render(<HeroSection />);
    const img = screen.getByRole('img', { name: /profile photo/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toMatch(/avatar\.svg/);
  });

  it('does not render the removed hero info strip', () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector('.strip')).toBeNull();
  });
});
