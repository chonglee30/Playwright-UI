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


test.describe('Tables page', () => {
  test.beforeEach(async({page}) => {
    await page.getByRole('link', { name: 'Tables' }).click()
    await page.waitForURL('**/tables/')
    expect(page).toHaveTitle('Tables | Practice Automation');

    const header = await page.locator('h1[itemprop="headline"]').textContent()
    expect(header).toEqual("Tables")
  });

  test('Sortable Table Search Test', async({page}) => {
    const sortTable = await page.locator('#sortable-table-countries-by-population').textContent()
    expect(sortTable).toEqual('Sortable Table')

    const searchBox = page.getByLabel('Search:')
    await searchBox.clear()
    await searchBox.fill('Italy')
    await expect(searchBox).toHaveValue('Italy')

    const searchRow = page.locator('table[id="tablepress-1"] tbody tr')
    let searchRowNumber = await searchRow.count()
    expect(searchRowNumber).toEqual(1)
    expect(await searchRow.locator('td').nth(1).innerText()).toEqual('Italy')
  
    await searchBox.clear()
    searchRowNumber = await searchRow.count()
    expect(searchRowNumber).toBeGreaterThan(1)
  });

  test('Sortable Table Sorting Test', async({page}) => {
    const pageStatus = page.locator('div[class="dt-info"][role="status"]')
    expect(await pageStatus.textContent()).toEqual('Showing 1 to 10 of 25 entries')

    const entriesPage = page.locator('select[class="dt-input"]')
    await entriesPage.click();
  
    await entriesPage.selectOption('25')
    await expect(entriesPage).toHaveValue('25')
    expect(await pageStatus.textContent()).toEqual('Showing 1 to 25 of 25 entries')

    const searchRow = page.locator('table[id="tablepress-1"] tbody tr')
    let searchRowNumber = await searchRow.count()
    expect(searchRowNumber).toEqual(25)

    const rankHeader = page.locator('table[id="tablepress-1"] thead tr th').nth(0)
    await rankHeader.click()
    await expect(rankHeader).toHaveAttribute('aria-sort','ascending')
    await rankHeader.click()
    await expect(rankHeader).toHaveAttribute('aria-sort','descending')
    await expect(page.locator('table[id="tablepress-1"] tbody tr td').nth(0)).toHaveText('25')
  });
});
