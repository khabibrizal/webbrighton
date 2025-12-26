import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { setDefaultTimeout } from '@cucumber/cucumber';

//setDefaultTimeout(60 * 1000);

let page: Page;
let loginPage: LoginPage;

Given('pengguna berada di halaman Home', async function () {
  const browser = this.browser; // dari World
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.openHomePage();
});

When('pengguna klik icon people', async function () {
  await page.waitForLoadState('domcontentloaded');

  const btn = page.getByRole('button', {
    name: 'Menu Profil'
  });

  await btn.waitFor({ timeout: 30000 });
  await btn.click({ force: true });
});


When('pengguna klik Tab Agen Brighton', async function () {
  await loginPage.clickTabAgenBrighton();
});

When('pengguna input user dan password', async function () {
  await loginPage.inputCredential(
    'husni',
    'ITpro25'
  );
});

When('klik button login', async function () {
  await loginPage.clickLoginButton();
});

Then('pengguna berhasil login', async function ()  {
  await loginPage.verifyLoginSuccess();
});
