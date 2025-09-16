class ProductaPage {
    constructor(child) {
        this.child = child;
        this.loginPopup = child.locator('text="LOGIN"').nth(2)
        this.pinCodecheck = child.locator('#pincodeInputId');
        this.pinCheck = child.locator('text="Check"');
        this.pinChange = child.locator('text="Change"');
        this.addToCart = child.locator('button:has-text("Add to cart")').first();
        this.verifyAddress = child.locator('text="Palghar - 401501"');
        this.gotocartbtn = child.locator('button:has-text("GO TO CART")');
        this.viewCart = child.locator('[href*="viewcart"]');
        this.verifyProductonCheckout = child.locator('a[href*="/samsung-galaxy"]').last();
        this.placeOrder = child.locator('button:has-text("Place Order")')

    }
    async productPageAction(expect) {
        await expect(this.loginPopup).toBeHidden();
        await this.pinCodecheck.scrollIntoViewIfNeeded();
        await this.pinCodecheck.waitFor({ state: 'visible' });
        await this.pinCodecheck.click();
        await this.pinCodecheck.pressSequentially('401501');
        await this.pinCheck.click();
        await expect(this.pinChange).toBeVisible();
        // await child.pause()
        await this.addToCart.click();
        await this.child.waitForLoadState()
        await this.child.waitForURL('**/viewcart*');
        await this.verifyAddress.waitFor();
        await this.child.goBack();
        await expect(this.gotocartbtn).toBeVisible()
        await this.viewCart.click();
        await this.child.waitForURL('**/viewcart*');
        await expect(this.verifyAddress).toBeVisible()
        await expect(this.verifyProductonCheckout).toContainText(product)
        await this.placeOrder.click();
    }

}
module.exports=ProductaPage;