import type AxeResults from '@axe-core/playwright';
export type Result = { ok: true, value: any; } | { ok: false, error: string; };
export type TestOptions = {
  title: string;
  url: string;
};

export type TestResults = {
  title: string;
  url: string;
  results: AxeResults;
};

export { AxeResults };