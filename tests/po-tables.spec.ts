import {test, expect} from '@playwright/test'
import {HomePage} from '../page-objects/homePage'
import { TablesPage } from '../page-objects/tablesPage'

test.describe('Tables page', () => {
  test.beforeEach(async({page}) => {
    const homePage = new HomePage(page)
    await homePage.goToTablesPage();
  })

  test('Sortable Table Search Test', async({page}) => {
    const tablesPage = new TablesPage(page)
    await tablesPage.checkSortableTableSearch('Italy', 1)
  })

  test('Sortable Table Pagination and Sorting Test', async({page}) => {
    const tablesPage = new TablesPage(page)
    await tablesPage.checkPaginationSortingTable(25)
  })
})
