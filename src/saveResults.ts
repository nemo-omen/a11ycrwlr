import { writeFile } from 'fs/promises';
import * as path from 'path';
import type { AxeResults, Result, TestOptions, TestResults } from './types';
import kebabCase from 'just-kebab-case';


const fDir = path.join(__dirname, '../playwright/axeResults');

export async function saveResults(testResult: AxeResults, opts: TestOptions): Promise<Result> {
  const fName = kebabCase(opts.title);

  const results: TestResults = {
    title: opts.title,
    url: opts.url,
    results: testResult
  };

  const data = JSON.stringify(results, null, 4);
  const writeResult = await writeFile(`${fDir}/${fName}.json`, data).catch((error) => ({ ok: false, error }));
  return { ok: true, value: writeResult };
}
