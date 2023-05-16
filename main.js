import { config } from './config.js';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const reportsDir = './reports';

let browser;
let startPage;
let links = new Set();
let cookies;

const axeConfig = {
  reporter: 'v2',
}

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
  console.log(`Generating report for ${await page.url()}`);
  const pageTitle = await page.title();
  const pageName = pageTitle.replaceAll(' ', '_');

  await page.waitForNetworkIdle();

  const results = await new AxePuppeteer(page).configure(axeConfig).analyze();
  const body = {results, pageName};
  console.log('Results done. Closing page...');
  // await page.close();
  return body;
}

function writeResults(results, name) {
  console.log('Writing results...');
  fs.writeFileSync(`./report/${name}.json`, JSON.stringify(results, null, 2));
}

async function visit(href) {
  if(href.length > 0) {
    // const page = await browser.newPage();
    // await page.setBypassCSP(true);
    // await page.setCookie(...cookies);
    await startPage.goto(href);
    await startPage.waitForNetworkIdle();
    await startPage.waitForTimeout(3000);
    // await page.close();
  }
}

async function main() {
  const ready = await login('https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskrsta.P_RegsStatusDisp');
  if(ready) {
    const {results, pageName} = await generateReport(startPage);
    writeResults(results, pageName);
    let title = await startPage.title();
    console.log('title: ', title);
    const sitemapEl = await startPage.$('a[href="/prod/twbksite.P_DispSiteMap?menu_name_in=bmenu.P_MainMnu&depth_in=2&columns_in=3"]');
    // console.log('sitemapEl: ', sitemapEl);
    await sitemapEl.click();
    await startPage.waitForNetworkIdle();
    title = await startPage.title();
    console.log('title: ', title);
    let linksList = await startPage.evaluate(() => {
      let links = Array.from(document.querySelectorAll('a'));
      links = links.map((a) => a.href);
      return links;
    });
    for(const href of linksList) {
      links.add(href);
    }
    
    for(const href of links) {
      visit(href);
      // console.log('href: ', href);
    }

    await startPage.waitForTimeout(5000);
  }
}

main().then(async() => {
  await browser.close();
});
