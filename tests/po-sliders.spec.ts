import {test, expect} from '@playwright/test'
import {HomePage} from '../page-objects/homePage'
import { SlidersPage } from '../page-objects/slidersPage'

test.describe('Sliders page', () => {
  test.beforeEach(async({page}) => {
    const homePage = new HomePage(page)
    await homePage.goToSlidersPage()
  })

  test('Sliders Test', async({page}) => {
    const slidersPage = new SlidersPage(page)
    await slidersPage.checkSliderHorizontalDirection(500, '25', '40')
  })
})