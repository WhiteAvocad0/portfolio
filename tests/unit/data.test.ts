import { describe, it, expect } from 'vitest';
import {
  profile, education, skills, projects, experience, certifications,
} from '@/lib/data';

describe('content data', () => {
  it('exposes a profile with name and contact details', () => {
    expect(profile.name).toBeTruthy();
    expect(profile.contact.email).toMatch(/@/);
    expect(profile.contact.resumeUrl).toMatch(/\.pdf$/);
  });

  it('has APU education entry', () => {
    expect(education.institution).toContain('Asia Pacific University');
  });

  it('has at least three skill groups', () => {
    expect(skills.length).toBeGreaterThanOrEqual(3);
    skills.forEach(g => expect(g.items.length).toBeGreaterThan(0));
  });

  it('has exactly three projects with stack and links', () => {
    expect(projects).toHaveLength(3);
    projects.forEach(p => {
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.id).toMatch(/^P\/\d{2}$/);
    });
  });

  it('has at least one experience entry', () => {
    expect(experience.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least three certifications, sorted descending by year', () => {
    expect(certifications.length).toBeGreaterThanOrEqual(3);
    const years = certifications.map(c => c.year);
    expect([...years].sort((a, b) => b - a)).toEqual(years);
  });
});
