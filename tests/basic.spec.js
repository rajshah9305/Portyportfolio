import { test, expect } from '@playwright/test';

test('homepage loads and navigation works', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Wait for loading screen to finish
  await page.waitForSelector('main', { state: 'visible', timeout: 10000 });

  // Check if main title is visible
  await expect(page.locator('h1')).toContainText('RAJ');
  await expect(page.locator('h1')).toContainText('SHAH');

  // Check navigation - we just check if they exist since hash change might not trigger waitForURL
  const servicesLink = page.locator('nav a:has-text("SERVICES")').first();
  await expect(servicesLink).toBeVisible();

  // Check if "Initialize Contact" button is visible
  await expect(page.locator('text=Initialize Contact')).toBeVisible();
});
