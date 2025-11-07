import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { DetailProductPage } from '../pages/detailproduct.page';



let loginPage: LoginPage;
let productPage: ProductPage;
let detailProductPage: DetailProductPage;

Given('I am on the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('I enter valid username and password', async function () {
  await loginPage.login('standard_user', 'secret_sauce');
});

When('I click the login button', async function () {
  // Tombol login sudah diklik di method login()
});

Then('I should see the dashboard page', async function () {
  productPage = new ProductPage(this.page);
  const title = await productPage.getPageTitle();
  expect(title).toContain('Products');
});

When('I click one of them product {string}', async function (productName: string) {
  productPage = new ProductPage(this.page);
  await productPage.clickProduct(productName);
});

Then('I should see the detail product page', async function () {
  detailProductPage = new DetailProductPage(this.page);
  const productTitle = await detailProductPage.getProductTitle();
  expect(productTitle).not.toBeNull();
});

When('I click the add to cart button', async function () {
  await detailProductPage.clickAddToCart();
});

Then('I should see add to cart button change to remove button', async function () {
  const removeBtn = await detailProductPage.getRemoveButtonText();
  expect(removeBtn?.toLowerCase()).toContain('remove');
});
