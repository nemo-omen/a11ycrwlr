import { chromium } from 'playwright';
import { targetPages } from './targetPages';
import { login } from './login';
import AxeBuilder from '@axe-core/playwright';
import { saveResults } from './saveResults';
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

  if (!loginResult.ok) {
    console.log("Oops! Couldn't log in!");
  }

  const axeResults = await new AxeBuilder({ page }).analyze().catch((error) => console.error(error));
  // console.log(axeResults);
  const testResult = {
    name: 'Home',
    url: 'https://ramport.angelo.edu',
    results: axeResults
  };

  saveResults(testResult);

  return { browser, context };
}

run().then(async ({ browser, context }) => {
  await context.close();
  await browser.close();
});