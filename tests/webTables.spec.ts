import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/')
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()
})

test.describe('Smart Table - Web Tables page', () => {
  test('Modify age of a user based on email selection', async ({ page }) => {
    const selectedRow = page.getByRole('row', { name: "fat@yandex.ru" })
    await selectedRow.locator('.nb-edit').click()

    const ageColumn = selectedRow.getByRole('textbox', { name: "Age" })
    await expect(ageColumn).toHaveValue('45')
    await ageColumn.clear()
    await ageColumn.fill('55')
    await selectedRow.locator('.nb-checkmark').click()
    const modifiedAge = await selectedRow.getByRole('cell').nth(6).textContent()
    expect(modifiedAge).toEqual('55')
  })

  test('Modify email of a user based on ID selection', async ({ page }) => {
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()  // 2nd pagination selection  
    const selectedRowById = page.getByRole('row', { name: "11" }).filter({ has: page.getByRole('cell').nth(1).getByText('11') })
    await selectedRowById.locator('.nb-edit').click()

    const emailColumn = page.locator('input-editor').getByPlaceholder('E-mail')
    await emailColumn.clear()
    await emailColumn.fill('markTest@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(selectedRowById.getByRole('cell').nth(5)).toHaveText('markTest@test.com')
  })

  test('Correct Age Table Filter', async ({ page }) => {
    const ages = ["20", "30", "40", "200"]
    for (let age of ages) {
      await page.locator('input-filter').getByPlaceholder('Age').clear()
      await page.locator('input-filter').getByPlaceholder('Age').fill(age)
      const ageRows = page.locator('tbody tr')

      if (age !== "200") {
        await expect(page.locator('table tbody tr:nth-child(1) td:nth-child(7)')).toHaveText(`${age}`);
      }

      for (let row of await ageRows.all()) {
        if (age == "200") {
          await expect(page.locator('table tbody tr:nth-child(1) td:nth-child(1)')).toHaveText('No data found')
        } else {
          await expect(row.getByRole('cell').last()).toHaveText(age)
        }
      }
    }
  })
});

test.describe('Smart Table - User Age Drinking Test', () => {
  test('Get username with Illegal Drinking Ages Report', async ({ page }) => {
    const smartTable = page.locator('ngx-smart-table');
    const tableRows = smartTable.locator('tbody tr')
    await expect(tableRows.first()).toBeVisible()

    const userReport = await tableRows.evaluateAll((rows) => {
      return rows.map(row => ({
        username: (row.children[4] as HTMLElement).innerText,
        age: parseInt((row.children[6] as HTMLElement).innerText)
      }))
        .filter(user => user.age < 21)
        .map(({ username, age }) => `${username} cannot drink alcohol as under age at ${age}`)
    })
    console.log('--- User Legal Drinking Age Report ---')
    userReport.forEach(report => console.log(report))
  })

  test('Verify Illegal Drinking Ages - querySelectorAll', async ({ page }) => {
    const tableRows = page.getByRole('table').locator('tbody tr')
    await tableRows.first().waitFor();

    const userReport = await tableRows.evaluateAll((rows) =>
      rows.map(row => {
        const columns = row.querySelectorAll('td');
        return {
          username: (columns[4] as HTMLElement).innerText,
          age: parseInt((columns[6] as HTMLElement).innerText)
        };
      })
        .filter(user => user.age < 21)
    );
    userReport.forEach(report => expect(report.age).toBeLessThan(21))
  });

  test('Verify Illegal Drinking Ages - querySelector', async ({ page }) => {
    const tableRows = page.getByRole('table').locator('tbody tr')
    await tableRows.first().waitFor();
    const userReport = await tableRows.evaluateAll((rows) =>
      rows.map(row => {
        return {
          username: (row.querySelector('td:nth-child(5)') as HTMLElement).innerText,
          age: parseInt((row.querySelector('td:nth-child(7)') as HTMLElement).innerText)
        };
      })
        .filter(user => user.age < 21)
    );
    userReport.forEach(report => expect(report.age).toBeLessThan(21))
  });

  test('Verify Illegal Drinking Ages', async ({ page }) => {
    const rows = page.getByRole('table').locator('tbody tr')
    await rows.first().waitFor();
    const arrayRows = await rows.all();
    const userReport = []
    for (const row of arrayRows) {
      const cells = row.getByRole('cell');
      const cellTexts = await cells.allInnerTexts();
      const user: any = {}
      user.username = await cells.nth(4).textContent()
      user.age = parseInt(await cells.nth(6).textContent() as string)
      userReport.push(user)
    }

    const underAgeUsers = userReport.filter(user => user.age < 21)
      .map(({ username, age }) => `${username} is not eligible to drink at the age of ${age}`)

    console.log('--- User Illegal Drinking Age Report ---')
    underAgeUsers.forEach((agentUser) => console.log(agentUser))
  });

});

test.describe('Smart Table - Sorting', () => {
  test('Verify Sorting Table Row by Age Asending Order', async ({ page }) => {
    const tableLabelHeaders = page.getByRole('table').locator('thead tr').first()
    const ageColumnHeader = tableLabelHeaders.locator('th:last-child a').filter({ hasText: 'Age' })
    await expect(ageColumnHeader).toBeVisible();
    await ageColumnHeader.click()

    await expect(async () => {
      const tableRows = page.getByRole('table').locator('tbody tr')
      await expect(tableRows.first()).toBeVisible();

      const users = await tableRows.evaluateAll((rows) => {
        return rows.map(row => ({
          firstname: row.children[2].textContent,
          age: parseInt(row.children[6].textContent)
        }))
      })

      const ages = users.map(user => user.age)
      const sortedAges = [...ages].sort((a, b) => a - b);
      expect(ages).toEqual(sortedAges);
    }).toPass({
      intervals: [500, 1000, 2000],
      timeout: 10000
    })
  })
  test('Verify Sorting Table Row by Age Asending and Descending Order - simpler locator', async ({ page }) => {
    const ageColumnHeader = page.locator('table thead tr:first-child th:has-text("Age") a');
    await expect(ageColumnHeader).toBeVisible();

    // Asending
    await ageColumnHeader.click()
    const tableRows = page.getByRole('table').locator('tbody tr')
    await tableRows.first().waitFor();

    await expect(async () => {
      const users = await tableRows.evaluateAll((rows) => {
        return rows.map(row => ({
          firstname: row.children[2].textContent,
          age: parseInt(row.children[6].textContent)
        }))
      })

      const ages = users.map(user => user.age)
      const sortedAges = [...ages].sort((a, b) => a - b);
      expect(ages).toEqual(sortedAges);

    }).toPass({
      intervals: [500, 1000, 2000],
      timeout: 10000
    })

    const ageBefore = await tableRows.first().locator('td:last-child').textContent()
    // B. Descending:
    await ageColumnHeader.click()
    await tableRows.first().waitFor();

    await expect(async () => {
      const ageAfter = await tableRows.first().locator('td:last-child').textContent()

      // If the text is still exactly the same as before the click, 
      // throw an error to trigger a retry.
      if (ageBefore === ageAfter) {
        throw new Error('Table has not updated yet as same age');
      }

      const usersDesc = await tableRows.evaluateAll((rows) => {
        return rows.map(row => ({
          firstname: row.children[2].textContent,
          age: parseInt(row.children[6].textContent)
        }))
      })

      const agesDesc = usersDesc.map(user => user.age)
      const sortedDescAges = [...agesDesc].sort((a, b) => b - a);
      expect(agesDesc).toEqual(sortedDescAges);
    }).toPass({
      intervals: [500, 1000, 2000],
      timeout: 10000
    })
  })

  test('Verify Sorting Table Row with Refactor code', async ({ page }) => {
    // 1. Centralized Locators
    const tableRows = page.locator('table tbody tr');
    const ageHeader = page.locator('table thead tr:first-child th:has-text("Age") a');

    /**
     * Helper: Extracts ages from the current table state
     */
    const getTableAges = async () => {
      return await tableRows.evaluateAll(rows =>
        rows.map(row => parseInt(row.children[6]?.textContent || '0'))
      );
    };

    /**
   * Helper: Clicks and waits for the table to sort in a specific order
   */
    const assertSort = async (direction: 'asc' | 'desc') => {
      // Capture state before click to detect when the table actually updates
      const firstRowBefore = await tableRows.first().innerText();

      await ageHeader.click();

      await expect(async () => {
        const firstRowAfter = await tableRows.first().innerText();
        if (firstRowBefore === firstRowAfter) throw new Error('Table data not yet updated');

        const ages = await getTableAges();
        const expected = [...ages].sort((a, b) => direction === 'asc' ? a - b : b - a);

        expect(ages).toEqual(expected);
      }).toPass({ intervals: [500, 1000], timeout: 10000 });
    };

    // --- Test Execution ---
    await expect(ageHeader).toBeVisible();

    // Test Ascending
    await assertSort('asc');

    // Test Descending
    await assertSort('desc');

  })
})