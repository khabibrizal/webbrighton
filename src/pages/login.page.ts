import { Page, expect } from '@playwright/test';
import path from "path";

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
  listingMenuButton = 'button[data-slot="sidebar-menu-button"]:has-text("Listing")';
  BuatlistingButton = 'button:has-text("Buat Listing")';
  listingAddUrl = '**/listing/add';
  formTambahListingTitle = 'text=Form Tambah Listing';
  uploadButton = 'body > div.group\\/sidebar-wrapper.has-data-\\[variant\\=inset\\]\\:bg-sidebar.flex.min-h-svh.w-full > div.flex-1.relative.overflow-hidden > main > div > form > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > button';
  fileInput = 'input[type="file"]';
  cropModalTitle = 'text=Crop Gambar';
  cropButton = 'button:has-text("Crop")';
  previewImage = 'img[alt="Preview 1"]';
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
    await this.page.goto('https://www.brighton.co.id/');
  }

  async clickPeopleIcon() {
    await this.page.waitForLoadState('networkidle');

    const profileButton = this.page.getByRole('button', { name: 'Menu Profil' });

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

  async clickListingMenu() {
    await this.page.click(this.listingMenuButton);
  }

  async clickBuatListing() {
    await this.page.click(this.BuatlistingButton);
  }

  async assertOnListingAddPage() {
    await this.page.waitForURL(this.listingAddUrl);
    await expect(this.page).toHaveURL(/\/listing\/add/);

    //await expect(this.page.locator(this.formTambahListingTitle)).toBeVisible();
    //await expect(this.page.locator(this.uploadFotoButton)).toBeVisible();
  }

  async clickUploadFoto() {
    // tunggu tombol upload visible
    //await this.page.locator(this.uploadButton).waitFor({ state: "visible", timeout: 30000 });

    const uploadBtn = this.page.locator(this.uploadButton);

    // tunggu tombol benar-benar muncul
    await uploadBtn.waitFor({ state: "visible", timeout: 30000 });

    // scroll biar kelihatan
    await uploadBtn.scrollIntoViewIfNeeded();

    // klik
    await uploadBtn.click();
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: "attached", timeout: 30000 });
  }

  async uploadFotoDariPC(fileName: string) {
    const filePath = path.resolve(`test-data/${fileName}`);

    const fileInput = this.page.locator('input[type="file"]');

    // SET FILE LANGSUNG
    await fileInput.setInputFiles(filePath);

    // Tunggu modal crop muncul
    await expect(this.page.locator(this.cropModalTitle)).toBeVisible({ timeout: 30000 });
  }

  async cropFoto() {
    await expect(this.page.locator(this.cropModalTitle)).toBeVisible();
    await this.page.locator(this.cropButton).click();
  }

  async verifyUploadBerhasil() {
    await expect(this.page.locator(this.previewImage)).toBeVisible();

    const src = await this.page.locator(this.previewImage).getAttribute("src");
    expect(src).toContain("Uploads/Images");
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
