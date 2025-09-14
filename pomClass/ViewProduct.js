class ViewProduct{
    constructor(page){
        this.page=page;
        this.productCard = page.locator('.card-body');
        this.productTitle = page.locator('.row h2');
        this.productAmount = page.locator('.row h3');
        this.qasummitLink = page.locator('a[href="https://qasummit.org/"]');
        this.addToCartBtn = page.getByText('Add to Cart');
        this.alertMessage = page.locator('[role="alert"]').first();
    }
    async viewProductpage(productName) {
        await this.productCard
            .filter({ hasText: productName })
            .getByText('View')
            .click();
    };
     async validateProductDetails(expectedTitle, expectedAmount,expect) {
        await expect(this.productTitle).toHaveText(expectedTitle);
        await expect(this.productAmount).toContainText(expectedAmount);
        await expect(this.qasummitLink).toHaveAttribute('class', 'blinkingText');
    }

    // Add product to cart
    async addProductToCart(expect) {
        await expect(this.addToCartBtn).toBeVisible();
        await this.addToCartBtn.click();
    }

    // Verify success message
    async verifyProductAddedToCart(expect) {
        await expect(this.alertMessage).toBeVisible();
        await expect(this.alertMessage).toHaveText('Product Added To Cart');
    }
}

module.exports=ViewProduct






