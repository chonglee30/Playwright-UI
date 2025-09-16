import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://playground.bondaracademy.com/')
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()
})

test.describe('Web Tables page', () => {
  test('Modify age of a user based on email selection', async ({page}) => {
    const selectedRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await selectedRow.locator('.nb-edit').click()
   
    const ageColumn = selectedRow.getByRole('textbox', {name: "Age"}) 
    await expect(ageColumn).toHaveValue('18')
    await ageColumn.clear()
    await ageColumn.fill('55')
    await selectedRow.locator('.nb-checkmark').click()
    const modifiedAge= await selectedRow.getByRole('cell').nth(6).textContent()
    expect(modifiedAge).toEqual('55')
  })

  test('Modify email of a user based on ID selection', async ({page}) => {
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()  // 2nd pagination selection  
    const selectedRowById = page.getByRole('row', {name: "11"}).filter({has:page.getByRole('cell').nth(1).getByText('11')})
    await selectedRowById.locator('.nb-edit').click()
        
    const emailColumn = page.locator('input-editor').getByPlaceholder('E-mail')
    await emailColumn.clear()
    await emailColumn.fill('markTest@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(selectedRowById.getByRole('cell').nth(5)).toHaveText('markTest@test.com')
  })

  test('Correct Age Table Filter', async ({page}) => {
    const ages = ["20", "30","40","200"]
    for (let age of ages) {
      await page.locator('input-filter').getByPlaceholder('Age').clear()
      await page.locator('input-filter').getByPlaceholder('Age').fill(age)
      const ageRows = page.locator('tbody tr')
    
      if (age !=="200") {
        await expect(page.locator('table tbody tr:nth-child(1) td:nth-child(7)')).toHaveText(`${age}`);
      }

    for (let row of await ageRows.all()) {
      if (age =="200") {
          await expect(page.locator('table tbody tr:nth-child(1) td:nth-child(1)')).toHaveText('No data found')
        } else {
        await expect(row.getByRole('cell').last()).toHaveText(age)
      }
    }
   }
  })
})