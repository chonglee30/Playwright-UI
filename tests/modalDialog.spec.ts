import { test, expect } from '@playwright/test';

test.describe('Modal & Overlays page - Dialog', () => {
  
  test('Should Navigate to Modal - Dialog', async ({page}) => {
    await page.goto('https://playground.bondaracademy.com/')
    const headerTitle = await page.locator('ngx-header a span').textContent()
    expect(headerTitle).toEqual('Playground')

    await page.getByTitle('Modal & Overlays').click()
    await page.getByTitle('Dialog').click()

    await expect(page.locator('nb-card nb-card-header', {hasText: "Random dialog"})).toBeVisible()

    page.addLocatorHandler(page.getByText('Friendly reminder'), async () => {
      await page.getByRole('button', {name: 'OK'}).click()
    })

    await page.getByRole('button', {name: 'Enter Name'}).click()
    await expect(page.locator('ngx-dialog-name-prompt nb-card nb-card-header', {hasText: "Enter your name"})).toBeVisible();
    
    await page.locator('input[placeholder="Name"]').fill('Test')
    await page.getByRole('button', {name: 'Submit'}).click()
    // Note:
    // Run 5 times with Chrome Browser:
    // Command: npx playwright test modalDialog.spec.ts --project=chromium --repeat-each 5
  })  
});
