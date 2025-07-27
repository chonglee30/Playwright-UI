# Playwright-UI
Playwright Test - UI
Installation dependencies: npm install
Run: commandline: commandline: npx playwright test 
Github Action CI: Choose one of option: Chrome, Firefox, WebKit

5 Test Spec Files:
**po-calendars.spec.ts**: 
- Ensure today's date is pre-selected.
Ex: if today's date is July 27th, then 27th is selected.

**po-form-fields.spec.ts**: 
**TC#1**: Textbox Test: Fill In Username and Password and make sure values are correct based on user's input. 
**TC#2**: Checkbox Test: Ensure all checkboxes are checked and true values then all checkboxes are unchecked and false values.
**TC#3**: Radio Button Test: ensure one radio button is selected and other radio button is not selected.
**TC#4**: Dropdown Test: check all dropdown options and check selected dropdown value. 
**TC#5**: Submit Form Test: Click Submit button to submit email and text.

**po-sliders.spec.ts**: 
**TC#1**: Move the bar to the right about to 40.

**po-tables.spec.ts**: 
**TC#1**: Table Search by Country: Italy and 1 row is selected. 
**TC#2**: Table entries - check initial entries - 10 and 25 if 25 entries are selected.

**dragDropIframe.spec.ts**
**TC**: Drag and Drop iframe Test: using locator and using more precision control with mouse 

**Design Pattern** 
<ins>POM (Page Object Model)</ins> with PageManager and Fixture 
<ins>Test Codes</ins>                               <ins>PageObject Codes</ins>                      
[po-calendars.spec.ts                       [homePage
po-form-fields.spec.ts  <- PageManager <-   calendarsPage  <-  HelperBase
po-sliders.spec.ts                          formFieldsPage
po-tables.spec.ts]                          slidersPage 
                                            tablesPage]

**PageManager**: 
between pageobject and tests
include necessary files and allocate objects for each PageObjects to reduce repetition in the test files.

**test-options.ts**: 
custom fixture file which include pageManager import and allocation so that no need to have this in all test files.  also, homepage is loaded before browser test begin.

CI/CD - github action 2 files and 2 jobs 
**playwright.yml**: run tests any of three browsers: chrome, firefox, webkit.  User can select any of these browsers.  default - chrome. 
**playwright-docker.yml**: run tests in the docker container all tests in chrome browser.