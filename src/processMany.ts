import { testPage } from "./testPage";
import { saveResults } from "./saveResults";
import type { Result, TestOptions } from "./types";
import { Page } from "playwright";
type ManyResults = {
  complete: Result[],
  errors: Result[];
};

export async function processMany(page: Page, targets: TestOptions[]): Promise<Result> {

  const results: ManyResults = {
    complete: [],
    errors: []
  };

  for (const target of targets) {
    await page.goto(target.url);
    await page.waitForLoadState('networkidle');
    const testResult = await testPage(page);
    if (!testResult.ok) {
      results.errors.push(testResult);
    }
    const writeResult = await saveResults(
      testResult.value,
      { title: await page.title(), url: target.url },
    );
    console.log({ writeResult });
    if (!writeResult.ok) {
      results.errors.push(writeResult);
    } else {
      results.complete.push(writeResult);
    }
  }
  return { ok: true, value: results };
}