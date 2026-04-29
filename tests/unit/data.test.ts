import { describe, it, expect } from 'vitest';
import { profile, skills, trail, projects, sectionMeta } from '@/lib/data';

describe('content data', () => {
  it('exposes a profile with name and contact details', () => {
    expect(profile.name).toBeTruthy();
    expect(profile.contact.email).toMatch(/@/);
    expect(profile.contact.resumeUrl).toMatch(/\.pdf$/);
  });

  it('has at least two skill groups, each with weighted items', () => {
    expect(skills.length).toBeGreaterThanOrEqual(2);
    skills.forEach((g) => {
      expect(g.items.length).toBeGreaterThan(0);
      g.items.forEach((s) => {
        expect(s.name).toBeTruthy();
        expect(s.pct).toBeGreaterThan(0);
        expect(s.pct).toBeLessThanOrEqual(100);
      });
    });
  });

  it('merges education, experience, and certifications into a single trail', () => {
    expect(trail.length).toBeGreaterThanOrEqual(3);
    expect(trail.some((e) => e.kind.toLowerCase().includes('education'))).toBe(true);
    expect(trail.some((e) => e.kind.toLowerCase().includes('certification'))).toBe(true);
    expect(trail.some((e) => e.now)).toBe(true);
  });

  it('has exactly three projects with stack arrays', () => {
    expect(projects).toHaveLength(3);
    projects.forEach((p) => {
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.id).toMatch(/^P \/ \d{2}$/);
      expect(p.year.length).toBeGreaterThan(0);
    });
  });

  it('exposes meta for each top-level section', () => {
    const keys = Object.keys(sectionMeta);
    expect(keys.length).toBeGreaterThanOrEqual(5);
    keys.forEach((k) => {
      const m = sectionMeta[k as keyof typeof sectionMeta];
      expect(m.number).toMatch(/^\d{2}$/);
      expect(m.label).toBeTruthy();
    });
  });
});
