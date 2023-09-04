import { Browser, BrowserContext, chromium } from 'playwright';
import { authPages, loginPage, nonAuthPages } from './targetPages';
import { processLogin } from './processLogin';
import AxeBuilder from '@axe-core/playwright';
import { testPage } from './testPage';
import { saveResults } from './saveResults';
import { AxeResults, Result } from './types';
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

  const loginPageOpts = {
    url: loginPage.url,
    title: loginPage.title
  };

  const loginResult: Result = await processLogin(page, loginPageOpts);

  if (loginResult.error) return { browser, context, loginResult.error };

  const loginPageResult: Result = await testPage(page, loginPageOpts);

  if (!loginPageResult.ok) return { browser, context, loginPageResult.error };

  const loginPageWriteResult: Result = await saveResults(loginPageResult.value, loginPageOpts);

  if (!loginPageWriteResult.ok) return { browser, context, loginPageWriteResult.error };

  // move on to iterating over all other urls
  // but first, move some of the above to its own function

  return { browser, context };
}

run().then(async (progResult: { context: BrowserContext, browser: Browser, error?: string; }) => {
  const { browser, context, error } = progResult;
  if (error) {
    console.error(error);
  }

  await context.close();
  await browser.close();
});