const {test}=require('@playwright/test')

test('flipkart automation wihtout password',{tag:'@flipkartAutomation'},async({browser})=>{
    const context=await browser.newContext({storageState:'flipkart.json'});
    const page=await context.newPage();
    await page.goto('https://www.flipkart.com/');
    // await page.pause();
    await new Promise(r=>setTimeout(r,2000))
    // await context.storageState({path:'flipkart.json'})
    await page.pause()
})