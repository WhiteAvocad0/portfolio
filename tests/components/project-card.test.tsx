import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/sections/project-card';
import type { Project } from '@/lib/data';

const sample: Project = {
  id: 'P/01',
  name: 'Pulse',
  tagline: 'Real-time anomaly detection.',
  description: 'Final-year project.',
  stack: ['Next.js', 'FastAPI'],
  links: [{ label: 'repo', href: 'https://example.com' }],
};

describe('ProjectCard', () => {
  it('renders id, name, tagline, description', () => {
    render(<ProjectCard project={sample} />);
    expect(screen.getByText('P/01')).toBeInTheDocument();
    expect(screen.getByText('Pulse')).toBeInTheDocument();
    expect(screen.getByText('Real-time anomaly detection.')).toBeInTheDocument();
    expect(screen.getByText('Final-year project.')).toBeInTheDocument();
  });

  it('renders each stack tag and link', () => {
    render(<ProjectCard project={sample} />);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /repo/ })).toHaveAttribute('href', 'https://example.com');
  });
});
