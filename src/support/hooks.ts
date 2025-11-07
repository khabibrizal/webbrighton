import { Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world';
import * as fs from 'fs';
import * as path from 'path';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000); // 60 detik


Before(async function (this: CustomWorld) {
  // Launch headless sesuai pilihanmu
  this.browser = await chromium.launch({ headless: false, slowMo: 500 });;

  // Rekam video untuk SEMUA scenario
  this.context = await this.browser.newContext({
    recordVideo: { dir: 'videos/' }
  });

  this.page = await this.context.newPage();

  // Listeners untuk logs
  this.consoleLogs = [];
  this.networkLogs = [];

  this.page.on('console', (msg) => {
    try {
      this.consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    } catch { /* ignore */ }
  });

  this.page.on('request', (req) => {
    try {
      this.networkLogs.push(`--> ${req.method()} ${req.url()}`);
    } catch { /* ignore */ }
  });

  this.page.on('response', (res) => {
    try {
      this.networkLogs.push(`<-- ${res.status()} ${res.url()}`);
    } catch { /* ignore */ }
  });
});

AfterStep(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    
    fs.mkdirSync(path.resolve('screenshots'), { recursive: true });

    const filePath = path.resolve('screenshots', `failed-${Date.now()}.png`);
    const buf = await this.page.screenshot({ path: filePath, fullPage: true });
    await this.attach(buf, 'image/png'); // muncul di Allure
  }
});

After(async function (this: CustomWorld) {
  // Attach console & network logs ke Allure
  if (this.consoleLogs.length) {
    await this.attach(this.consoleLogs.join('\n'), 'text/plain');
  }
  if (this.networkLogs.length) {
    await this.attach(this.networkLogs.join('\n'), 'text/plain');
  }

  // Attach video untuk SEMUA scenario
  try {
    const video = this.page.video();
    if (video) {
      const videoPath = await video.path();
      const data = fs.readFileSync(videoPath);
      // Playwright biasanya .webm; Allure menerima video/* 
      await this.attach(data, 'video/webm');
    }
  } catch {
    
  }

  await this.context.close();
  await this.browser.close();
});
