import { test, expect } from '@playwright/test';

// Allow both mobile web and desktop web to be tested
test.beforeEach(async({page}, testInfo) => {
  await page.goto('https://playground.bondaracademy.com',{ waitUntil: 'domcontentloaded' })
  
  if (testInfo.project.name === 'mobileWeb') {
    await page.locator('.sidebar-toggle').waitFor({ state: 'attached' });
    await page.locator('.sidebar-toggle').click()
  }
  await page.getByRole('link', {name:'Forms'}).click()
  await page.getByRole('link', {name: 'Form Layouts'}).click()
  if (testInfo.project.name === 'mobileWeb') {
    await page.locator('.sidebar-toggle').click()
  }
})

test.describe('Forms - Form Layouts', () => {
  test('Recipient Send Test', async({page}) => {
    await page.getByRole('checkbox', {name: "Check me out"}).check({force: true})
    await page.getByRole('textbox', {name: "Recipients"}).fill('K9')
    await page.getByRole('button', {name: 'Send'}).click()
  })
})