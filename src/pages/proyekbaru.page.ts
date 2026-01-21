
import { Page, expect } from '@playwright/test';

export class ProyekBaruPage {
  constructor(private page: Page) {}

  // ===== Getters (AMAN) =====
  get filterButton() {
    return this.page.getByRole('button', { name: /filter/i });
  }

  get filterDialog() {
    return this.page.getByRole('dialog');
  }

  get kategoriDropdown() {
    return this.filterDialog.getByRole('combobox', {
      name: /kategori/i
    });
  }

  get kotaDropdown() {
    return this.filterDialog.getByRole('combobox', {
      name: /kota/i
    });
  }

  get cariButton() {
    return this.filterDialog.getByRole('button', {
      name: /^cari$/i
    });
  }

  get listingCard() {
    return this.page.locator('[data-testid="property-card"], article');
  }

  // ===== Actions =====
  async openProyekBaruPage() {
    await this.page.goto('https://brighton-site.brighton.co.id/perumahan-baru');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openFilter() {
    await this.filterButton.waitFor({ state: 'visible' });
    await this.filterButton.click();

    await this.filterDialog.waitFor({ state: 'visible' });
  }

  async selectKategoriLokal() {
  const dialog = this.page.getByRole('dialog');

   // 1️⃣ Ambil SEMUA combobox di dialog
  const comboboxes = dialog.locator('button[role="combobox"]');

  // pastikan combobox muncul
  await comboboxes.first().waitFor({ state: 'visible', timeout: 30000 });

  // 2️⃣ KLIK COMBOBOX PERTAMA = KATEGORI
  const kategoriDropdown = comboboxes.nth(0);

  await kategoriDropdown.scrollIntoViewIfNeeded();
  await kategoriDropdown.click({ force: true });

  // 3️⃣ Tunggu list option muncul
  const lokalOption = this.page
    .locator('[role="option"]')
    .filter({ hasText: /^Lokal$/ })
    .first();

  await lokalOption.waitFor({ state: 'visible', timeout: 10000 });
  await lokalOption.click();

}

async selectKota(kota: string) {
  // 1. Klik dropdown KOTA
  const dialog = this.page.getByRole('dialog');
  const comboboxButtons = dialog.locator('button[role="combobox"]');

  const kotaDropdown = comboboxButtons.nth(1);
  await kotaDropdown.click();

  // 2. Ambil LISTBOX TERAKHIR (yang baru kebuka)
  const listbox = this.page
    .locator('[role="listbox"]')
    .last();

  await listbox.waitFor({ state: 'visible', timeout: 10000 });

  // 3. Pilih kota
  const kotaOption = listbox
    .locator('[role="option"]')
    .filter({ hasText: new RegExp(`^${kota}$`, 'i') })
    .first();

  await kotaOption.scrollIntoViewIfNeeded();
  await kotaOption.click();
}


async selectpengembang(pengembang: string) {
  const dialog = this.page.getByRole('dialog');

  // 1️⃣ BUKA DROPDOWN PENGEMBANG (FIELD TEXT)
  const pengembangField = dialog.getByText('Pilih Pengembang', { exact: true });
  await pengembangField.click({ force: true });

  // 2️⃣ TUNGGU LIST Pengembang MUNCUL (RADIX PORTAL)
  const listContainer = this.page.locator('[role="listbox"]');
  await listContainer.waitFor({ state: 'visible', timeout: 15000 });

  // 3️⃣ SCROLL LIST SAMPAI PENGEMBANG KETEMU
  let pengembangOption;

  for (let i = 0; i < 15; i++) {
    pengembangOption = this.page
      .locator('[role="option"]')
      .filter({ hasText: new RegExp(`^${pengembang}$`, 'i') });

    if (await pengembangOption.count()) break;

    await listContainer.evaluate(el => {
      el.scrollTop += 300;
    });

    await this.page.waitForTimeout(200);
  }

  if (!pengembangOption || !(await pengembangOption.count())) {
    throw new Error(`Pengembang "${pengembang}" tidak ditemukan`);
  }

  // 4️⃣ KLIK PENGEMBANG
  await pengembangOption.first().click();
}

   async clickCari() {
   const dialog = this.page.getByRole('dialog');

  const cariButton = dialog.getByRole('button', { name: /^cari$/i });
  await cariButton.click();

  // ❌ JANGAN waitForLoadState
  // ✅ Tunggu dialog filter tertutup
  await dialog.waitFor({ state: 'hidden', timeout: 30000 });

  // Tunggu listing muncul / update
 
  }

  async selecttipe() {
  const dialog = this.page.getByRole('dialog');

   // 1️⃣ Ambil SEMUA combobox di dialog
  const comboboxes = dialog.locator('button[role="combobox"]');

  // pastikan combobox muncul
  await comboboxes.first().waitFor({ state: 'visible', timeout: 30000 });

  // 2️⃣ KLIK COMBOBOX PERTAMA = KATEGORI
  const tipeDropdown = comboboxes.nth(3);

  await tipeDropdown.scrollIntoViewIfNeeded();
  await tipeDropdown.click({ force: true });

  // 3️⃣ Tunggu list option muncul
  const rumahOption = this.page
    .locator('[role="option"]')
    .filter({ hasText: /^Rumah$/ })
    .first();

  await rumahOption.waitFor({ state: 'visible', timeout: 10000 });
  await rumahOption.click();
}

async isSekitarSayaChecked(): Promise<boolean> {
  const checkbox = this.page.locator('#nearMe');
  await checkbox.waitFor({ state: 'visible', timeout: 15000 });

  const checked = await checkbox.getAttribute('aria-checked');
  return checked === 'true';
}
 
  async setSekitarSaya(value: boolean) {
  const checkbox = this.page.locator('#nearMe');
  await checkbox.waitFor({ state: 'visible', timeout: 30000 });

  const currentState = await checkbox.getAttribute('aria-checked');

  if ((currentState === 'true') !== value) {
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click({ force: true });
  }
}

 async verifyFilteredListing() {
    await expect(this.page).toHaveURL('https://brighton-site.brighton.co.id/perumahan-baru?SortField=distance');
      await this.page.waitForTimeout(15000);
  }
  async verifyFilteredkota() {
    await this.page.waitForURL(
  url =>
    url.pathname.includes('/perumahan-baru') &&
    url.searchParams.get('LocationID') === '35',
  { timeout: 15000 }
);

  }

  async verifyFilteredpengembang() {
    await expect(this.page).toHaveURL('https://brighton-site.brighton.co.id/perumahan-baru?DeveloperID=732&SortField=distance');
      await this.page.waitForTimeout(30000);
  }
   async verifyFilteredtipe() {
    await expect(this.page).toHaveURL('https://brighton-site.brighton.co.id/perumahan-baru?Type=Rumah&SortField=distance');
      await this.page.waitForTimeout(15000);
  }
  async verifyFilteredsekitarsaya() {

     await this.page.waitForURL(
  url =>
    url.pathname.includes('/perumahan-baru') &&
    url.searchParams.get('Latitude') === '-7.2575' &&
    url.searchParams.get('Longitude') === '112.7521',
  { timeout: 15000 }
);
    
  }
 async verifyFilteredproyekbaru() {
    await expect(this.page).toHaveURL('https://brighton-site.brighton.co.id/perumahan-baru?Type=Rumah&LocationID=35&DeveloperID=732&SortField=distance');
    await this.page.waitForTimeout(15000);
  }

}