import { writeFile } from 'fs/promises';
import * as path from 'path';
import { Result } from "./types";
import type AxeResults from '@axe-core/playwright';
import kebabCase from 'just-kebab-case';
type AxeTestResult = {
  name: string;
  url: string;
  results: AxeResults;
};

const fDir = path.join(__dirname, '../playwright/axeResults');

export async function saveResults(testResult: AxeTestResult): Promise<Result> {
  const fName = kebabCase(testResult.name);
  const data = JSON.stringify(testResult);
  const writeResult = await writeFile(`${fDir}/${fName}.json`, data).catch((error) => ({ ok: false, error }));
  return { ok: true, value: writeResult };
}
