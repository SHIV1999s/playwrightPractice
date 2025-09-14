
class cartPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.cartSection h3');
        this.heading = page.locator('.heading:visible')
        this.homePageRedirctusingcart = this.heading.locator('button');
        this.prodTotal = page.locator('.prodTotal:visible');
        this.total = page.locator('.value:visible');
        this.checkout = page.locator('text="Checkout"')

    }
    async cartPageCheckout(productTitle, productAmount, expect, request) {
        const loginApiCall = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: {
                "userEmail": "shivjayprakashsingh@gmail.com",
                "userPassword": "Shivpratap@123"
            }, headers: { "Content-Type": "application/json" }
        });
        let loginResponse = await loginApiCall.json();
        const token = loginResponse.token;
        const userId = loginResponse.userId;
        // await this.page.waitForSelector('.cartSection h3');
        if (await this.title.isVisible()) {
            await expect(this.title).toHaveText(productTitle);
        } else {
            try {
                console.log(token);
                const response = await request.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {
                    data: {
                        "_id": `${userId}`,
                        "product": {
                            "_id": "68a961719320a140fe1ca57c",
                            "productName": "ADIDAS ORIGINAL",
                            "productCategory": "electronics",
                            "productSubCategory": "mobiles",
                            "productPrice": 11500,
                            "productDescription": "Apple phone",
                            "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg",
                            "productRating": "0",
                            "productTotalOrders": "0",
                            "productStatus": true,
                            "productFor": "women",
                            "productAddedBy": "admin",
                            "__v": 0
                        }
                    },
                    headers: { "Authorization": token, "Content-Type": "application/json" }
                });
                console.log(await response.json());
                await this.page.reload();
                await expect(this.title).toHaveText(productTitle)
            } catch (error) {
                console.log(token);
                const response = await request.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {
                    data: {
                        "_id": `${userId}`,
                        "product": {
                            "_id": "68a961719320a140fe1ca57c",
                            "productName": "ADIDAS ORIGINAL",
                            "productCategory": "electronics",
                            "productSubCategory": "mobiles",
                            "productPrice": 11500,
                            "productDescription": "Apple phone",
                            "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg",
                            "productRating": "0",
                            "productTotalOrders": "0",
                            "productStatus": true,
                            "productFor": "women",
                            "productAddedBy": "admin",
                            "__v": 0
                        }
                    },
                    headers: { "Authorization": token, "Content-Type": "application/json" }
                });
                console.log(await response.json());
                await this.page.reload();
                await expect(this.title).toHaveText(productTitle)
            }
        };
        await expect(this.heading).toContainText('My Cart');
        await expect(this.prodTotal).toContainText(productAmount);
        await expect(this.total.first()).toContainText(productAmount);
        await expect(this.total.nth(1)).toContainText(productAmount);
        await this.checkout.click();
    }
}
module.exports = cartPage