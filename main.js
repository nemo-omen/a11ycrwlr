const dotenv =  require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const reportsDir = './reports';

let browser;
let page;
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

  page = await browser.newPage();
  await page.setBypassCSP(true);

  await page.goto(url);
  await page.type('#username', process.env.RAMPORT_USERNAME);
  await page.type('#password', process.env.RAMPORT_PASSWORD);

  await Promise.all([
      page.click('.btn'),
      page.waitForNetworkIdle()
    ]);

  cookies = await page.cookies();
  const pageTitle = await page.title();
  const pageName = pageTitle.replaceAll(' ', '_');

  const results = await new AxePuppeteer(page).analyze();
  writeResults(results, pageName);
  await page.close();
  await browser.close();
  return true;
}

function writeResults(results, name) {
  console.log('Writing results...');
  fs.writeFileSync(`./report/${name}.json`, JSON.stringify(results));
}

async function main() {
  const ready = await login('https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskrsta.P_RegsStatusDisp');
  // const ready = await login('https://ramport.angelo.edu');
}

main();
