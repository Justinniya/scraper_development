const { chromium } = require('playwright');
const  path  = require('path');
const fs = require('fs');
const { strict } = require('assert');
const { parse, isAfter, addDays } = require('date-fns');
const axios = require('axios');

async function fetchData() {
    try{
        const urll = "https://0fe5-120-28-169-50.ngrok-free.app"
        let data = await axios.get(`${urll}/scraping_getScrapingSched`);
        console.log(data);
        response = data.data.data;
        // fs.writeFileSync('output.txt', `${response}`);
        return response[0];
    }
    catch(error){
        console.log('Error fetching data:', error);
        return [];
    }
}

async function scraper(url){
    const browse = await chromium.launch({
        channel: 'chrome',
        headless: true
    });

    const context = await browse.newContext({viewport: null});
    const cookiesFile = path.join(__dirname, 'cookies.json');

    if (fs.existsSync(cookiesFile)) {
        const cookies = JSON.parse(fs.readFileSync(cookiesFile, 'utf-8'));
        await context.addCookies(cookies);
        console.log('✅ Cookies loaded from', cookiesFile);
    }
    const page = await context.newPage();
    // const screenSize = await page.evaluate(() => {
    //     return {
    //         width: window.screen.width,
    //         height: window.screen.height
    //     };
    // });
    // await page.setViewportSize({
    //     width: screenSize.width,
    //     height: screenSize.height
    // });
        console.log("Starting...");
        await page.goto(`https://www.facebook.com/groups/${url}`);
        await page.waitForSelector('body', { state: 'visible' });
        await page.waitForTimeout(5000);
        const group_name = await page.textContent("//a[contains(@class,'x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g xkrqix3 x1sur9pj x1pd3egz')]");
        console.log('this is a group name : ',group_name);
        await page.screenshot({ path: 'screenshot.png' });
        await page.waitForTimeout(10000);
        for(let j = 0; j < 100; j++){
            await page.keyboard.press('Space');
            await page.waitForTimeout(100);
        }
        let count = await page.locator('.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z').count();
        console.log(count);
        for (let i = 0; i < count; i++) {
            post = page.locator('.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z').nth(i);
            await post.waitFor({ timeout:5000, state: 'visible',strict: false });
            await post.scrollIntoViewIfNeeded();
            await page.waitForTimeout(2000);
            console.log('Post Number:', i + 1);

            try{
                let img = await post.locator("xpath=//img[contains(@class, 'xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh x1ey2m1c xds687c x5yr21d x10l6tqk x17qophe x13vifvy xh8yej3')]").first().elementHandle();
                await page.waitForTimeout(2000);
                let timestampXpath = "xpath=//a[@class='x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz xkrqix3 x1sur9pj xi81zsa x1s688f' and @role='link' and contains(@href, '?__cft__[0]')]";
                await page.waitForTimeout(2000);
                await post.locator(timestampXpath).waitFor({ state: 'visible', strict: false });
                let index = await post.locator(timestampXpath).count();
                await page.waitForTimeout(2000);
                console.log('Index:', index);
                let timeStamp = await post.locator(timestampXpath).nth(index-1).elementHandle();

                await page.evaluate((element) => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, timeStamp);

                await timeStamp.hover();

                let updateTimeLocator = page.locator("xpath=//span[contains(@class,'x193iq5w xeuugli x13faqbe x1vvkbs x10flsy6 x1nxh6w3 x1sibtaa xo1l8bm xzsf02u')]").first();
                await updateTimeLocator.waitFor({ timeout: 5000 , strict: false});
                let updateTime = await updateTimeLocator.textContent();
                console.log('Update Time:', updateTime);
                let dateStr = updateTime.replace(/^[A-Za-z]+,\s/, '');
                dateStr = dateStr.replace(' at ', ' ');
                let dt = new Date(dateStr);

                console.log(dt);
                let fiveDaysAgo = new Date();
                fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

                if (dt> fiveDaysAgo) {
                    await page.waitForTimeout(2000);
                    let final_text_value
                    let post_text;
                    try{
                        post_text = await post.locator("xpath=//div[contains(@class,'x1l90r2v x1iorvi4 x1ye3gou xn6708d')]").nth(1).elementHandle();
                        await page.waitForTimeout(2000);
                        await page.evaluate((element) => {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, post_text);
                    }catch(error){
                        console.log('Error:', error);
                        post_text = await post.locator("xpath=//div[contains(@class,'x1l90r2v x1iorvi4 x1ye3gou xn6708d')]").nth(0).elementHandle();
                        await page.waitForTimeout(2000);
                        await page.evaluate((element) => {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, post_text);
                    }
                        await page.waitForTimeout(2000);
                        let post_text_value = await post_text.textContent();
                    if (post_text_value.includes('See more')) {
                        let seeMoreLocator = await post.locator("xpath=//div[contains(@class, 'x1i10hfl xjbqb8w') and contains(text(), 'See more')]").elementHandle();
                        await page.waitForTimeout(2000);
                        await seeMoreLocator.click();
                        await page.waitForTimeout(2000);
                        final_text_value = await post_text.textContent();
                        console.log('Post Text:', final_text_value);
                    }
                    else {
                        console.log('no see more Text:', post_text_value);
                    }
                    await page.evaluate((element) => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, img);
                    await page.waitForTimeout(2000);
                    await img.click();
                    let img_path = 'xpath=/html/body/div[1]/div/div[1]/div/div[5]/div/div/div[3]/div[2]/div/div[2]/div/div[1]/div/div[2]/div/div/div/img[1]'
                    let img_path2 = 'xpath=/html/body/div[1]/div/div[1]/div/div[5]/div/div/div[3]/div[2]/div/div/div[2]/div/div[1]/div[2]/div[2]/span/div/img'
                    let final_path;
                    let imgPic;
                    try{
                        imgPic = await page.locator(img_path).elementHandle();
                    }catch{
                        imgPic = await page.locator(img_path2).elementHandle();
                    }
                    console.log("Getting img scr");
                    let start_end = await imgPic.getAttribute('src');
                    await page.waitForTimeout(2000);
                    await page.keyboard.press('ArrowRight');
                    await page.waitForTimeout(2000);
                    let viewing = true;
                    console.log(start_end);
                    let start_sliced = start_end.slice(0, 105);
                    while (viewing) {
                        try{
                            imgPic = await page.locator(img_path).elementHandle();
                        }catch{
                            imgPic = await page.locator(img_path2).elementHandle();
                        }
                        let imgSrc = await imgPic.getAttribute('src');
                        console.log(imgSrc);
                        let img_sliced = imgSrc.slice(0, 105);
                        if (img_sliced !== start_sliced) {
                            console.log('Image URL:', imgSrc);
                            start_end = imgSrc;
                            await page.keyboard.press('ArrowRight');
                            await page.waitForTimeout(2000);
                        } else {
                            viewing = false;
                        }
                    }
                    await page.keyboard.press('Escape');
                    await page.waitForTimeout(2000);
                    let finalOut = [];
                    finalOut.push(group_name);
                    finalOut.push(final_text_value);
                    finalOut.push(start_end);
                    finalOut.push(dt);
                    // finalOut.push(url);
                    fs.writeFileSync(`output_${url}.txt`, `${finalOut}`);
                }else continue
            

            }
            catch(error){
                console.log('Error:', error);
                fs.writeFileSync('output.txt', `${error}`);
                continue;
            }
        }

        await page.waitForTimeout(5000);
}

async function main (){
    // let response = await fetchData();
    // console.log("The response is ,", response);
    // let data = response[2].split(',');
    // fs.writeFileSync('output.txt', `${typeof data}`);
    let data = ['1046291836187649']
    const scraperPromises = data.map(url => scraper(url));
    await Promise.all(scraperPromises);
}


main();