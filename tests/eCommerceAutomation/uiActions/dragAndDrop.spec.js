const { test } = require('@playwright/test')

test('draganddropaction', { tag: '@draganddropaction' }, async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/drag-and-drop');
    await page.pause();
    await page.dragAndDrop('#column-a', '#column-b');
    await page.locator('#column-b').dragTo(page.locator('#column-a'));
    await page.locator('#column-a').hover();
    await page.mouse.down();
    await page.locator('#column-b').hover();
    await page.mouse.up();
    await page.on('request',request=>request.method())
})