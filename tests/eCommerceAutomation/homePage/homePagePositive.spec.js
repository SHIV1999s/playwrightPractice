const { test, expect } = require('@playwright/test')

const pomManager = require('../../../pomClass/pomManager');
let token;
let pommanager;

//writing reusable login flow
test.beforeEach('apiCall for login flow', async ({ request }) => {
    const loginApiCall = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: {
            "userEmail": "shivjayprakashsingh@gmail.com",
            "userPassword": "Shivpratap@123"
        }, headers: { "Content-Type": "application/json" }
    });
    token = (await loginApiCall.json()).token;
})

test('e2e automation', { tag: '@homePageValidCase' }, async ({ request, page }) => {
    pommanager = new pomManager(request, expect, page);
    await page.addInitScript(token => window.localStorage.setItem('token', token), token);
    // const homep = new pommanager.homePage(page);
    await pommanager.homep.goToHomePage()
    await pommanager.homep.getProductPrice()
    await pommanager.homep.addProductToCart()
    const productTitle = pommanager.homep.productName;
    const emailId = pommanager.homep.emailid;
    const productAmount = pommanager.homep.productAmount;
    await pommanager.viewProduct.viewProductpage(productTitle);
    await pommanager.viewProduct.validateProductDetails(productTitle,productAmount,expect);
    await pommanager.viewProduct.addProductToCart(expect);
    await pommanager.viewProduct.verifyProductAddedToCart(expect);
    await pommanager.homep.goToCart();
})