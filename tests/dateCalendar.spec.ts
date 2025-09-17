import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://playground.bondaracademy.com/')
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()
})

test.describe('Date Picker', () => {
  test('Select Right Dates', async ({page}) => {
    const calendarDateField = page.getByPlaceholder('Form Picker')
    await calendarDateField.click()

    let date = new Date()
    date.setDate(date.getDate()+200)

    const expectedShortMonth = date.toLocaleString('En-US', {month: 'short'})
    const expectedLongMonth = date.toLocaleString('En-US', {month: 'long'})    
    const expectedDate = date.getDate().toString();
    const expectedYear = date.getFullYear()
   
    const shortMonthDateToAssert =`${expectedShortMonth} ${expectedDate}, ${expectedYear}`
    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedLongMonth} ${expectedYear}`
    while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
      await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarDateField).toHaveValue(shortMonthDateToAssert)

  })
})
