const { test, expect } = require('@playwright/test')
const pomManager = require('../../../pomClass/pomManager');
let pommanager;

//writing reusable login flow
test('Login Negative cases', { tag: '@loginNegativeCase' }, async ({ request, page }) => {
    pommanager = new pomManager(request, expect, page, 'orderId');
    await pommanager.loginPage.goToLoginPage();
    await pommanager.loginPage.assertionOnLoginPage(expect);
    await pommanager.loginPage.clickLoginButton();
    await pommanager.loginPage.blankCredentialValidation(expect)
    await pommanager.loginPage.reload();
    await pommanager.loginPage.enterCredentialsOnLoginPage('shivjayprakashsing@gmail.com', 'Shivpratap@123');
    await pommanager.loginPage.clickLoginButton();
    await pommanager.loginPage.incorrectCredentialValiation(expect)
})