import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.describe('Tables page', () => {
  test.beforeEach(async({page}) => {
    const pm = new PageManager(page)
    pm.onHomePage().goToTablesPage()
  })

  test('Sortable Table Search Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onTablesPage().checkSortableTableSearch('Italy', 1)
  })

  test('Sortable Table Pagination and Sorting Test', async({page}) => {
    const pm = new PageManager(page)
    await pm.onTablesPage().checkPaginationSortingTable(25)
  })
})
