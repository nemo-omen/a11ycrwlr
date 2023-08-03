import { config } from "./config.js";
import fs from "fs";
import puppeteer from "puppeteer";
import { AxePuppeteer } from "@axe-core/puppeteer";

const reportsDir = "./reports";

let browser;
let startPage;
let links = new Set();
let visited = new Set();
let cookies;

const axeConfig = {
  reporter: "v2",
};

async function login(url) {
  browser = await puppeteer.launch({
    // devtools: true,
    headless: false,
    // headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 1024,
    },
    ignoreDefaultArgs: ["--enable-automation"],
  });

  startPage = await browser.newPage();
  await startPage.setBypassCSP(true);

  await startPage.goto(url);
  await startPage.type("#username", process.env.RAMPORT_USERNAME);
  await startPage.type("#password", process.env.RAMPORT_PASSWORD);

  await Promise.all([
    startPage.click(".btn"),
    (cookies = await startPage.cookies()),
    startPage.waitForNetworkIdle(),
  ]);

  writeCookies(cookies);
  return true;
}

async function generateReport(page) {
  console.log(`Generating report for ${await page.url()}`);
  const pageTitle = await page.title();
  const pageName = pageTitle.replaceAll(" ", "_");

  await page.waitForNetworkIdle();

  const results = await new AxePuppeteer(page).configure(axeConfig).analyze();
  const body = { results, pageName };
  console.log("Results done. Closing page...");
  // await page.close();
  return body;
}

function writeCookies(c) {
  fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
}

function writeResults(results, name) {
  console.log("Writing results...");
  fs.writeFileSync(`./report/${name}.json`, JSON.stringify(results, null, 2));
}

async function visit(href) {
  if (href.length > 0) {
    const page = await browser.newPage();
    await page.setBypassCSP(true);
    await page.setCookie(...JSON.parse(fs.readFileSync("./cookies.json")));
    await page.goto(href);
    // await page.waitForNavigation();
    // await page.waitForNetworkIdle();
    addLinks(page);

    const { results, pageName } = await generateReport(page);
    writeResults(results, pageName);

    try {
      page
        .screenshot({
          path: `./images/${pageName}.jpg`,
          type: "jpeg",
          quality: 50,
        })
        .then(() => {
          // await page.waitForTimeout(1000);
          page.close();
        });
    } catch (error) {
      console.error(error);
      page.close();
    }
  }
}

async function addLinks(page) {
  let linksList = await page.evaluate(() => {
    let links = Array.from(document.querySelectorAll("a"));
    links = links.map((a) => a.href);
    return links;
  });

  for (const href of linksList) {
    links.add(href);
  }
}

async function main() {
  const ready = await login(
    "https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskrsta.P_RegsStatusDisp"
  );
  if (ready) {
    const { results, pageName } = await generateReport(startPage);
    writeResults(results, pageName);
    let title = await startPage.title();
    console.log("title: ", title);
    const sitemapEl = await startPage.$(
      'a[href="/prod/twbksite.P_DispSiteMap?menu_name_in=bmenu.P_MainMnu&depth_in=2&columns_in=3"]'
    );
    // console.log('sitemapEl: ', sitemapEl);
    await sitemapEl.click();
    await startPage.waitForNetworkIdle();
    title = await startPage.title();
    console.log("title: ", title);

    await addLinks(startPage);

    while (links.size > 0) {
      const targetLink = Array.from(links)[0];
      if (!visited.has(targetLink)) {
        links.delete(targetLink);
        visit(targetLink);
        visited.add(targetLink);
      }
    }

    await startPage.waitForTimeout(1000);
  }
}

main().then(async () => {
  await browser.close();
});
