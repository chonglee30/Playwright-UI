import {test } from '../test-options'

test.describe('Sliders page', () => {
  test.describe.configure({ retries: 3 });
  test.beforeEach(async({pageManager}) => {
    await pageManager.onHomePage().goToSlidersPage()
  })

  test('Sliders Test', async({pageManager}) => {
    await pageManager.onSlidersPage().checkSliderHorizontalDirection(500, '25', '40')
  })
})