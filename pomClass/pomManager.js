const LoginApiPage = require('../apiHandlers/loginApi/loginApi');
const TestData = require('../apiHandlers/loginApi/testData');
const homePage = require('../pomClass/homePage');
const cartPage = require('../pomClass/cartPage');
const checkout = require('../pomClass/checkout')
const orderDonepage = require('../pomClass/orderDonepage');
const viewOrder = require('../pomClass/viewOrder');
const LoginPage=require('../pomClass/LoginPage');
const ViewProduct=require('../pomClass/ViewProduct');
class pomManager {
    constructor(request, expect, page) {
        this.loginApiPage = new LoginApiPage(request, expect);
        this.credentials = TestData.getValidCredentials();
        this.homep = new homePage(page);
        this.cartP = new cartPage(page);
        this.checkoutV = new checkout(page);
        this.orderDone = new orderDonepage(page);
        this.vieworder = new viewOrder(page);
        this.loginPage=new LoginPage(page);
        this.viewProduct=new ViewProduct(page);

    }
}
module.exports = pomManager