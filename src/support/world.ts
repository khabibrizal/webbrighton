import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';
import { LoginPage } from '@pages/login.page';
import { ProductPage } from '@pages/product.page';
import { DetailProductPage } from '@pages/detailproduct.page';


export class CustomWorld extends World {
  // Playwright
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page Objects
  loginPage!: LoginPage;
  productPage!: ProductPage;
  detailProductPage!: DetailProductPage;

  // Debug artifacts
  consoleLogs: string[] = [];
  networkLogs: string[] = [];

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
