import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setViewportSize({
    width: 930,
    height: 1080
  });

  await page.goto('https://css-tricks.com');
  await page.waitForLoadState('networkidle');
  setTimeout(() => {
    //
  }, 3000);
  return { browser, context };
}

run().then(async ({ browser, context }) => {
  await context.close();
  await browser.close();
});