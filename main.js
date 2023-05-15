const dotenv =  require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const reportsDir = './reports';

let browser;
let startPage;
let links = new Set();
let cookies;

async function login(url) {
  browser = await puppeteer.launch({
    // devtools: true,
    headless: false,
    // headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 1024,
    },
    ignoreDefaultArgs: ['--enable-automation']
  });

  startPage = await browser.newPage();
  await startPage.setBypassCSP(true);

  await startPage.goto(url);
  await startPage.type('#username', process.env.RAMPORT_USERNAME);
  await startPage.type('#password', process.env.RAMPORT_PASSWORD);

  await Promise.all([
      startPage.click('.btn'),
      startPage.waitForNetworkIdle()
    ]);

  cookies = await startPage.cookies();
  return true;
}

async function generateReport(page) {
  console.log(`Visiting ${await page.url()}`);
  const pageTitle = await page.title();
  const pageName = pageTitle.replaceAll(' ', '_');

  const results = await new AxePuppeteer(page).analyze();
  console.log('Results done. Closing page...');
  const body = {results, pageName};
  await page.close();
  return body;
}

function writeResults(results, name) {
  console.log('Writing results...');
  fs.writeFileSync(`./report/${name}.json`, JSON.stringify(results, null, 2));
}

async function main() {
  const ready = await login('https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskrsta.P_RegsStatusDisp');
  if(ready) {
    const {results, pageName} = await generateReport(startPage);
    writeResults(results, pageName);
  }
}

main().then(async() => {
  await browser.close();
});
