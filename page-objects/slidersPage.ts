import { expect, Locator, Page } from "@playwright/test";

export class SlidersPage {
  private readonly page:Page 
  readonly sliderBox:Locator
  readonly sliderValue:Locator

  constructor(page:Page) {
    this.page = page
    this.sliderBox = page.locator('#slideMe')
    this.sliderValue =  page.locator('#value')
  }

  /**
   * 
   * @param offsetValue 
   * @param defaultValue 
   * @param movedValue 
   */
  async checkSliderHorizontalDirection(offsetValue:number, defaultValue:string, movedValue:string) {
    await this.sliderBox.scrollIntoViewIfNeeded()
    expect(await this.sliderValue.textContent()).toEqual(defaultValue)

    const box = await this.sliderBox.boundingBox()
    const x = box!.x
    const y = box!.y
    const height = box!.height
    const width = box!.width

    await this.page.mouse.move(x,y) 
    await this.page.mouse.down()
    await this.page.mouse.move(x+offsetValue,0)
    await this.page.mouse.up()

    expect(await this.sliderValue.textContent()).toEqual(movedValue)
    expect(await this.sliderValue.textContent()).not.toEqual(defaultValue)
  }

}