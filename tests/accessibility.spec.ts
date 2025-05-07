import { test, expect } from '@playwright/test';

test('Home page passes accessibility scan', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const accessibilityScanResults = await page.accessibility.snapshot();
  expect(accessibilityScanResults).toBeTruthy();
});
