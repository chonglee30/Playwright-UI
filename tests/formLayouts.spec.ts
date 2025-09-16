import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://playground.bondaracademy.com/')
  await page.getByRole('link', {name:'Forms'}).click()
  await page.getByRole('link', {name: 'Form Layouts'}).click()
})

test.describe('Forms - Form Layouts', () => {
  test('Recipient Send Test', async({page}) => {
    await page.getByRole('checkbox', {name: "Check me out"}).check({force: true})
    await page.getByRole('textbox', {name: "Recipients"}).fill('K9')
    await page.getByRole('button', {name: 'Send'}).click()
  })
})