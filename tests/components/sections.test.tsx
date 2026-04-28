import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { TrailSection } from '@/components/sections/trail-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';

describe('AboutSection', () => {
  it('renders the section heading and About label', () => {
    render(<AboutSection />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/code that ships/i);
  });
});

describe('SkillsSection', () => {
  it('renders both skill groups with bars carrying --w', () => {
    const { container } = render(<SkillsSection />);
    expect(screen.getByText('Languages & Frameworks')).toBeInTheDocument();
    expect(screen.getByText('Infra & Tools')).toBeInTheDocument();
    const bars = container.querySelectorAll<HTMLElement>('.bar');
    expect(bars.length).toBeGreaterThan(0);
    expect(bars[0].style.getPropertyValue('--w')).toMatch(/%$/);
  });
});

describe('TrailSection', () => {
  it('renders the merged timeline with the now-marker entry', () => {
    const { container } = render(<TrailSection />);
    expect(container.querySelector('.ev.now')).toBeTruthy();
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(3);
  });
});

describe('ProjectsSection', () => {
  it('renders three project rows as anchor links', () => {
    const { container } = render(<ProjectsSection />);
    const rows = container.querySelectorAll('a.proj-row');
    expect(rows).toHaveLength(3);
  });
});

describe('ContactSection', () => {
  it('renders the email link and the CTA card', () => {
    const { container } = render(<ContactSection />);
    expect(
      screen.getByRole('link', { name: /hello@jeremywoon\.dev/ })
    ).toBeInTheDocument();
    expect(container.querySelector('.cta-card')).toBeTruthy();
  });
});

describe('Footer', () => {
  it('renders the candidate name and a built-with note', () => {
    render(<Footer />);
    expect(screen.getAllByText(/Jeremy Woon/).length).toBeGreaterThan(0);
    expect(screen.getByText(/built with next\.js/i)).toBeInTheDocument();
  });
});
