import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/')
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()
})

test.describe('Date Picker', () => {
  test('Select Right Dates', async ({ page }) => {
    const calendarDateField = page.getByPlaceholder('Form Picker')
    await calendarDateField.click()

    let date = new Date()
    date.setDate(date.getDate() + 250)

    const expectedShortMonth = date.toLocaleString('En-US', { month: 'short' })
    const expectedLongMonth = date.toLocaleString('En-US', { month: 'long' })
    const expectedDate = date.getDate().toString();
    const expectedYear = date.getFullYear()

    const shortMonthDateToAssert = `${expectedShortMonth} ${expectedDate}, ${expectedYear}`
    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedLongMonth} ${expectedYear}`
    while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
      await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calendarDateField).toHaveValue(shortMonthDateToAssert)
  });

  test('Assert Right Calendar Dates After Today', async ({ page }) => {
    const calendarDateField = page.getByPlaceholder('Form Picker')
    await calendarDateField.click()

    const expectedCalDate = await selectDateCalendar(page, 250);
    await expect(calendarDateField).toHaveValue(expectedCalDate)
  });

  test('Assert Calendar Dates Before Today', async ({ page }) => {
    const calendarDateField = page.getByPlaceholder('Form Picker')
    await calendarDateField.click()

    const expectedCalDate = await selectDateCalendar(page, -550);
    await expect(calendarDateField).toHaveValue(expectedCalDate)
  });

})

async function selectDateCalendar(page: Page, numDaysFromToday: number): Promise<string> {
  let date = new Date()
  const todayDate = date.toISOString().split('T')[0];
  date.setDate(date.getDate() + numDaysFromToday)

  const expectedShortMonth = date.toLocaleString('En-US', { month: 'short' })
  const expectedLongMonth = date.toLocaleString('En-US', { month: 'long' })
  const expectedDate = date.getDate().toString()
  const expectedYear = date.getFullYear();

  const expectedCalDate = `${expectedShortMonth} ${expectedDate}, ${expectedYear}`
  const expectedMonthYear = ` ${expectedLongMonth} ${expectedYear} `
  let currentMonthYear = await page.locator('nb-calendar-view-mode').textContent()

  const targetDate = new Date(expectedCalDate).toISOString().split('T')[0];

  while (!currentMonthYear?.includes(expectedMonthYear)) {
    const direction = targetDate > todayDate ? 'next' : 'prev';
    const selector = direction === 'next' ? 'chevron-right' : 'chevron-left';
    await page.locator(`nb-calendar-pageable-navigation [data-name="${selector}"]`).click();
    currentMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    console.log('Current: ' + currentMonthYear)
  }
  await page.locator('nb-calendar-day-cell:not(.bounding-month)').getByText(expectedDate, { exact: true }).click()
  return expectedCalDate;
}
