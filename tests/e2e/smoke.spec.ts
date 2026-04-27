import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('renders the candidate name as h1', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jeremy Woon');
  });

  test('renders all 8 sections', async ({ page }) => {
    await page.goto('/');
    for (const id of ['hero', 'about', 'education', 'skills', 'projects', 'experience', 'certifications', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('resume download link points to /resume.pdf', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /download resume pdf/i });
    await expect(link).toHaveAttribute('href', '/resume.pdf');
  });

  test('honours prefers-reduced-motion (no custom cursor)', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    // The custom cursor body class should not be applied
    await expect(page.locator('body.has-custom-cursor')).toHaveCount(0);
    await context.close();
  });
});
