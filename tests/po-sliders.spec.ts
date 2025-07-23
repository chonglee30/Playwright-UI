import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.describe('Sliders page', () => {
  test.describe.configure({ retries: 3 });
  test.beforeEach(async({page}) => {
    const pm = new PageManager(page)
    await pm.onHomePage().goToSlidersPage()
  })

  test('Sliders Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onSlidersPage().checkSliderHorizontalDirection(500, '25', '40')
  })
})