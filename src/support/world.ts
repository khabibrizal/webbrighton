import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { Page, BrowserContext, Browser } from "@playwright/test";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
   constructor(options: IWorldOptions) {
    super(options);
  }
}

//setWorldConstructor(CustomWorld);