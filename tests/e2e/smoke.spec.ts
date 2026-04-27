import { test, expect } from '@playwright/test';

test('homepage renders the candidate name', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jeremy Woon');
});
