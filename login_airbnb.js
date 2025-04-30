const { chromium } = require('playwright');
const fs = require('fs');

async function loginToAirbnb(email, password) {
    try{
        const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
        const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
        const page = await context.newPage();
        await page.goto('https://www.airbnb.com/login');
        await page.waitForTimeout(5000);
    // loginToAirbnb("justindelavega00@gmail.com", "Emjaycee83849724")
        console.log(email,password);
        try{
            const accept_cookies = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/div/div[3]/section/div/div[2]/div[1]/button').isVisible();
            await page.waitForTimeout(2000);
            await accept_cookies.click();
        }
        catch(err){
            console.log('No cookies to accept');
        }
        await page.waitForTimeout(2000);
        let email_button = await page.locator("xpath=//*[@id='FMP-target']/div/div/div/div[3]/div/div[3]/button");
        await email_button.click();
        await page.waitForTimeout(10000);
        // let email_input = await page.locator("xpath=user[email]");
        await page.keyboard.insertText(email);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);

        // let password_input = await page.locator("xpath=user[password]");
        await page.keyboard.insertText(password);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        console.log(await page.url());
        await page.waitForTimeout(2000);

        if (await page.url() === 'https://www.airbnb.com/') {
            const cookies = await context.cookies();
            fs.writeFileSync('airbnb.json', JSON.stringify(cookies, null, 2));

            await browser.close();
            await page.waitForTimeout(50000);
            return true;
        }
        else {
            await browser.close();
            await page.waitForTimeout(50000);
            return false;
        }
    }catch(err){
        console.log('Error:', err);
        await page.waitForTimeout(50000);
        return false;
    }
}

module.exports = { loginToAirbnb };