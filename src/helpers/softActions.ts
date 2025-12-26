import type { Page } from "@playwright/test";
import type { CustomWorld } from "../support/world";

export async function softClick(
  world: CustomWorld,
  page: Page,
  selector: string,
  stepName: string
) {

  const el = page.locator(selector);
  const count = await el.count();

  if (count === 0) {
    world.softErrors.push(`Element not found: ${selector}`);
    console.warn(`[SOFT] Element not found: ${selector}`);
    return;  // ✅ lanjutkan step berikutnya (TIDAK THROW)
  }

  try {
    await el.first().click({ timeout: 1500 });
  } catch (err) {
    world.softErrors.push(`Click failed: ${selector}`);
    console.warn(`[SOFT] Click failed: ${selector}`);
  }
}

