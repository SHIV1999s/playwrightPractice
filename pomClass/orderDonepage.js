class orderDonepage {
    constructor(page) {
        this.page = page;
        // 🔹 Selectors
        this.orderSuccessMsg = page.locator('.hero-primary');
        this.firstOrderRow = page.locator('tr.ng-star-inserted').first();
        this.myOrdersBtn = page.locator('button[routerlink*="myorders"]');
        this.downloadInvoiceBtn = page.locator('button.btn-primary');
        this.orderEmail = page.locator('[class="links"]');
        this.orderHistoryLink = page.locator('td [routerlink*="myorders"]');

        // 🔹 Variables
        // this.orderId = null;
    }

    async verifyOrderSuccess(expect) {
        await expect(this.orderSuccessMsg).toHaveText('Thankyou for the order.');
        return (
            await this.firstOrderRow.textContent()
        ).match(/[0-9a-zA-Z]+/g).toString();
    }

    async downloadInvoice() {
        // await this.myOrdersBtn.click();
        // await this.page.goBack();
        await this.downloadInvoiceBtn.waitFor();
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadInvoiceBtn.click(),
        ]);
        await download.saveAs('downloadFiles/' + download.suggestedFilename());
    }

    async verifyOrderEmail(expect) {
        const dummyEmail = await this.orderEmail.textContent();
        await expect(dummyEmail.trim()).toBe('dummywebsite@rahulshettyacademy.com');
    }

    async goToOrderHistory() {
        await this.orderHistoryLink.click();
    }
}
module.exports = orderDonepage