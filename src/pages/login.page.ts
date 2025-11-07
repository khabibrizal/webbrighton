import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private usernameField = '#user-name';
  private passwordField = '#password';
  private loginBtn = '#login-button';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginBtn);
    await this.page.waitForLoadState('networkidle');
  }
}
