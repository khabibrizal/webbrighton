import { setWorldConstructor } from '@cucumber/cucumber';
import type { Page, BrowserContext, Browser } from "@playwright/test";

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}

setWorldConstructor(CustomWorld);