import {expect} from '@playwright/test'
import {test} from '../test-options'

test('Drag and Drop with iFrame', async({page, globalsQaURL}) => {
  await page.goto(globalsQaURL)
  const currentUrl = page.url();
  expect(currentUrl).toBe(globalsQaURL)
  const pageTitle = await page.title();
  expect(pageTitle).toEqual('Drag And Drop - GlobalSQA')
  expect(await page.locator('.page_heading').textContent()).toEqual('Drag And Drop') 

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')  // key to the iframe
  await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

  // 2nd example: more control
  // controlling mouse to drag & drop 
  // more precise control
  await frame.locator('li', {hasText: "High Tatras 4"}).hover()
  await page.mouse.down()
  await frame.locator('#trash').hover()
  await page.mouse.up()  // release the mouse

  // Assertion: both are in the trash
  await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})