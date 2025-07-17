import {test, expect} from '@playwright/test'
import {HomePage} from '../page-objects/homePage'
import { CalendarsPage } from '../page-objects/calendarsPage'

test.describe('Calendars page', () => {
  test.beforeEach(async({page}) => {
    const homePage = new HomePage(page)
    await homePage.goToCalendarsPage()
  })

  test('Selected Calendar Dates', async({page}) => {
    const calendarsPage = new CalendarsPage(page)
    await calendarsPage.checkSelectedCalendarDates()
  })
})