import { chromium } from 'playwright';
import { targetPages } from './targetPages';
import { login } from './login';
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

  const loginResult = await login(page);

  if (loginResult.ok) {
    console.log('Logged in!');
  }

  return { browser, context };
}

run().then(async ({ browser, context }) => {
  await context.close();
  await browser.close();
});