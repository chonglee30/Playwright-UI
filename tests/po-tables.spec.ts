import {test } from '../test-options'

test.describe('Tables page', () => {
  test.beforeEach(async({pageManager}) => {
    pageManager.onHomePage().goToTablesPage()
  })

  test('Sortable Table Search Test', async({pageManager}) => {
    await pageManager.onTablesPage().checkSortableTableSearch('Italy', 1)
  })

  test('Sortable Table Pagination and Sorting Test', async({pageManager}) => {
    await pageManager.onTablesPage().checkPaginationSortingTable(25)
  })
})
