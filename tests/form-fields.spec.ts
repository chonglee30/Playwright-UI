import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
  await page.goto('/');

  // Check URL 
  const currentUrl = page.url();
  expect(currentUrl).toBe('https://practice-automation.com/');
  
  // Check Page Title:
  const pageTitle = await page.title();
  expect(pageTitle).toEqual('Learn and Practice Automation | automateNow')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async({page}) => {
      await page.getByRole('link', { name: 'Form Fields' }).click()
      await page.waitForURL('**/form-fields/')
      expect(page).toHaveTitle('Form Fields | Practice Automation');

      const header = await page.locator('h1').filter({hasText: "Form Fields"}).textContent()
      expect(header).toEqual("Form Fields")
    });

    test('Form Fields Test', async({page}) => {
      // Input Fields
      const nameInput = page.getByLabel('Name').first()
      await nameInput.clear()
      await nameInput.fill('Michael Jordan')

      const nameInputValue = await nameInput.inputValue()
      expect(nameInputValue).toEqual('Michael Jordan')

      const passwordInput = page.getByLabel('Password')
      await passwordInput.clear()
      await passwordInput.fill('bulls23')
    })

  test('Checkbox Test', async({page}) => {
    const allBoxes = page.getByRole('checkbox')

    for (const box of await allBoxes.all()) {
      await box.check({force: true})
      expect(await box.isChecked()).toBeTruthy()
    }

    for(const box of await allBoxes.all()) {
      await box.uncheck({force: true})
      expect(await box.isChecked()).toBeFalsy()
    }
  })

  test('Radiobox Test', async({page}) => {
    await page.getByRole('radio', {name: "Blue"}).check({force: true})
    await expect(page.getByRole('radio', {name: "Blue"})).toBeChecked()
    expect (await page.getByRole('radio',{name: "Yello"}).isChecked()).toBeFalsy();
  })

  test('Dropdown Test', async({page}) => {
    await page.locator('#automation').click()
    const optionList = page.locator('select option')
    await expect(optionList).toHaveText(["","Yes","No","Undecided"])
    const automationDropdownList = page.locator('#automation')
    await automationDropdownList.selectOption('yes')
    await expect(automationDropdownList).toHaveValue('yes')
  })

  test('Submit Form Test', async({page}) => {
    const emailTextBox = page.locator('#email')
    await emailTextBox.scrollIntoViewIfNeeded()
    
    await emailTextBox.fill('jordan@test.com')
    await expect(emailTextBox).toHaveValue('jordan@test.com')

    const messageTextBox = page.locator('#message')
    await messageTextBox.fill('last shot')
    await expect(messageTextBox).toHaveValue('last shot')
    await page.getByRole('button', {name: "Submit"}).click()
  })
})