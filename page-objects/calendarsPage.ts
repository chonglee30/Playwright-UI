import { expect, Locator, Page } from "@playwright/test";

export class CalendarsPage {
  private readonly page: Page
  readonly buttonToday: Locator
  readonly searchCalendar: Locator
  
  constructor(page:Page) {
    this.page = page 
    this.searchCalendar = page.locator('input[type="text"]').first()
    this.buttonToday = page.locator('div.dp-days button.dp-day-today')
  }

  async checkSelectedCalendarDates() {
    const today = new Date();
    await this.searchCalendar.click()
    expect(await this.buttonToday.textContent()).toEqual(today.getDate().toString())
  }
}