import {test } from '../test-options'

test.describe('Form Layouts page', () => {
  test.beforeEach(async({pageManager}) => {
    await pageManager.onHomePage().goToFormFieldsPage()
  })

  test('Form Fields Test', async({pageManager}) => {
    await pageManager.onFormFieldsPage().fillNamePassword('Michael Jordan', 'bulls23')
  })

  test('Checkbox Test', async({pageManager}) => {
    await pageManager.onFormFieldsPage().checkUncheckAllBoxes()
  })

  test('Radiobox Test', async({pageManager}) => {
    await pageManager.onFormFieldsPage().checSelectedRadioBox("Blue", "Yellow")
  })

  test('Dropdown Test', async({pageManager}) => {
    await pageManager.onFormFieldsPage().checkAutomationDropdownSelection('yes')
  })

  test('Submit Form Test', async({pageManager}) => {
    await pageManager.onFormFieldsPage().checkSubmitForm('jordan@test.com','last shot')
  })
})
