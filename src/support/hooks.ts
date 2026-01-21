import { Before, After,setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';
import fs from 'fs';

setDefaultTimeout(60 * 15000); 

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
    recordVideo: {
      dir: 'videos',
      size: { width: 1280, height: 720 }
    },
    geolocation: {
      latitude: -7.2575,   // contoh: Surabaya
      longitude: 112.7521
    },
    permissions: ['geolocation'] // ⬅️ INI KUNCI
  });

  this.page = await this.context.newPage();
});

After(async function (scenario) {
  // Screenshot jika FAILED
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  // 👉 SATU deklarasi SAJA
  let videoPath: string | null = null;

  const video = this.page.video();
  if (video) {
    videoPath = await video.path();
  }

  // Tutup context & browser
  await this.context.close();
  await this.browser.close();

  // Attach video ke Allure
  if (videoPath && fs.existsSync(videoPath)) {
    const videoBuffer = fs.readFileSync(videoPath);
    await this.attach(videoBuffer, 'video/webm');
  }
});

