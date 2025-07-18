import { Locator, Page, expect } from "@playwright/test";
import { PageBase } from "./pageBase"

export class HomePage extends PageBase{
  constructor(page: Page) {
    super(page)
  }

  async goToFormFieldsPage() {
   await this.goToHomePage(); 
   await this.goToSelectedPage("form-fields", "Form Fields") 
  }

  async goToSlidersPage() {
    await this.goToHomePage(); 
    await this.goToSelectedPage("slider", "Slider") 
  }

  async goToCalendarsPage() {
    await this.goToHomePage(); 
    await this.goToSelectedPage("calendars", "Calendars") 
  }

  async goToTablesPage() {
    await this.goToHomePage(); 
    await this.goToSelectedPage("tables", "Tables") 
  }

  private async goToHomePage() {
    await this.page.goto('/');
    // Check URL 
    const currentUrl = this.page.url();
    expect(currentUrl).toBe('https://practice-automation.com/');
    // Check Page Title:
    const pageTitle = await this.page.title();
    expect(pageTitle).toEqual('Learn and Practice Automation | automateNow')
  }

  // pageUrl: form-fields
  // pageTitle: Form Fields
  private async goToSelectedPage(pageUrl: string, pageTitle: string) {
    await this.page.getByRole('link', { name: `${pageTitle}` }).click()
    await this.page.waitForURL(`**/${pageUrl}/`)
    expect(this.page).toHaveTitle(`${pageTitle} | Practice Automation`);

    const header = await this.page.locator('h1').filter({hasText: `${pageTitle}`}).textContent()
    expect(header).toEqual(`${pageTitle}`)
  }

}
