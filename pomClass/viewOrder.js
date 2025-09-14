class viewOrder {
    constructor(page) {
        this.page = page;
        // this.orderId=orderId;
        this.orderClickPage=(orderId)=>{return page.locator('tr').filter({ hasText: orderId }).locator('button:has-text("View")')};
        this.emailCommon1=(id)=>{return page.locator('.address:visible').filter({ hasText: id }).locator('[class="text"]').first()}
        // this.emailCommon2=locator('[class="text"]').first()
        this.productTitle=page.locator('.title:visible');
        this.productPrice=page.locator('.price:visible');
        this.verifyOrderbyid=page.locator('[class="col-text -main"]')
    };
    async gotoOrderView(orderId) {
        await this.page.waitForLoadState('networkidle')
        await this.orderClickPage(orderId).click();
    }
    // async addressEmail(addressType) {
        // return (emailCommon1.filter({ hasText: `${addressType}` }).emailCommon2.textContent());
    // }
    async verifyBillingandEmail(expect, emailId) {
        const emailB = (await this.emailCommon1('Billing Address').textContent()).trim()
        const emailD = (await this.emailCommon1('Delivery Address').textContent()).trim()
        expect(emailB).toBe(emailId)
        expect(emailD).toBe(emailId);
    }
    async verifyProductDetails(productTitle,productAmount,expect) {
        await expect(this.productTitle).toHaveText(productTitle);
        await expect(this.productPrice).toContainText(productAmount)
    }
    async verifyOrderId(expect,orderId) {
        await expect(this.verifyOrderbyid).toHaveText(orderId)
    }
}
module.exports=viewOrder