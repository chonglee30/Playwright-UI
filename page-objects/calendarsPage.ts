import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./pageBase"

export class CalendarsPage extends PageBase {
  readonly buttonToday: Locator
  readonly searchCalendar: Locator
  
  constructor(page:Page) {
    super(page)
    this.searchCalendar = page.locator('input[type="text"]').first()
    this.buttonToday = page.locator('div.dp-days button.dp-day-today')
  }

  async checkSelectedCalendarDates() {
    const today = new Date();
    await this.searchCalendar.click()

    await Promise.all([
      await this.page.waitForLoadState('domcontentloaded'),
      await this.page.waitForLoadState('load')
    ]);

    const monthName = today.toLocaleString('default', { month: 'long' });
    //await expect(this.page.locator(`text=/.*${monthName}.*/`)).toBeVisible();
    await expect(this.page.getByText(monthName)).toBeVisible();

    //await expect(this.page.locator('.dp-cal-header')).toBeVisible();
    expect(await this.buttonToday.textContent()).toEqual(today.getDate().toString())
  }
}