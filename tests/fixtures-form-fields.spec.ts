import {test } from '../test-options'
import { PageManager } from '../page-objects/pageManager'

test.describe('Form Layouts page', () => {
  // test.beforeEach(async({page}) => {
  //   const pm = new PageManager(page)
  //   await pm.onHomePage().goToFormFieldsPage()
  // })

  test('Form Fields Test', async({pageManager}) => {
    await pageManager.onHomePage().goToFormFieldsPage()
    await pageManager.onFormFieldsPage().fillNamePassword('Michael Jordan', 'bulls23')
  })
})