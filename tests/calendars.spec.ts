import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
  await page.goto('/');

  // Check URL 
  const currentUrl = page.url();
  expect(currentUrl).toBe('https://practice-automation.com/');
  
  // Check Page Title:
  const pageTitle = await page.title();
  expect(pageTitle).toEqual('Learn and Practice Automation | automateNow')
})

test.describe('Calendars page', () => {
  test.beforeEach(async({page}) => {
    await page.getByRole('link', { name: 'Calendars' }).click()
    await page.waitForURL('**/calendars/')
    expect(page).toHaveTitle('Calendars | Practice Automation');

    const header = await page.locator('h1[itemprop="headline"]').textContent()
    expect(header).toEqual("Calendars")
  });

  test('Selected Calendar Dates', async({page}) => {
    const today = new Date();
    const searchCalendar = page.locator('input[type="text"]').first()
    await searchCalendar.click()
    expect(await page.locator('div.dp-days button.dp-day-today').textContent()).toEqual(today.getDate().toString())
  })
});