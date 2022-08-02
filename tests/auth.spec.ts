import { expect, test } from "@playwright/test";

const APP_URL = "http://localhost:3412";

test("User can login to their account with github", async ({ page }) => {
  // open app url
  await page.goto(APP_URL);

  // user click login link
  await page.click("text=Log in");

  // user go to login page
  await expect(page).toHaveURL(`${APP_URL}/login`);

  // user click on continue with github button
  await page.click("text=GitHub");

  // if login success, user will be redirected to "Lelang Terbuka" page
  await expect(page).toHaveTitle("Lelang Terbuka");
});
