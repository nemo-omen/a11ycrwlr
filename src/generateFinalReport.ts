import { readdir, readFile, writeFile } from "fs/promises";
import * as path from 'path';
import { TestResults, Result } from "./types";

const fDir = path.join(__dirname, '../playwright/axeResults');

type ResultsSummary = {
  title: string;
  url: string;
  violationCount: number;
  violations: any[];
};

export async function generateFinalReport(): Promise<Result> {
  const allFilenames = await readdir(fDir);
  const resultsArray: ResultsSummary[] = [];

  for (const fName of allFilenames) {
    const jsonFileContents = await readFile(`${fDir}/${fName}`, { encoding: 'utf-8' });
    const data: TestResults = JSON.parse(jsonFileContents);
    if (fName !== '00-summary.json' && data.results) {
      const summary: ResultsSummary = {
        title: data.title,
        url: data.url,
        violationCount: data.results.violations ? data.results.violations.length : 0,
        violations: data.results.violations ? data.results.violations : [],
      };
      resultsArray.push(summary);
    }
  }

  const data = JSON.stringify(resultsArray, null, 4);

  try {
    await writeFile(`${fDir}/00-summary.json`, data);
  } catch (error) {
    return { ok: false, error };
  }
  return { ok: true, value: 'success' };
}