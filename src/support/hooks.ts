import { Before, After,setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';




setDefaultTimeout(60 * 15000); 

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });

  this.context = await this.browser.newContext(
    { geolocation: {
      latitude: -7.2575,   // contoh: Surabaya
      longitude: 112.7521
    },
    permissions: ['geolocation'] // ⬅️ INI KUNCI

    }
  );

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.context.close();
  await this.browser.close();
});
