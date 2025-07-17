import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.describe('Form Layouts page', () => {
  test.beforeEach(async({page}) => {
    const pm = new PageManager(page)
    await pm.onHomePage().goToFormFieldsPage()
  })

  test('Form Fields Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onFormFieldsPage().fillNamePassword('Michael Jordan', 'bulls23')
  })

  test('Checkbox Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onFormFieldsPage().checkUncheckAllBoxes()
  })

  test('Radiobox Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onFormFieldsPage().checSelectedRadioBox("Blue", "Yellow")
  })

  test('Dropdown Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onFormFieldsPage().checkAutomationDropdownSelection('yes')
  })

  test('Submit Form Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onFormFieldsPage().checkSubmitForm('jordan@test.com','last shot')
  })
})
