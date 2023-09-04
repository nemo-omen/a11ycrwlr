import { Browser, BrowserContext, chromium } from 'playwright';
import { authPages, loginPage, nonAuthPages } from './targetPages';
import { processLogin } from './processLogin';
import { testPage } from './testPage';
import { saveResults } from './saveResults';
import { processMany } from './processMany';
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

  // Test non-auth pages first
  const nonAuthResult = await processMany(page, nonAuthPages);

  if (!nonAuthResult.ok) {
    const { error } = nonAuthResult;
    return { browser, context, error };
  }

  const loginPageOpts = {
    url: loginPage.url,
    title: loginPage.title
  };

  const loginResult: Result = await processLogin(page, loginPageOpts);

  if (!loginResult.ok) {
    const { error } = loginResult;
    return { browser, context, error };
  }

  const homepageOpts = { url: page.url(), title: await page.title() };
  const homepageResult: Result = await testPage(page, homepageOpts);

  if (!homepageResult.ok) {
    const { error } = homepageResult;
    return { browser, context, error };
  }

  const homepageWriteResult: Result = await saveResults(
    homepageResult.value,
    homepageOpts
  );

  if (!homepageWriteResult.ok) {
    const { error } = homepageWriteResult;
    return { browser, context, error };
  };

  // move on to iterating over all auth urls
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