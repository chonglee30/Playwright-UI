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

test.describe('Sliders page', () => {
  test.beforeEach(async({page}) => {
    await page.getByRole('link', { name: 'Sliders' }).click()
    await page.waitForURL('**/slider/')
    expect(page).toHaveTitle('Slider | Practice Automation');

    const header = await page.locator('h1[itemprop="headline"]').textContent()
    expect(header).toEqual("Slider")
  });

  test('Sliders Test', async({page}) => {
    const sliderBox = page.locator('#slideMe')
    await sliderBox.scrollIntoViewIfNeeded()

    let sliderValue = page.locator('#value')
    expect(await sliderValue.textContent()).toEqual('25')

    const box = await sliderBox.boundingBox()
    const x = box!.x
    const y = box!.y
    const height = box!.height
    const width = box!.width
    
    await page.mouse.move(x,y) 
    await page.mouse.down()
    await page.mouse.move(x+500,0)
    await page.mouse.up()

    expect(await sliderValue.textContent()).toEqual('40')
    expect(await sliderValue.textContent()).not.toEqual('25')
  });
});