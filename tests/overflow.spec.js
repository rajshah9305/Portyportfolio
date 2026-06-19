import { test, expect } from '@playwright/test';

test('no horizontal overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('http://localhost:5173');

  // Wait for loading to complete
  await page.waitForSelector('main', { state: 'visible' });

  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  expect(overflow).toBe(false);
});
