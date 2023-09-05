import { Page } from "playwright";
import type { TestOptions } from "./types";
import type { Result } from "./types";
import { AUTH_EMAIL, AUTH_PASSWORD } from './constants';
import { testPage } from "./testPage";
import { saveResults } from "./saveResults";
const authFile = 'playwright/.auth/user.json';

export async function processLogin(loginPage: Page, loginOpts: TestOptions): Promise<Result> {
  await loginPage.goto(loginOpts.url);
  await loginPage.waitForLoadState('networkidle');

  // Test 1
  const test1Opts = {
    url: loginOpts.url,
    title: 'Login - Enter Username'
  };

  const test1Result = await testPage(loginPage);

  if (!test1Result.ok) return test1Result;

  const test1WriteResult = await saveResults(
    test1Result.value,
    test1Opts,
  );

  if (!test1WriteResult.ok) return test1WriteResult;

  await loginPage
    .getByLabel('username@angelo.edu')
    .fill(AUTH_EMAIL)
    .catch((error) => ({ ok: false, error }));

  await loginPage
    .locator('input[value="Next"]')
    .click()
    .catch((error) => ({ ok: false, error }));

  // Test 2
  const test2Opts = {
    url: loginOpts.url,
    title: 'Login - Enter Password',
  };

  const test2Result = await testPage(loginPage);

  if (!test2Result.ok) return test1Result;

  const test2WriteResult = await saveResults(
    test1Result.value,
    test2Opts,
  );

  if (!test2WriteResult.ok) return test2WriteResult;

  await loginPage
    .getByPlaceholder('Password')
    .fill(AUTH_PASSWORD)
    .catch((error) => ({ ok: false, error }));

  await loginPage
    .locator('input[value="Sign in"]')
    .click()
    .catch((error) => ({ ok: false, error }));

  await loginPage.waitForLoadState('networkidle');

  await loginPage.context().storageState({ path: authFile });

  console.log('Login auth state saved. Ready to proceed...');

  return { ok: true, value: loginPage };
}