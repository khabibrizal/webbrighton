import { Page } from '@playwright/test';

export class DetailProductPage {
  readonly page: Page;
  private productTitle = '.inventory_details_name';
  private addToCartBtn = '.btn_primary.btn_small.btn_inventory';
  private removeBtn = '.btn_secondary.btn_small.btn_inventory';

  constructor(page: Page) {
    this.page = page;
  }

  async getProductTitle(): Promise<string> {
    return (await this.page.textContent(this.productTitle)) ?? '';
  }

  async clickAddToCart() {
    await this.page.click(this.addToCartBtn);
  }

  async getRemoveButtonText(): Promise<string> {
    return (await this.page.textContent(this.removeBtn)) ?? '';
  }
}
