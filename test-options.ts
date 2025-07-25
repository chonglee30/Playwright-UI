import {test as base, expect} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
  globalsQaURL: string
  formFieldsPage: string
  pageManager: PageManager
}

export const test = base.extend<TestOptions>({
  globalsQaURL: ['', {option: true}],  // default value or empty string then overwrite inside the config file

  formFieldsPage: async({page}, use) => {
    await page.goto('/');
    const currentUrl = page.url();
    expect(currentUrl).toBe('https://practice-automation.com/');
    const pageTitle = await page.title();
    expect(pageTitle).toEqual('Learn and Practice Automation | automateNow')

    await page.getByRole('link', { name: "Form Fields" }).click()
    await page.waitForURL('**/form-fields/')
    expect(page).toHaveTitle('Form Fields | Practice Automation');

    const header = await page.locator('h1').filter({hasText: "Form Fields"}).textContent()
    expect(header).toEqual('Form Fields')
    await use('')
  }, 

  pageManager: async({page}, use) => {
    const pm = new PageManager(page)
    await use(pm)
  }
})