import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./pageBase"

export class TablesPage extends PageBase {
  readonly entriesPage: Locator
  readonly pageStatus: Locator
  readonly searchBox : Locator
  readonly searchColumn: Locator
  readonly searchHeader: Locator
  readonly searchRow: Locator
  readonly sortableTable : Locator
  
  constructor(page: Page) {
    super(page)
    this.entriesPage = page.locator('select[class="dt-input"]')
    this.pageStatus = page.locator('div[class="dt-info"][role="status"]')

    this.searchBox = page.getByLabel('Search:')
    this.searchColumn = page.locator('table[id="tablepress-1"] tbody tr td')
    this.searchHeader = page.locator('table[id="tablepress-1"] thead tr th')
    this.searchRow = page.locator('table[id="tablepress-1"] tbody tr')
    this.sortableTable = page.locator('#sortable-table-countries-by-population')
  }

  /**
   * 
   * @param searchCountry 
   * @param numberOfRows 
   */
  async checkSortableTableSearch(searchCountry:string, numberOfRows:number) {
    expect(await this.sortableTable.textContent()).toEqual('Sortable Table')
    await this.searchBox.clear()
    await this.searchBox.fill(searchCountry)
    await expect(this.searchBox).toHaveValue(searchCountry)
    expect(await this.searchRow.count()).toEqual(numberOfRows)
    expect(await this.searchRow.locator('td').nth(1).innerText()).toEqual(searchCountry)

    await this.searchBox.clear()
    expect(await this.searchRow.count()).toBeGreaterThan(numberOfRows)
  } 

  /**
   * 
   * @param numberOfRows 
   */
  async checkPaginationSortingTable(numberOfRows:number) {
    expect(await this.pageStatus.textContent()).toEqual('Showing 1 to 10 of 25 entries')
    await this.entriesPage.click()
    this.entriesPage.selectOption(numberOfRows.toString())
    await expect(this.entriesPage).toHaveValue(numberOfRows.toString())
    expect(await this.pageStatus.textContent()).toEqual(`Showing 1 to ${numberOfRows} of 25 entries`)
    expect(await this.searchRow.count()).toEqual(numberOfRows)

    const rankHeader = this.searchHeader.nth(0)
    await rankHeader.click()
    await expect(rankHeader).toHaveAttribute('aria-sort','ascending')
    await rankHeader.click()
    await expect(rankHeader).toHaveAttribute('aria-sort','descending')
    await expect(this.searchColumn.nth(0)).toHaveText(numberOfRows.toString())
  }
}