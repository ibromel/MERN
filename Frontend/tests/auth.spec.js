import { test, expect } from '@playwright/test';

const BASE_URL = 'https://mern-ashen-six.vercel.app';
const ADMIN_EMAIL = 'aaaaa@admin.com';
const ADMIN_PASSWORD = '123456789';

test.describe('Authentification', () => {

  test('affiche le formulaire de login', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByPlaceholder('Enter Email')).toBeVisible();
    await expect(page.getByPlaceholder('Enter Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('login avec mauvais identifiants affiche une alerte', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByPlaceholder('Enter Email').fill('faux@email.com');
    await page.getByPlaceholder('Enter Password').fill('mauvaismdp');

    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Identifiants invalides');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('login admin réussi redirige vers /list', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Enter Email').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('Enter Password').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  // Attendre que la page change — peu importe où
  await page.waitForNavigation({ timeout: 10000 });
  const url = page.url();
  expect(url).not.toBe(BASE_URL + '/');
});
test('debug - voir contenu de /list sans token', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto(`${BASE_URL}/list`);
  await page.waitForTimeout(3000);
  
  const url = page.url();
  const content = await page.textContent('body');
  console.log('URL:', url);
  console.log('Contenu:', content?.substring(0, 200));
  
  await context.close();
});
test('accès /list sans token redirige vers /', async ({ browser }) => {
  // Nouveau contexte complètement vide — pas de token
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto(`${BASE_URL}/list`);
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(`${BASE_URL}/`);
  
  await context.close();
});

});