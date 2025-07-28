import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./pageBase"

export class FormFieldsPage extends PageBase{
  // Form Fields:
  readonly nameInput: Locator 
  readonly passwordInput: Locator
   // Checkbox
  readonly allBoxes: Locator
  // RadioBox
  readonly blueRadioBox: Locator
  readonly yellowRadioBox: Locator
  // Dropdown
  readonly automationDropdown: Locator
  readonly allOptions: Locator
  // Submit Form 
  readonly emailTextBox: Locator
  readonly messageTextBox: Locator
  readonly submitButton: Locator

  constructor(page:Page) {
    super(page)
    // Form Fields:
    this.nameInput = page.getByLabel('Name').first()
    this.passwordInput = page.getByLabel('Password')
    // Checkbox:
    this.allBoxes =  page.getByRole('checkbox')
    // Dropdown:
    this.automationDropdown = page.locator('#automation')
    this.allOptions = page.locator('select option')  
    // Submit Form 
    this.emailTextBox  = page.getByLabel('Email').first()
    this.messageTextBox = page.getByRole('textbox', {name:"Message"})
    this.submitButton = page.getByRole('button', {name: "Submit"})
  }

  /**
   * 
   * @param name 
   * @param password 
   */
  async fillNamePassword(name:string, password:string) {
    await this.nameInput.clear()
    await this.nameInput.fill(name)
    expect(await this.nameInput.inputValue()).toEqual(name);

    await this.passwordInput.clear()
    await this.passwordInput.fill(password)
  }

  async checkUncheckAllBoxes() {
    for (const box of await this.allBoxes.all()) {
      await box.check({force: true})
      expect(await box.isChecked()).toBeTruthy()
    }

    for (const box of await this.allBoxes.all()) {
      await box.uncheck({force: true})
      expect(await box.isChecked()).toBeFalsy()
    }
    await this.page.getByRole('checkbox', {name:"Coffee"}).check()
  }

  /**
   * 
   * @param selectedRadioBox 
   * @param notSelectedRadioBox 
   */
  async checSelectedRadioBox(selectedRadioBox:string, notSelectedRadioBox:string) {
    await this.page.getByRole('radio', {name: `${selectedRadioBox}`}).check({force: true})
    await expect(this.page.getByRole('radio', {name: `${selectedRadioBox}`})).toBeChecked()
    expect(await this.page.getByRole('radio', {name: `${notSelectedRadioBox}`}).isChecked()).toBeFalsy()
  }
 
  /**
   * 
   * @param selectedList 
   */
  async checkAutomationDropdownSelection(selectedList:string) {
    await this.automationDropdown.click()
    await expect(this.allOptions).toHaveText(["","Yes","No","Undecided"])
    await this.automationDropdown.selectOption(selectedList)
    await expect(this.automationDropdown).toHaveValue(selectedList)
  }

  /**
   * 
   * @param email 
   * @param message 
   */
  async checkSubmitForm(email:string, message:string) {
    await this.emailTextBox.scrollIntoViewIfNeeded()  
    this.emailTextBox.fill(email)
    await expect(this.emailTextBox).toHaveValue(email)
   
    await this.messageTextBox.fill(message)
    await expect(this.messageTextBox).toHaveValue(message)
    await this.submitButton.click()
  }
}
