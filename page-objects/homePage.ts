import { Locator, Page, expect } from "@playwright/test";
import { PageBase } from "./pageBase"

export class HomePage extends PageBase{
  constructor(page: Page) {
    super(page)
  }

  async goToFormFieldsPage() {
   await this.goToSelectedPage("form-fields", "Form Fields") 
  }

  async goToSlidersPage() {
    await this.goToSelectedPage("slider", "Slider") 
  }

  async goToCalendarsPage() {
    await this.goToSelectedPage("calendars", "Calendars") 
  }

  async goToTablesPage() {
    await this.goToSelectedPage("tables", "Tables") 
  }

  //private
  async goToHomePage() {
    await this.page.goto('/');
  }

  // pageUrl: form-fields
  // pageTitle: Form Fields
  private async goToSelectedPage(pageUrl: string, pageTitle: string) {
    await this.page.getByRole('link', { name: `${pageTitle}` }).click()
    await this.page.waitForURL(`**/${pageUrl}/`)
    // // Waits for the 'load' event, which means the entire page, including all resources (images, stylesheets, etc.), has finished loading.
    await this.page.waitForLoadState('domcontentloaded');
    expect(this.page).toHaveTitle(`${pageTitle} | Practice Automation`);
    const header = await this.page.locator('h1').filter({hasText: `${pageTitle}`}).textContent()
    expect(header).toEqual(`${pageTitle}`)
  }

}
