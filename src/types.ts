import { AxeResults } from "axe-core";
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