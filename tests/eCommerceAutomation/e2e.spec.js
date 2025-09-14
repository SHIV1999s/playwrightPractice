const { test, expect } = require('@playwright/test')
const pomManager = require('../../pomClass/pomManager');
let token;
let pommanager;

//writing reusable login flow
test.beforeEach('apiCall for login validation', async ({ request, page }) => {
    pommanager = new pomManager(request, expect, page, 'orderId');
    await pommanager.loginPage.goToLoginPage();
    await pommanager.loginPage.assertionOnLoginPage(expect);
    await pommanager.loginPage.enterCredentialsOnLoginPage('shivjayprakashsingh@gmail.com', 'Shivpratap@123');
    await pommanager.loginPage.clickLoginButton();
    await pommanager.loginPage.homePageValidationAfterLogin();
})
test('e2e automation', { tag: '@e2eSanityFlow' }, async ({ page, request }) => {
    test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });
    // await page.addInitScript(token => window.localStorage.setItem('token', token), token);
    // const homep = new pommanager.homePage(page);
    await pommanager.homep.homePageJourney();
    // await page.goto('https://rahulshettyacademy.com/client');
    const productTitle = pommanager.homep.productName;
    const emailId = pommanager.homep.emailid;
    const productAmount = pommanager.homep.productAmount;
    console.log(productAmount);
    // const cartP = new cartPage(page);
    await pommanager.cartP.cartPageCheckout(productTitle, productAmount, expect,request);
    //checkout page
    // const checkoutV = new checkout(page);
    await pommanager.checkoutV.checkoutPageVerification(expect, emailId);
    //orderpage
    // const orderDone = new orderDonepage(page);
    const orderId = await pommanager.orderDone.verifyOrderSuccess(expect);
    await pommanager.orderDone.downloadInvoice()
    await pommanager.orderDone.verifyOrderEmail(expect)
    await pommanager.orderDone.goToOrderHistory();
    await pommanager.vieworder.gotoOrderView(orderId);
    await pommanager.vieworder.verifyBillingandEmail(expect, emailId);
    await pommanager.vieworder.verifyProductDetails(productTitle, productAmount, expect);
    await pommanager.vieworder.verifyOrderId(expect, orderId)
})