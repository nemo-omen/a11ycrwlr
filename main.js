import puppeteer from 'puppeteer';

// #siteLogo
let browser;
let page;
let links = new Set();
async function login(url) {
  browser = await puppeteer.launch({
    // devtools: true,
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 1024,
    }
  });

  page = await browser.newPage();

  await page.goto('https://ramport.angelo.edu');
  await page.type('#username', 'jcaldwell2');
  await page.type('#password', '?!Mkm11251976!?1');
  await Promise.all([
    page.click('.btn'),
    page.waitForNavigation({waitUntil: 'networkidle2'})
  ]);

  return true;
}

const ready = await login();

if(ready) {
  await page.waitForNavigation({waitUntil: 'networkidle2'});
  console.log('Logged in, ready to crawl.');
  // let allLinks;
  await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll('a'));
    let allLinks = elements.map((element) => element.href);
    allLinks.forEach((link) => links.add(link));
  });
  // return allLinks;

  // allLinks.forEach((link) => links.add(link));
}
console.log({links});