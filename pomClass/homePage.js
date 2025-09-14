class homePage {
    constructor(page) {
        this.page = page;
        this.url = 'https://rahulshettyacademy.com/client';
        this.productName = 'ADIDAS ORIGINAL';
        this.emailid = 'shivjayprakashsingh@gmail.com'
        this.productAmount;
        this.productpriceLocator = page.locator('.card-body').filter({ hasText: this.productName }).locator('.text-muted');
        this.addTocart = page.locator('.card-body').filter({ hasText: this.productName }).getByText('Add To Cart');
        this.goTocart = page.locator('[routerlink*="cart"]');
    };


    // Navigate to home page
    async goToHomePage() {
        await this.page.goto(this.url);
    }

    // Get product price
    async getProductPrice() {
        this.productAmount = (await this.productpriceLocator.textContent()).match(/\d+/g).toString();
        return this.productAmount;
    }

    // Add product to cart
    async addProductToCart() {
        await this.addTocart.click();
    }

    // Navigate to cart
    async goToCart() {
        await this.goTocart.click();
    }

    // 🔹 If you still want a combined flow
    async homePageJourney() {
        await this.goToHomePage();
        await this.getProductPrice();
        await this.addProductToCart();
        await this.goToCart();
    }
}
module.exports = homePage