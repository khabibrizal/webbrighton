import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  private titleHeader = '.title';

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle(): Promise<string> {
    return (await this.page.textContent(this.titleHeader)) ?? '';
  }

  async clickProduct(productName: string) {
    await this.page.locator(`.inventory_item_name`, { hasText: productName }).click();
  }
}
