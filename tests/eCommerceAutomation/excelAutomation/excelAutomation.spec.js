const { test } = require('@playwright/test')
const writeExcel = require('./excelHandler')
test('excel automation', { tag: '@excelAutomation' }, async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#downloadButton').click()
    ])
    await download.saveAs('tests/eCommerceAutomation/excelAutomation/'+download.suggestedFilename());
    console.log(await download.path());
    await writeExcel.writeExcel('Banana','Elaichi Kela','tests/eCommerceAutomation/excelAutomation/download.xlsx','Sheet1',{rowIncrease:0,cellIncrease:2})
    await page.locator('#fileinput').setInputFiles('tests/eCommerceAutomation/excelAutomation/'+download.suggestedFilename())
})