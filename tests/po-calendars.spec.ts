import {test } from '../test-options'

test.describe('Calendars page', () => {
  test.beforeEach(async({pageManager}) => {
    await pageManager.onHomePage().goToCalendarsPage()
  })

  test('Selected Calendar Dates', async({pageManager}) => {
    await pageManager.onCalendarPage().checkSelectedCalendarDates()
  })
})