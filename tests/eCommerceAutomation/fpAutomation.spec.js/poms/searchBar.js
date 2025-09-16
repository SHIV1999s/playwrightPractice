class searchBar {
    constructor(context, page) {
        this.context = context;
        this.page = page;
        this.product = 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 512 GB)';
        this.searchBar = page.locator('input[title*="Search"]');
        this.selectProductSearchBar = page.locator('[action="/search"] ul li').filter({ hasText: 'samsung galaxy s24 ultra 5g blackin Mobiles' });
        this.selectProductContinue = page.locator('[data-tkid*="SEARCH"]')
    }
    async gotourl() {
        await this.page.goto('https://www.flipkart.com/');
    }
    async searchProduct() {
        // const product = 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 512 GB)'
        await this.searchBar.fill('samsung galaxy s24 ultra 5g black');
        await this.selectProductSearchBar.click();
    };
    async maintainingSingleProductSearch() {
        const [child] = await Promise.all([
            this.context.waitForEvent('page'),
            this.selectProductContinue
                .filter({ hasText: this.product, visible: true })
                .first()
                .click()
        ]);
        await child.bringToFront();
        return child;
    }
}
module.exports = searchBar;