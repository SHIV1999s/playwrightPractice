class checkout {
    constructor(page) {
        this.page = page;
        this.creditCardNumber = page.locator('.field').filter({ hasText: 'Credit Card Number' }).locator('[type="text"]');
        this.ccNumber = "1234 1234 1234";
        this.cvv = page.locator('.small').filter({ hasText: 'CVV Code' }).locator('input');
        this.ccHolderName = page.locator('.field').filter({ hasText: 'Name on Card' }).locator('[type="text"]');
        this.ccName = "Shivpratap Singh SDET";
        this.monthDropdown = page.locator('select.input').first();
        this.yearDropdown = page.locator('select.input').last();
        this.couponInput = page.locator('[name="coupon"]');
        this.applyCouponBtn = page.locator('[type="submit"]');
        this.couponAppliedMsg = page.locator('text="* Coupon Applied"');
        this.userEmailInput = page.locator('.details__user:visible').locator('[type="text"]').last();
        this.countryInput = page.getByPlaceholder('Select Country');
        this.countryListItem = page.locator('[class*="ta-item"]').nth(1);
        this.placeOrderBtn = page.locator('.btnn:visible');
        // 🔹 Test Data
        this.validMonth = '02';
        this.validYear = '25';
        this.couponCode = 'rahulshettyacademy';
    }
    async checkoutPageVerification(expect,emailId) {
        await this.creditCardNumber.fill(this.ccNumber);
        expect(await this.creditCardNumber.inputValue()).toBe(this.ccNumber)
        await this.cvv.fill("000");
        expect(await this.cvv.inputValue()).toBe("000")
        await this.ccHolderName.fill(this.ccName);
        expect(await this.ccHolderName.inputValue()).toBe(this.ccName);

        await this.monthDropdown.selectOption(this.validMonth);
        await this.yearDropdown.selectOption(this.validYear);
        await this.couponInput.fill(this.couponCode);
        await this.applyCouponBtn.click();

        // assert coupon applied
        await this.couponAppliedMsg.waitFor();
        await expect(this.userEmailInput).toHaveValue(emailId);

        await this.countryInput.pressSequentially('India');
        await this.countryListItem.click();
        await this.placeOrderBtn.click();
        await this.page.waitForLoadState('networkidle')
    }
}
module.exports = checkout