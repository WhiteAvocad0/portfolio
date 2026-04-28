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

  it('renders the at-a-glance id-card with role and status', () => {
    render(<HeroSection />);
    expect(screen.getByLabelText(/at a glance/i)).toBeInTheDocument();
    expect(screen.getByText('Grad SWE')).toBeInTheDocument();
    expect(screen.getByText(/Open · Sept 2026/)).toBeInTheDocument();
  });

  it('renders the hero strip with education and CGPA', () => {
    render(<HeroSection />);
    expect(screen.getByText(/BSc IT · APU/)).toBeInTheDocument();
    expect(screen.getByText(/3\.7 \/ 4\.0/)).toBeInTheDocument();
  });

  it('renders the swipe-highlighted role keyword', () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector('.swipe')).toHaveTextContent('software');
  });
});
