import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import 'dotenv/config';


test('login & save storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Buka home
  await page.goto('https://brighton-site.brighton.co.id/');

  // 2. Klik menu profil
  await loginPage.clickPeopleIcon();

  // 3. Klik Agen Brighton
  await loginPage.clickTabAgenBrighton();

  // 4. Input credential
  await loginPage.inputCredential(
    process.env.BRIGHTON_USER || 'husni',
    process.env.BRIGHTON_PASS || 'ITpro25'
  );

  // 5. Klik login
  await loginPage.clickLoginButton();

  // 6. Validasi dashboard (SPA-safe)
  await expect(page.getByText('Dashboard Agent'))
    .toBeVisible({ timeout: 30000 });

  // 7. SIMPAN SESSION
  await page.context().storageState({
    path: 'storageState.json'
  });
});

