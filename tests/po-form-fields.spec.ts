import {test, expect} from '@playwright/test'
import {HomePage} from '../page-objects/homePage'
import {FormFieldsPage} from '../page-objects/formFieldsPage'

test.describe('Form Layouts page', () => {
  test.beforeEach(async({page}) => {
    const homePage = new HomePage(page);
    await homePage.goToFormFieldsPage();
  })

  test('Form Fields Test', async({page}) => {
    const formFieldsPage = new FormFieldsPage(page) 
    await formFieldsPage.fillNamePassword('Michael Jordan', 'bulls23')
  })

  test('Checkbox Test', async({page}) => {
    const formFieldsPage = new FormFieldsPage(page)
    await formFieldsPage.checkUncheckAllBoxes();
  })

  test('Radiobox Test', async({page}) => {
    const formFieldsPage = new FormFieldsPage(page)
    await formFieldsPage.checSelectedRadioBox("Blue", "Yellow")
  })

  test('Dropdown Test', async({page}) => {
    const formFieldsPage = new FormFieldsPage(page)
    await formFieldsPage.checkAutomationDropdownSelection('yes')
  })

  test('Submit Form Test', async({page}) => {
    const formFieldsPage = new FormFieldsPage(page)
    await formFieldsPage.checkSubmitForm('jordan@test.com','last shot')
  })
})
