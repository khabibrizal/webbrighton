import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ===== Selectors =====
  peopleIcon = 'button[aria-label="Menu profile"]';
  tabAgenBrighton = 'text=Agen Brighton';
  usernameInput = 'input[name="username"], input#username';
  passwordInput = 'input[name="password"], input#password';
  loginButton = 'button[type="submit"], button:has-text("Login")';
  //peoppleicondashboard = 'button[aria-label="Menu Profil"]';

async waitLoginFormReady() {
  const loginForm = this.page.locator('form').filter({
    has: this.page.locator('#password')
  });

  await loginForm.waitFor({
    state: 'visible',
    timeout: 30000
  });
}
  // ===== Actions =====
  async openHomePage() {
    await this.page.goto('https://brighton-site.brighton.co.id/');
  }

  async clickPeopleIcon() {
  await this.page.waitForLoadState('networkidle');

  const profileButton = this.page.getByRole('button', {name: 'Menu Profil'});

  await profileButton.waitFor({ state: 'visible', timeout: 30000 });
  await profileButton.click({ force: true });
}

  async clickTabAgenBrighton() {
    await this.page.waitForSelector(this.tabAgenBrighton);
    await this.page.click(this.tabAgenBrighton);
  }

  async inputCredential(username: string, password: string) {
  //await this.waitLoginFormReady();
  //await this.page.keyboard.press('Escape');


  const usernameInput = this.page.locator('#username');
  const passwordInput = this.page.locator('#password');

  // username
  //await usernameInput.scrollIntoViewIfNeeded();
  await usernameInput.waitFor({ state: 'visible' });
  await usernameInput.fill(username);

  // password
  //await passwordInput.scrollIntoViewIfNeeded();
  await passwordInput.waitFor({ state: 'visible' });
  await passwordInput.fill(password);
  }

  async clickLoginButton() {
  // Ambil FORM LOGIN saja (bukan subscribe)
  const loginForm = this.page.locator('form').filter({
    has: this.page.locator('#password')
  });

  await loginForm.waitFor({ state: 'visible', timeout: 30000 });

  // Ambil button Login DI DALAM form login
  const loginButton = loginForm.getByRole('button', {
    name: /login/i
  });

  // Pastikan button Login terlihat & tidak ke-scroll ke subscribe
  await loginButton.scrollIntoViewIfNeeded();
  await loginButton.waitFor({ state: 'visible' });

  await loginButton.click();
}

  async verifyLoginSuccess() {
  await expect(
    this.page.getByText('HUSNI PUTRA LI (IZEH)')
  ).toBeVisible({ timeout: 30000 });

  // Validasi tombol Logout
  //await expect(
    //this.page.getByRole('button', { name: 'Logout' })
  //).toBeVisible();
}
}
