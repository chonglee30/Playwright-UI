import { Page, expect } from "@playwright/test";
import { CalendarsPage } from '../page-objects/calendarsPage'
import { FormFieldsPage } from '../page-objects/formFieldsPage'
import { HomePage } from '../page-objects/homePage'
import { SlidersPage } from '../page-objects/slidersPage'
import { TablesPage } from '../page-objects/tablesPage'

export class PageManager {
  private readonly page:Page 
  private readonly calendarsPage: CalendarsPage
  private readonly formFieldsPage: FormFieldsPage
  private readonly homePage: HomePage 
  private readonly slidersPage: SlidersPage
  private readonly tablesPage: TablesPage
   
  constructor(page: Page) {
    this.page = page 
    this.calendarsPage = new CalendarsPage(this.page)
    this.formFieldsPage = new FormFieldsPage(this.page)
    this.homePage = new HomePage(this.page)
    this.slidersPage = new SlidersPage(this.page)
    this.tablesPage = new TablesPage(this.page)
  }

  onCalendarPage() {
    return this.calendarsPage
  }

  onFormFieldsPage() {
    return this.formFieldsPage
  }

  onHomePage() {
    return this.homePage
  }

  onSlidersPage() {
    return this.slidersPage
  }

  onTablesPage() {
    return this.tablesPage
  }
}