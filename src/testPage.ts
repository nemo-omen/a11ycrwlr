import { Page } from "playwright";
import { Result } from "./types";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults, TestOptions } from './types';

/**
 * Runs Axe tests on the given page.
 * @param page The Puppeteer page
 * @param opts 
 * @returns 
 */
export async function testPage(page: Page): Promise<Result> {
  const axeResults: AxeResults = await new AxeBuilder({ page })
    .options({ resultTypes: ['incomplete', 'violations'] })
    .analyze()
    .catch((error) => ({ ok: false, error }));

  return { ok: true, value: axeResults };
}