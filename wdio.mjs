// import { browser } from '@wdio/globals';
import { config } from './config.mjs';
import { remote } from 'webdriverio';
// import { $ } from '@wdio/globals';
import AxeBuilder from '@axe-core/webdriverio';
import fs from 'fs';

const { startURL, username, password } = config;
const userNameInputID = '#username';
const passwordInputID = '#password';
const sitemapURL = 'ssb.angelo.edu/prod/twbksite.P_DispSiteMap?menu_name_in=bmenu.P_MainMnu&depth_in=2&columns_in=3';

let cookies;
let browser;
let sitemapAnchor;

const load = async() => {
  // const builder = new AxeBuilder({client: browser});
  
  browser = await remote({
    logLevel: 'error',
    capabilities: {
      browserName: 'chrome'
    }
  });

  // await browser.url(startURL);
  const builder = new AxeBuilder({client: browser});
  await browser.url(startURL);

  const userNameInput = await browser.$(userNameInputID)
  userNameInput.waitForExist();
  await userNameInput.setValue(username);
  const passwordInput = await browser.$(passwordInputID);
  passwordInput.waitForExist();
  await passwordInput.setValue(password);

  const button = await browser.$('.btn-primary');
  button.waitForClickable();
  await button.click();
  cookies = await browser.getCookies();
  return true;
};

async function getAxeResult(href) {
  browser.setCookies(...cookies);
  await browser.url(href);
  const title = await browser.getTitle();
  const name = title.replaceAll(' ', '_');
  let result;

  try {
    result = await builder.analyze();
  } catch (error) {
    console.error(error);
    result = {error};
  }
  return result;
}

function writeResult(name, result) {
  try {
    fs.writeFileSync(`./report/${name}.json`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
  console.log(`./report/${name}.json saved`);
}

const didLoad = await load();

console.log(cookies);
// if(didLoad) {
//   const result = await getAxeResult(sitemapURL);
//   const title = await browser.getTitle();
//   const name = title.replaceAll(' ', '_');
//   writeResult(name, result);
// }