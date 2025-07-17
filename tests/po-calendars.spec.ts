import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.describe('Calendars page', () => {
  test.beforeEach(async({page}) => {
    const pm = new PageManager(page)
    await pm.onHomePage().goToCalendarsPage()
  })

  test('Selected Calendar Dates', async({page}) => {
    const pm = new PageManager(page)
    await pm.onCalendarPage().checkSelectedCalendarDates()
  })
})