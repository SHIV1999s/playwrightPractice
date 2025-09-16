const { test, expect } = require('@playwright/test')

test('fp automation', { tag: '@fpautomation' }, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.flipkart.com/');
    const product = 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256 GB)'
    await page.locator('input[title*="Search"]').fill('samsung galaxy s24 ultra 5g black');
    await page.locator('[action="/search"] ul li').filter({ hasText: 'samsung galaxy s24 ultra 5g blackin Mobiles' }).click();
    const [child] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('[data-tkid*="SEARCH"]').filter({ hasText: product, visible: true }).first().click()
    ])
    await child.bringToFront();
    // try {
    await expect(page.locator('text="LOGIN"').nth(2)).toBeHidden();
    await child.locator('#pincodeInputId').scrollIntoViewIfNeeded()
    await child.locator('#pincodeInputId').pressSequentially('401501');
    await child.locator('text="Check"').click();
    await page.pause()
    await expect(child.locator('text="Change"')).toBeVisible()
    await child.locator('button:has-text("Add to cart")').first().click();
    await child.waitForURL('**/viewcart*');
    await child.goBack();
    await expect(child.locator('button:has-text("GO TO CART")')).toBeVisible()
    await child.locator('[href*="viewcart"]').click();
    await child.waitForURL('**/viewcart*');
    await expect(child.locator('Palghar - 401501')).toBeVisible()
    await expect(child.locator('a[href*="/samsung-galaxy"]').last()).toBeVisible()
    await child.locator('button:has-text("Place Order")').click();
    await page.pause();

    // }
    // catch (error) {
    //     await child.locator('text="NOTIFY ME"').click();
    //     console.log('product out of stock');
    // }

})