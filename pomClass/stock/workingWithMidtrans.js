class workingWithMidtrans {
    constructor(page, expect) {
        this.page = page;
        this.expect=expect
        this.frame = page.frameLocator('[id="snap-midtrans"]');
        this.frame2 = this.frame.frameLocator('[class="iframe-3ds"]');
        this.url = 'https://demo.midtrans.com/';
        this.buy = page.locator('[class="btn buy"]');
        this.cartGo = page.locator('[class="cart-checkout"]');
        this.ccClick = this.frame.locator('[href="#/credit-card"]');
        this.enterCC = this.frame.locator('[autocomplete="cc-number"]');
        this.expiry = this.frame.locator('[id="card-expiry"]');
        this.cvv = this.frame.locator('[id="card-cvv"]');
        this.payNow = this.frame.locator('text="Pay now"');
        this.Proceed = this.frame.locator('text="Proceed"');
        this.otp = this.frame2.locator('[id="otp"]');
        this.ok = this.frame2.locator('[name="ok"]');
        this.paymentSuccessMsz = this.frame.locator('text="Payment successful"')

    }
    async goTourl() {
        await this.page.goto(this.url);

    };
    async goToPaymentPage() {
        await this.buy.click();
        await this.cartGo.click();
        await this.ccClick.click();
    };
    async fillCardDetails() {
        await this.enterCC.fill('4811 1111 1111 1114');
        await this.expiry.pressSequentially('0126');
        await this.cvv.fill('123');
    };
    async goToOtpPageSubmit() {
        await this.payNow.click();
        await this.Proceed.click();
        await this.otp.fill('112233');
    }
    async verfiyPayementDont() {
        await this.ok.click();
        console.log(await this.paymentSuccessMsz.textContent());
        await this.expect(this.paymentSuccessMsz).toHaveText('Payment successful');
    }
}
module.exports=workingWithMidtrans