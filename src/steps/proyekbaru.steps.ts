import { Given, When, Then } from '@cucumber/cucumber';
//import { Page } from '@playwright/test';
import { ProyekBaruPage } from '../pages/proyekbaru.page';
//import { page } from '../support/hooks';
import { CustomWorld } from '../support/world';
import { allure } from "allure-playwright";

import { Browser, Page } from '@playwright/test';
let proyekBaruPage: ProyekBaruPage;

//filter untuk kategori lokal
Given(
  'user berada di menu proyekbaru',
  async function (this: CustomWorld) {
    proyekBaruPage = new ProyekBaruPage(this.page);
    await proyekBaruPage.openProyekBaruPage();
  }
);

When('user klik button filter', async function () {
  await proyekBaruPage.openFilter();
});

When(
  'user pilih lokal di list menu kategori',
  async function (this: CustomWorld)  {
    await proyekBaruPage.selectKategoriLokal();
    
  }
);

When('user klik button cari', async function () {
  await proyekBaruPage.clickCari();
});

Then(
  'listing properti Proyek baru tampil sesuai filter',
  async function () {
    await proyekBaruPage.verifyFilteredListing();
  }
);

//filter untuk kota

Given(
  'user berada di menu proyekbarukota',
  async function (this: CustomWorld) {
    proyekBaruPage = new ProyekBaruPage(this.page);
    await proyekBaruPage.openProyekBaruPage();
  }
);

When('user klik button filterkota', async function () {
  await proyekBaruPage.openFilter();
});

When(
  'user pilih surabaya di list menu kota',
  async function (this: CustomWorld)  {
    
    await proyekBaruPage.selectKota('Bandung');
  });
  

When('user klik button carikota', async function () {
  await proyekBaruPage.clickCari();
});

Then(
  'listing properti Proyek baru tampil sesuai filter kota',
  async function () {
    await proyekBaruPage.verifyFilteredkota();
  });

//filter untuk pengembang

Given(
  'user berada di menu proyekbarupengembang',
  async function (this: CustomWorld) {
    proyekBaruPage = new ProyekBaruPage(this.page);
    await proyekBaruPage.openProyekBaruPage();
  }
);

When('user klik button filterpengembang', async function () {
  await proyekBaruPage.openFilter();
});

When(
  'user pilih sinarmas land di list menu pengembang',
  async function (this: CustomWorld)  {

    await proyekBaruPage.selectpengembang('SINARMAS LAND');
  });
  

When('user klik button caripengembang', async function () {
  await proyekBaruPage.clickCari();
});

Then(
  'listing properti Proyek baru tampil sesuai filter pengembang',
  async function () {
    await proyekBaruPage.verifyFilteredpengembang();
  }
);

//filter untuk tipe 

Given(
  'user berada di menu proyekbarutipe',
  async function (this: CustomWorld) {
    proyekBaruPage = new ProyekBaruPage(this.page);
    await proyekBaruPage.openProyekBaruPage();
  }
);

When('user klik button filtertipe', async function () {
  await proyekBaruPage.openFilter();
});

When(
  'user pilih Rumah di list menu tipe',
  async function (this: CustomWorld)  {

    await proyekBaruPage.selecttipe ();
  });
  


When('user klik button caritipe', async function () {
  await proyekBaruPage.clickCari();
});

Then(
  'listing properti Proyek baru tampil sesuai filter tipe',
  async function () {
    await proyekBaruPage.verifyFilteredtipe();
  }
);

//filter untuk sekitarsaya 

Given(
  'user berada di menu proyekbarusekitarsaya',
  async function (this: CustomWorld) {
    proyekBaruPage = new ProyekBaruPage(this.page);
    await proyekBaruPage.openProyekBaruPage();
  }
);

When('user klik button filtersekitarsaya', async function () {
  await proyekBaruPage.openFilter();
});

When(
  'user checklist',
  async function (this: CustomWorld)  {

    await proyekBaruPage.setSekitarSaya(true);
  });
  


When('user klik button carisekitarsaya', async function () {
  await proyekBaruPage.clickCari();
});

Then(
  'listing properti Proyek baru tampil sesuai filter sekitarsaya',
  async function () {
    await proyekBaruPage.verifyFilteredsekitarsaya();
  }
);

 //filter untuk semua kombinasi

Given(
  'user berada di menu proyekbarupage',
  async function (this: CustomWorld) {
    proyekBaruPage = new ProyekBaruPage(this.page);
    await proyekBaruPage.openProyekBaruPage();
  }
);

When('user klik button filter proyekbaru', async function () {
  await proyekBaruPage.openFilter();
});

When(
  'user pilih kategori',
  async function (this: CustomWorld)  {
    await proyekBaruPage.selectKategoriLokal();
    
  }
);


 When(
  'pilih tipe',
  async function (this: CustomWorld)  {

    await proyekBaruPage.selecttipe();
  });

When(
  'pilih pengembang',
  async function (this: CustomWorld)  {

    await proyekBaruPage.selectpengembang('SINARMAS LAND');
  });

  When(
  'pilih kota',
  async function (this: CustomWorld)  {

    await proyekBaruPage.selectKota('Bandung');
  });

  When('user klik button cariproyekbaru', async function () {
    await proyekBaruPage.clickCari();
  });

Then(
  'listing properti Proyek baru tampil sesuai filter proyekbaru',
  async function () {
    await proyekBaruPage.verifyFilteredproyekbaru();
  }
);



