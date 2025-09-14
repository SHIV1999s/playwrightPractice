class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.emailInput = page.locator('[type="email"]');
        this.passwordInput = page.locator('[type="password"]');
        this.loginButton = page.locator('#login');
        this.registerLink = page.locator('[routerlink*="/register"]');
        this.bannerTitle = page.locator('.banner .title');
        this.firstCard = page.locator('.card-body').first();
        this.url = 'https://rahulshettyacademy.com/client';
        this.invalidFeedback = page.locator('.invalid-feedback'); // covers both email & password
        this.errorAlert = page.locator('[role="alert"]');

    }
    async goToLoginPage() {
        await this.page.goto(this.url);
    }
    async assertionOnLoginPage(expect) {
        await expect(this.page).toHaveTitle("Let's Shop");
        await expect(this.page).toHaveURL(this.url + '/#/auth/login');
        await this.registerLink.waitFor();
        await expect(this.registerLink).toHaveAttribute('href', '#/auth/register');
        await expect(this.bannerTitle).toContainText('Rahul Shetty Academy');
    }
    async enterCredentialsOnLoginPage(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async homePageValidationAfterLogin() {
        await this.firstCard.waitFor();
    };
    async blankCredentialValidation(expect) {
        await expect(this.invalidFeedback.first()).toHaveText('*Email is required');
        await expect(this.invalidFeedback.last()).toHaveText('*Password is required')
    }
    async reload() {
        await this.page.reload();
    }
    async incorrectCredentialValiation(expect) {
        await expect(this.errorAlert).toBeVisible();
        await expect(this.errorAlert).toHaveText('Incorrect email or password.');
    }
}
module.exports = LoginPage