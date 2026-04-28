import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('renders the candidate name as h1', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jeremy');
  });

  test('renders the six sections of the v3 layout', async ({ page }) => {
    await page.goto('/');
    for (const id of ['hero', 'about', 'skills', 'trail', 'projects', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('resume link points to /resume.pdf', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /download pdf/i }).first();
    await expect(link).toHaveAttribute('href', '/resume.pdf');
  });

  test('does not render a top navigation bar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toHaveCount(0);
  });
});
