import { Page } from "playwright";
import type { Result } from "./types";
import { AUTH_EMAIL, AUTH_PASSWORD } from './constants';

export async function login(page: Page): Promise<Result> {
  await page.goto('https://ramport.angelo.edu');
  await page.waitForLoadState('networkidle');

  await page
    .getByLabel('username@angelo.edu')
    .fill(AUTH_EMAIL)
    .catch((error) => ({ ok: false, error }));

  await page
    .locator('input[value="Next"]')
    .click()
    .catch((error) => ({ ok: false, error }));

  await page
    .getByPlaceholder('Password')
    .fill(AUTH_PASSWORD)
    .catch((error) => ({ ok: false, error }));

  await page
    .locator('input[value="Sign in"]')
    .click()
    .catch((error) => ({ ok: false, error }));

  await page.waitForLoadState('networkidle');

  return { ok: true, value: page };
}