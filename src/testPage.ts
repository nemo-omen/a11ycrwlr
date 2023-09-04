import { Page } from "playwright";
import { Result } from "./types";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults, TestOptions } from './types';

export async function testPage(page: Page, opts?: TestOptions): Promise<Result> {
  const axeResults: AxeResults = await new AxeBuilder({ page })
    .analyze()
    .catch((error) => ({ ok: false, error }));

  return { ok: true, value: axeResults };
}