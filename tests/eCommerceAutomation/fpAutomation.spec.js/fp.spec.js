const { test, expect } = require('@playwright/test')
const searchBar = require('./poms/searchBar');
const ProductaPage = require('./poms/ProductPage');

test('fp automation', { tag: '@fpautomation' }, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const searchbar = new searchBar(context, page);

    // await page.goto('https://www.flipkart.com/');
    const product = searchbar.product
    // await page.locator('input[title*="Search"]').fill('samsung galaxy s24 ultra 5g black');
    // await page.locator('[action="/search"] ul li').filter({ hasText: 'samsung galaxy s24 ultra 5g blackin Mobiles' }).click();
    // const [child] = await Promise.all([
    //     context.waitForEvent('page'),
    //     page.locator('[data-tkid*="SEARCH"]').filter({ hasText: product, visible: true }).first().click()
    // ])
    // await child.bringToFront();
    await searchbar.gotourl();
    await searchbar.searchProduct();
    const child = await searchbar.maintainingSingleProductSearch();
    await child.waitForLoadState();
    const productapage = new ProductaPage(child);
    await productapage.productPageAction(expect);
    // try {
    // await expect(child.locator('text="LOGIN"').nth(2)).toBeHidden();
    // const pinCodecheck = child.locator('#pincodeInputId');
    // await pinCodecheck.scrollIntoViewIfNeeded();
    // await pinCodecheck.waitFor({ state: 'visible' });
    // await pinCodecheck.click();
    // await pinCodecheck.pressSequentially('401501');
    // await child.locator('text="Check"').click();
    // await expect(child.locator('text="Change"')).toBeVisible();
    // // await child.pause()
    // await child.locator('button:has-text("Add to cart")').first().click();
    // await child.waitForURL('**/viewcart*');
    // await child.locator('text="Palghar - 401501"').waitFor();
    // await child.goBack();
    // await expect(child.locator('button:has-text("GO TO CART")')).toBeVisible()
    // await child.locator('[href*="viewcart"]').click();
    // await child.waitForURL('**/viewcart*');
    // await expect(child.locator('text="Palghar - 401501"')).toBeVisible()
    // await expect(child.locator('a[href*="/samsung-galaxy"]').last()).toContainText(product)
    // await child.locator('button:has-text("Place Order")').click();
    // }
    // catch (error) {
    //     await child.locator('text="NOTIFY ME"').click();
    //     console.log('product out of stock');
    // }

})