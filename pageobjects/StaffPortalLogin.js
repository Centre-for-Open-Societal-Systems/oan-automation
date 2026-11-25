const { expect } = require('@playwright/test');
class StaffPortalLogin{

    constructor(context, page){
        this.context = context;
        this.page = page;
        this.email = this.page.locator("#username");
        this.password = this.page.locator("#password");
        this.loginButton = this.page.locator("[class='login-btn']");
    }

    async goTo(){
        await this.page.goto("https://staff-portal.qa.oanstaging.com/en");
    }

    async validLogin(username, password){
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await expect(this.page).toHaveTitle("Openg2p");
    }

}

module.exports = StaffPortalLogin;