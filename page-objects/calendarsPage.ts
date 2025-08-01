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
    await this.page.waitForSelector('.dp-cal', { state: 'visible' });
    await this.page.waitForSelector('.dp-cal-header', { state: 'visible' });
    expect(await this.buttonToday.textContent()).toEqual(today.getDate().toString())
  }
}